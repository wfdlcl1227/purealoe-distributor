let nforce = require('nforce');
let faye = require('faye');
let express = require('express');
let cors = require('cors');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);
// The account id of the distributor
let accountId;
let PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Express server listening on ${PORT}`));

app.use(cors());
app.use('/', express.static(__dirname + '/www'));
app.get('/bundles', getBundles);



let getBundles = (req, res) => {
    debugger;
    let q = "SELECT Id, Name, Description__c, Qty__c FROM Bundle__c WHERE Status__c='Submitted to Distributors'";
    org.query({ query: q }, (err, resp) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        } else {
            let bundles = resp.records;
            let prettyBundles = [];
            bundles.forEach(bundle => {
                prettyBundles.push({
                    bundleId: bundle.get("Id"),
                    bundleName: bundle.get("Name"),
                    bundleDescription: bundle.get("Description__c"),
                    qty: bundle.get("Qty__c")
                });
            });
            res.json(prettyBundles);
        }
    });

};



io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' }); 
    
     socket.on('myevent', function (data) {
        socket.emit('myevent2', { hello: 'world2' }); 
      });
});

// Connect to Salesforce Start
let SF_CLIENT_ID = process.env.SF_CLIENT_ID;
let SF_CLIENT_SECRET = process.env.SF_CLIENT_SECRET;
let SF_USER_NAME = process.env.SF_USER_NAME;
let SF_USER_PASSWORD = process.env.SF_USER_PASSWORD;
let SF_ENVIRONMENT = process.env.SF_ENVIRONMENT || 'sandbox'; // default to sandbox if env variable not set

let org = nforce.createConnection({
    clientId: SF_CLIENT_ID,
    clientSecret: SF_CLIENT_SECRET,
    environment: SF_ENVIRONMENT,
    redirectUri: 'http://localhost:3000/oauth/_callback',
    mode: 'single',
    autoRefresh: true
});

org.authenticate({ username: SF_USER_NAME, password: SF_USER_PASSWORD }, err => {
    if (err) {
        console.error("Salesforce authentication error");
        console.error(err);
    } else {
        console.log("Salesforce authentication successful");
        console.log(org.oauth.instance_url);
        subscribeToPlatformEvents();
        // For this demo, we use the id of the first account as the distributor id.
        // Make sure there us at least one account in your Salesforce org.
        let q = "SELECT Id FROM Account LIMIT 1";
        org.query({ query: q }, (err, resp) => {
            if (err) {
                console.log(err);
            } else {
                if (resp.records && resp.records.length === 1) {
                    accountId = resp.records[0].get('Id');
                    console.log(`Account Id: ${accountId}`);
                } else {
                    console.log('WARNING: You need to create an account in your org');
                }
            }
        });

    }
});
// Connect to Salesforce End
