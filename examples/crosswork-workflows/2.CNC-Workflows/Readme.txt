This has 2 workflows.  CNC_Authorization is a sub-workflow that gets a token for CNC login.  Monitor-Link is the main workflow that reads the bandwidth utilization for a given link.

1. Create secret and resource in CWM for CNC using REST Adapter.  The resource name is cncAdv by default.  You can set a different resource name and modify the step 2 below:

2. In the Monitor-Link workflow, the first state named getVariables has all the variable names.  Change them as per your setup (nodeA, nodeZ, etc.).  Default Values below:

    {
      "data": {
        "nodeA": "node-3",
        "nodeZ": "node-8",
        "encode1": "%20%3A%20",
        "encode2": "%2F",
        "linkType": "ISIS_IPV6_L2",
        "password": "cRo55work!",
        "resource": "cncAdv",
        "username": "admin",
        "interfaceA": "GigabitEthernet0/0/0/8",
        "interfaceZ": "GigabitEthernet0/0/0/3"
      },
      "name": "setVariables"
    }

