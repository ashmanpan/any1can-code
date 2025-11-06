This has 2 workflows, create-golden-config-application and delete-golden-config-application.

1. Need NSO secret and resource to be configured in CWM.

2. Need the golden-config template to be created in NSO beforehand.  The GC template is in the file flex_algo_template.xml.  You need to load merge it into NSO.  

3. Test the GC template with the flex_algo_app.xml.  This can be load-merged into NSO.  Change the values in the xml file based on your environment (example, device-name, interface, etc.).

4. You can delete the GC application from NSO manually after testing.  

5. From CWM, you can create/delete the NSO GC application using the workflows.  Sample payloads are provided for both.
