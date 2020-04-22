const aws = require("aws-sdk");

function getRoute53(action, settings) {
  return new aws.Route53({
    accessKeyId: action.params.AWS_ACCESS_KEY_ID || settings.AWS_ACCESS_KEY_ID,
    secretAccessKey: action.params.AWS_SECRET_ACCESS_KEY || settings.AWS_SECRET_ACCESS_KEY,
  });
}

function createRecord(action, settings) {
  return new Promise((resolve, reject) => {
    if (
      !action.params.name ||
      !action.params.value ||
      !action.params.type ||
      !action.params.hostedZoneId
    )
      return reject("One or more fields are missing");

    let params = {
      ChangeBatch: {
        Changes: [
          {
            Action: "CREATE",
            ResourceRecordSet: {
              Name: action.params.name,
              ResourceRecords: [
                {
                  Value: action.params.value,
                },
              ],
              TTL: action.params.ttl || 60,
              Type: action.params.type,
            },
          },
        ],
        Comment: action.params.comment || "",
      },
      HostedZoneId: action.params.hostedZoneId,
    };

    let route53 = getRoute53(action, settings);
    route53.changeResourceRecordSets(params, function (err, data) {
      if (err) {
        return reject("Could not create record: " + err);
      }
      return resolve(data);
    });
  });
}

function changeResourceRecordSets(action, settings) {
  return new Promise((resolve, reject) => {
    if(!action.params.hostedZoneId || !action.params.changesArray){
        return reject("Hosted zond ID and changes array required!");
    }
    if (!Array.isArray(action.params.changesArray)){
        return reject("Changes must be array");
    }

    const route53 = getRoute53(action, settings);

    const params = {
      ChangeBatch: {
        Changes: action.params.changesArray,
        Comment: action.params.comment,
      },
      HostedZoneId: action.params.hostedZoneId,
    };

    route53.changeResourceRecordSets(params, (err,result)=>{
        if(err) return reject(err);
        resolve(result);
    })
  });
}

module.exports = {
  createRecord: createRecord,
  changeResourceRecordSets: changeResourceRecordSets,
};
