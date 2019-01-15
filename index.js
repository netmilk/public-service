require('dotenv').config();
var express = require('express');
var expressProxy = require('express-http-proxy');
var rateLimit = require('express-rate-limit');

var app = express()
var host = process.env['PUBLIC_API_DESIGN_API_HOST']
var port = host.split(":")[1]

var downstreamHost = process.env['BACKEND_API_DESIGN_API_HOST']
var downstreamPort = downstreamHost.split(":")[1]

// Server the API Specification in the deiscovery endpoint
var specPath = "api-landscape/provide/public-api-design/openapi.json";
app.use("/discovery/spec/openapi.json", express.static(specPath));

// Add rate limit
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
}))

// Proxy to downsteam
app.use('/', expressProxy(downstreamHost));

app.listen(port, function(e){
  if(e){
    console.log(e);
  }
  console.log("Listening on: " + host);
});


