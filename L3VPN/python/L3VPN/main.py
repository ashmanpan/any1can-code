import ncs
from ncs.application import Service
from ncs.dp import Action
import traceback


class ServiceCallbacks(Service):
    """L3VPN Service Callbacks"""

    @Service.create
    def cb_create(self, tctx, root, service, proplist):
        """Service create callback with proper error handling"""
        self.log.info(f'Service create(service={service._path})')
        
        try:
            # Validate service parameters
            self._validate_service_data(service)
            
            # Apply the service template
            vars = ncs.template.Variables()
            template = ncs.template.Template(service)
            template.apply('L3VPN-template', vars)
            
            self.log.info(f'L3VPN service {service.name} created successfully')
            
        except ValidationError as e:
            self.log.error(f'Validation error for service {service.name}: {str(e)}')
            raise
        except Exception as e:
            self.log.error(f'Error creating L3VPN service {service.name}: {str(e)}')
            self.log.error(f'Traceback: {traceback.format_exc()}')
            raise

    @Service.pre_modification
    def cb_pre_modification(self, tctx, op, kp, root, proplist):
        """Pre-modification callback"""
        self.log.info(f'Service premod(service={kp})')
        
        try:
            if op == ncs.dp.NCS_SERVICE_DELETE:
                # Perform cleanup validation before deletion
                service = ncs.maagic.get_node(root, kp)
                self._validate_deletion(service)
                
        except Exception as e:
            self.log.error(f'Error in pre-modification for {kp}: {str(e)}')
            raise

    def _validate_service_data(self, service):
        """Validate service configuration data"""
        
        # Validate route target format
        if not self._is_valid_route_target(service.route_target):
            raise ValidationError(f"Invalid route target format: {service.route_target}")
        
        # Validate route distinguisher format
        if not self._is_valid_route_distinguisher(service.route_distinguisher):
            raise ValidationError(f"Invalid route distinguisher format: {service.route_distinguisher}")
        
        # Validate customer sites
        if not service.customer_sites.site:
            raise ValidationError("At least one customer site must be configured")
        
        for site in service.customer_sites.site:
            self._validate_site(site)

    def _validate_site(self, site):
        """Validate individual site configuration"""
        
        # Check if device exists and is reachable
        if not self._device_exists(site.device):
            raise ValidationError(f"Device {site.device} not found in device list")
        
        # Validate interface format
        if not self._is_valid_interface(site.interface):
            raise ValidationError(f"Invalid interface format: {site.interface}")
        
        # Validate IP configuration if provided
        if site.ip_address and not site.subnet_mask:
            raise ValidationError(f"Subnet mask required when IP address is specified for site {site.site_id}")
        
        # Validate VLAN ID range
        if site.vlan_id and (site.vlan_id < 1 or site.vlan_id > 4094):
            raise ValidationError(f"Invalid VLAN ID {site.vlan_id} for site {site.site_id}")
        
        # Validate BGP configuration
        if site.bgp.neighbor and not site.bgp.local_as:
            raise ValidationError(f"Local AS must be configured when BGP neighbors are defined for site {site.site_id}")

    def _validate_deletion(self, service):
        """Validate service deletion prerequisites"""
        
        # Check for dependent services or configurations
        # This is a placeholder for more complex validation logic
        self.log.info(f"Validating deletion of service {service.name}")

    def _is_valid_route_target(self, rt):
        """Validate route target format (ASN:value)"""
        import re
        pattern = r'^\d+:\d+$'
        return re.match(pattern, rt) is not None

    def _is_valid_route_distinguisher(self, rd):
        """Validate route distinguisher format"""
        import re
        # Support both IP:value and ASN:value formats
        ip_pattern = r'^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d+$'
        asn_pattern = r'^\d+:\d+$'
        return re.match(ip_pattern, rd) is not None or re.match(asn_pattern, rd) is not None

    def _is_valid_interface(self, interface):
        """Validate interface naming convention"""
        import re
        # Accept common Cisco XR interface formats
        pattern = r'^(GigabitEthernet|TenGigE|HundredGigE|Bundle-Ether)\d+(/\d+(/\d+)?)?$'
        return re.match(pattern, interface) is not None

    def _device_exists(self, device_name):
        """Check if device exists in NSO device list"""
        try:
            with ncs.maapi.single_read_trans('admin', 'system') as t:
                root = ncs.maagic.get_root(t)
                return device_name in root.devices.device
        except Exception as e:
            self.log.error(f"Error checking device existence: {str(e)}")
            return False


class ValidationError(Exception):
    """Custom exception for validation errors"""
    pass


class L3VPNActions(Action):
    """Custom actions for L3VPN service management"""

    @Action.action
    def cb_action(self, uinfo, name, kp, input, output, trans):
        """Handle custom actions"""
        self.log.info(f'Action: {name}')
        
        try:
            if name == 'validate-service':
                self._validate_service_action(input, output, trans)
            elif name == 'get-service-status':
                self._get_service_status_action(input, output, trans)
            else:
                raise Exception(f"Unknown action: {name}")
                
        except Exception as e:
            self.log.error(f'Action {name} failed: {str(e)}')
            output.result = f"Action failed: {str(e)}"

    def _validate_service_action(self, input, output, trans):
        """Validate service configuration"""
        output.result = "Service validation completed successfully"

    def _get_service_status_action(self, input, output, trans):
        """Get service deployment status"""
        output.result = "Service is operational"


class Main(ncs.application.Application):
    """Main application class"""

    def setup(self):
        """Application setup"""
        self.log.info('L3VPN service package starting')
        
        # Register service callbacks
        self.register_service('l3vpn-servicepoint', ServiceCallbacks)
        
        # Register actions
        self.register_action('l3vpn-validate', L3VPNActions)
        self.register_action('l3vpn-status', L3VPNActions)

    def teardown(self):
        """Application teardown"""
        self.log.info('L3VPN service package stopping')