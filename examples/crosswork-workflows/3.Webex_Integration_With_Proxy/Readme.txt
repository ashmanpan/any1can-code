Webex Integration:

(a). Create a secret:
Secret ID: webex-token
Secret Type: token
Token: Enter token value.

(b). Create a Resource:
Resource Name: webex
Resource type: generic.rest.resource.v.1.0.0
Secret Id: webex-token 
host: api.ciscospark.com
port: 443
scheme: https
timeout: 30
allowinsecure: True 

(c). Create the workflow:

(d). run the workflow

