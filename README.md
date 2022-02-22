# Dummy Digest Authentication Service

## Install and run

Run the following command to install and run the service

```
npm install
node index
```

## Testing

Use BloomRPC or postman to test the service. Use the following information for testing:

_GRPC Request_

```json
{
  "username": "arc",
  "realm": "localhost",
  "nonce": "857e8c4160350310d2c94baa642a26b5",
  "uri": "sip:localhost;transport=TCP",
  "method": "REGISTER",
  "qop": "auth",
  "response": "29e94b35e74c6f71afce68b88f502ed7",
  "c_nonce": "f506e3d09d60670353252daa052948af",
  "nonce_count": "00000001"
}
```

_Endpoint Credentials_

```non
USERNAME=arc
SECRET=1234
```
# dummyauth
