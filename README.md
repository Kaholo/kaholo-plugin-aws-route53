# kaholo-plugin-aws-rotue53
AWS Rotue53 plugin for Kaholo

## Settings
1. Access Key ID(vault)
2. Secret Access key(vault)

## Method Create Record
Create a resource record set, which contains authoritative DNS information for a specified domain name or subdomain name. [documentation](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Route53.html#changeResourceRecordSets-property)

### Parameters
1. Access Key ID(vault)**optional**
2. Secret Access key(vault)**optional**
3. Hosted Zone ID(string)**required** - The ID of the hosted zone that you want to create tuehe record in.
4. Name(string)**required** - The name of the record that you want to create.
5. Record Type(options)**required** - The DNS record type.
6. Value(string)**required** - The new DNS record value, not to exceed 4,000 characters.
7. TTL(int)**optional** - The resource record cache time to live (TTL), in seconds. Default is 60.
8. Comment(string)**optional** - Any comments you want to include about the Create request.

## Change Resource Record Sets
Creates, changes, or deletes resource record sets. [documentation](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Route53.html#changeResourceRecordSets-property)

### Parameters
1. Access Key ID(vault)**optional**
2. Secret Access key(vault)**optional**
3. Hosted Zone ID(string)**required** - The ID of the hosted zone that you want to change record sets in it.
4. Changes Array(array)**required** - An array of objects, each representing a change to do in the record set. You can see the possible and required fields for this object in the [documentation](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Route53.html#changeResourceRecordSets-property) in the changes field inside the json request.
5. Comment(string)**optional** - Any comments you want to include about this batch request.