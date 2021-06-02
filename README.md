# kaholo-plugin-aws-rotue53
AWS Rotue53 plugin for Kaholo

## Settings
1. Access Key ID(Vault)
2. Secret Access key(Vault)

## Method Create Record
Create a resource record set, which contains authoritative DNS information for a specified domain name or subdomain name. [documentation](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Route53.html#changeResourceRecordSets-property)

### Parameters
1. Access Key ID (Vault) **Optional**
2. Secret Access key (Vault) **Optional**
3. Hosted Zone ID (String) **Required** - The ID of the hosted zone that you want to create tuehe record in.
4. Name (String) **Required** - The name of the record that you want to create.
5. Record Type (options) **Required** - The DNS record type.
6. Value (String) **Required** - The new DNS record value, not to exceed 4,000 characters.
7. TTL (Int) **Optional** - The resource record cache time to live (TTL), in seconds. Default is 60.
8. Comment (String) **Optional** - Any comments you want to include about the Create request.

## Change Resource Record Sets
Creates, changes, or deletes resource record sets. [documentation](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Route53.html#changeResourceRecordSets-property)

### Parameters
1. Access Key ID (Vault) **Optional**
2. Secret Access key (Vault) **Optional**
3. Hosted Zone ID (String) **Required** - The ID of the hosted zone that you want to change record sets in it.
4. Changes Array (array) **Required** - An array of objects, each representing a change to do in the record set. You can see the possible and Required fields for this object in the [documentation](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Route53.html#changeResourceRecordSets-property) in the changes field inside the json request.
5. Comment (String) **Optional** - Any comments you want to include about this batch request.

## Create Hosted Zone
Creates a new public or private hosted zone. [documentation](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Route53.html#createHostedZone-property)

### Parameters
1. Access Key ID (Vault) **Optional**
2. Secret Access key (Vault) **Optional**
3. Domain Name (String) **Required** The name of the domain. Specify a fully qualified domain name, for example, www.example.com. The trailing dot is Optional. - The ID of the hosted zone that you want to change record sets in it.
4. Changes Array(array) **Required** - An array of objects, each representing a change to do in the record set. You can see the possible and Required fields for this object in the [documentation](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Route53.html#changeResourceRecordSets-property) in the changes field inside the json request.
5. Private (Boolean) **Optional** - A value that indicates whether this is a private hosted zone. Default is false.
6. VPC Region (Autocomplete String) **Optional** - The region that an Amazon VPC was created in. **For private hosted zones only.**
7. VPC ID (String) **Optional** - The ID of an Amazon VPC. **For private hosted zones only.**
8. Comment (Text) **Optional** - Any comments that you want to include about the hosted zone.
9. Delegation Set ID (String) **Optional** - If specified, associate the specified reusable delegation set with this hosted zone.