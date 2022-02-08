const aws = require("aws-sdk");

async function changeRecordSetsSDK(action, settings, changes){
    const params = {
      ChangeBatch: {
        Changes: changes,
        Comment: action.params.comment,
      },
      HostedZoneId: action.params.hostedZoneId,
    };
    const client = getRoute53(action, settings);
    return new Promise((resolve, reject) => {
      client.changeResourceRecordSets(params, getAwsCallback(resolve, reject));
    });
}

function getRoute53(action, settings) {
  return new aws.Route53({
    accessKeyId: action.params.AWS_ACCESS_KEY_ID || settings.AWS_ACCESS_KEY_ID,
    secretAccessKey: action.params.AWS_SECRET_ACCESS_KEY || settings.AWS_SECRET_ACCESS_KEY,
  });
}

function getEc2(params, settings) {
    return new aws.EC2({
        region: parseAutocomplete(params.vpcRegion) || settings.region,
        accessKeyId: params.AWS_ACCESS_KEY_ID || settings.AWS_ACCESS_KEY_ID,
        secretAccessKey: params.AWS_SECRET_ACCESS_KEY || settings.AWS_SECRET_ACCESS_KEY,
    });
}

function getLightsail(params, settings) {
    return new aws.Lightsail({
        region: parseAutocomplete(params.vpcRegion) || settings.region,
        accessKeyId: params.AWS_ACCESS_KEY_ID || settings.AWS_ACCESS_KEY_ID,
        secretAccessKey: params.AWS_SECRET_ACCESS_KEY || settings.AWS_SECRET_ACCESS_KEY,
    });
}

function getAwsCallback(resolve, reject){
    return (err, data) => {
        if (err) return reject(err);
        return resolve(data);
    }
}

function parseAutocomplete(value) {
    if (!value) return undefined;
    if (value.id) return value.id;
    return value;
}

module.exports = {
    changeRecordSetsSDK,
    getRoute53,
    getEc2,
    getLightsail,
    getAwsCallback
};
