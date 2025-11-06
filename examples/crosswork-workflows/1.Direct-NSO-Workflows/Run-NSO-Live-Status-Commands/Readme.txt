This workflow runs live-status commands on XR devices from NSO (this works on XR devices only).

1. Create NSO secret using basic auth.

2. Create NSO resource.  The resource-name should match the resourceId in payload data.  The device and args in the payload need to match your NSO device and required command.

3. Copy this workflow into CWM 2.0.

4. Run the workflow and provide the payload.  You can query one device or multiple devices.  Payload samples are provided for both.
