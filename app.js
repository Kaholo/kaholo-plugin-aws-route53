const { listRegions } = require("./autocomplete");
const { changeRecordSetsSDK, getRoute53, getAwsCallback, parseAutocomplete} = require("./helpers");

async function createRecord(action, settings) {
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

async function changeResourceRecordSets(action, settings) {
  if(!action.params.hostedZoneId || !action.params.changesArray){
    throw "Hosted zond ID and changes array required!";
  }
  if (!Array.isArray(action.params.changesArray)){
    throw "Changes must be array";
  }
  return changeRecordSetsSDK(action, settings, action.params.changesArray);
}

async function createHostedZone(action, settings){
  const params = {
    Name: action.params.name,
    CallerReference: String(Date.now()),
    DelegationSetId: action.params.delegationSetId,
    HostedZoneConfig: {
      Comment: action.params.comment,
      PrivateZone: action.params.private || false
    }
  }
  if (!params.Name){
    throw "Didn't provide domain name!";
  }
  action.params.vpcRegion = parseAutocomplete(action.params.vpcRegion);
  if (action.params.private && action.params.vpcId && action.params.vpcRegion){
    params.VPC = {
      VPCId: action.params.vpcId,
      VPCRegion: action.params.vpcRegion
    }
  }
  else if (action.params.vpcId || action.params.vpcRegion){
    throw "Must provide both VPC ID and VPC Region, and only in private zones"
  }
  const client = getRoute53(action, settings);
  return new Promise((resolve, reject) => {
    client.createHostedZone(params, getAwsCallback(resolve, reject));
  });
}

module.exports = {
  createRecord,
  changeResourceRecordSets,
  createHostedZone,
  // auto complete
  listRegions
};
