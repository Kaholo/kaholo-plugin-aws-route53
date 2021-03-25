const aws = require("aws-sdk");

function createRecord(action, settings) {
  if (!action.params.name || !action.params.value ||
      !action.params.type || !action.params.hostedZoneId){
    throw "One or more fields are missing";
  }

  const changes = [{
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
  }];
  return changeRecordSetsSDK(action, settings, changes);
}

function changeResourceRecordSets(action, settings) {
  if(!action.params.hostedZoneId || !action.params.changesArray){
    throw "Hosted zond ID and changes array required!";
  }
  if (!Array.isArray(action.params.changesArray)){
    throw "Changes must be array";
  }
  return changeRecordSetsSDK(action, settings, action.params.changesArray);
}

// helpers

async function changeRecordSetsSDK(action, settings, changes){
    const params = {
      ChangeBatch: {
        Changes: action.params.changesArray,
        Comment: action.params.comment,
      },
      HostedZoneId: action.params.hostedZoneId,
    };
    const client = getRoute53(action, settings);
    return new Promise((resolve, reject) => {
      client.changeResourceRecordSets(params, (err,result)=>{
        if(err) return reject(err);
        resolve(result);
      });
    });
}

function getRoute53(action, settings) {
  return new aws.Route53({
    accessKeyId: action.params.AWS_ACCESS_KEY_ID || settings.AWS_ACCESS_KEY_ID,
    secretAccessKey: action.params.AWS_SECRET_ACCESS_KEY || settings.AWS_SECRET_ACCESS_KEY,
  });
}

module.exports = {
  createRecord: createRecord,
  changeResourceRecordSets: changeResourceRecordSets,
};
