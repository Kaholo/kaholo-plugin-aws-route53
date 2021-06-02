const regionsList = [
  { "id": "us-east-1", "value": "us-east-1" },
{ "id": "us-east-2", "value": "us-east-2" },
{ "id": "us-west-1", "value": "us-west-1" },
{ "id": "us-west-2", "value": "us-west-2" },
{ "id": "eu-west-1", "value": "eu-west-1" },
{ "id": "eu-west-2", "value": "eu-west-2" },
{ "id": "eu-west-3", "value": "eu-west-3" },
{ "id": "eu-central-1", "value": "eu-central-1" },
{ "id": "ap-east-1", "value": "ap-east-1" },
{ "id": "me-south-1", "value": "me-south-1" },
{ "id": "us-gov-west-1", "value": "us-gov-west-1" },
{ "id": "us-gov-east-1", "value": "us-gov-east-1" },
{ "id": "us-iso-east-1", "value": "us-iso-east-1" },
{ "id": "us-isob-east-1", "value": "us-isob-east-1" },
{ "id": "ap-southeast-1", "value": "ap-southeast-1" },
{ "id": "ap-southeast-2", "value": "ap-southeast-2" },
{ "id": "ap-south-1", "value": "ap-south-1" },
{ "id": "ap-northeast-1", "value": "ap-northeast-1" },
{ "id": "ap-northeast-2", "value": "ap-northeast-2" },
{ "id": "ap-northeast-3", "value": "ap-northeast-3" },
{ "id": "eu-north-1", "value": "eu-north-1" },
{ "id": "sa-east-1", "value": "sa-east-1" },
{ "id": "ca-central-1", "value": "ca-central-1" },
{ "id": "cn-north-1", "value": "cn-north-1" },
{ "id": "af-south-1", "value": "af-south-1" },
{ "id": "eu-south-1", "value": "eu-south-1" }
];

async function getRegions(query, _, _){
  return regionsList.filter(region => { return !query || region.id.includes(query.toLowerCase())});
}

module.exports = { getRegions }