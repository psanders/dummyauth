const PROTO_PATH = __dirname + '/auth.proto';
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const calculateResponse = require("./util")

const packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  });

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const auth = protoDescriptor.camanio.sip.auth.v1draft1;

function verifyAuth(call, callback) {
  console.log(JSON.stringify(call.request, null, ' '))

  // Obtain this from your authentication system
  const credentials = { username: "arc", secret: "1234" }

  // Verify if the response to the challenge is valid
  const response = calculateResponse(call.request, credentials) 

  // Check if calculated response is the same as the one sent by the client
  console.log("client response: " + call.request.response)
  console.log("calculated response: " + response)

  const valid = response === call.request.response

  callback(null, { valid })
}

// Setup and start grpc server
const credentials = grpc.ServerCredentials.createInsecure()
const server = new grpc.Server()
server.addService(auth.DigestAuth.service, { verifyAuth })
server.bindAsync("0.0.0.0:50052", credentials, () => {
  console.log(`starting authentication service`)
  server.start()
})