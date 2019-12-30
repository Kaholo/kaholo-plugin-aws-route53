const aws = require("aws-sdk");

function setAwsConfig(action, settings) {
    aws.config.update({
        accessKeyId: action.params.AWS_ACCESS_KEY_ID || settings.AWS_ACCESS_KEY_ID,
        secretAccessKey: action.params.AWS_SECRET_ACCESS_KEY || settings.AWS_SECRET_ACCESS_KEY
    });
}

function createRecord(action, settings) {
    return new Promise((resolve, reject) => {
        if (!action.params.name || !action.params.value || !action.params.type || !action.params.hostedZoneId)
            return reject("One or more fields are missing");

        setAwsConfig(action, settings);

        let params = {
            ChangeBatch: {
                Changes: [
                    {
                        Action: "CREATE",
                        ResourceRecordSet: {
                            Name: action.params.name,
                            ResourceRecords: [
                                {
                                    Value: action.params.value
                                }
                            ],
                            TTL: action.params.ttl || 60,
                            Type: action.params.type
                        }
                    }
                ],
                Comment: action.params.comment || ''
            },
            HostedZoneId: action.params.hostedZoneId
        };

        let route53 = new aws.Route53();
        route53.changeResourceRecordSets(params, function (err, data) {
            if (err) {
                return reject("Could not create record: " + err);
            }
            return resolve(data);
        });
    });
}

module.exports = {
    createRecord: createRecord
};
