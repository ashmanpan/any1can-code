import React, { useState } from 'react';

interface WizardProps {
  onSendMessage: (message: string) => void;
}

export const QuickWizard: React.FC<WizardProps> = ({ onSendMessage }) => {
  const [showWizard, setShowWizard] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const [formData, setFormData] = useState<Record<string, string>>({});

  const wizardTemplates = {
    'html-website': {
      title: '🌐 HTML Website',
      description: 'Generate a complete responsive website',
      fields: [
        { name: 'websiteType', label: 'Website Type', type: 'select',
          options: ['personal', 'business', 'blog', 'landing', 'portfolio', 'ecommerce'] },
        { name: 'title', label: 'Website Title', type: 'text' },
        { name: 'companyName', label: 'Company/Personal Name', type: 'text' },
        { name: 'colorScheme', label: 'Primary Color Scheme', type: 'select',
          options: ['modern-blue', 'elegant-dark', 'fresh-green', 'warm-orange', 'professional-gray', 'vibrant-purple'] },
        { name: 'sections', label: 'Sections (comma-separated)', type: 'text',
          placeholder: 'Header, About, Services, Portfolio, Testimonials, Contact' },
        { name: 'features', label: 'Features', type: 'select-multiple',
          options: ['contact-form', 'image-gallery', 'testimonials', 'newsletter', 'social-media', 'animations', 'video-background'] },
        { name: 'seoKeywords', label: 'SEO Keywords (comma-separated)', type: 'text',
          placeholder: 'technology, innovation, services' }
      ],
      generatePrompt: (data: Record<string, string>) =>
        `Create a complete responsive HTML website with the following specifications:
        - Type: ${data.websiteType} website
        - Title: ${data.title}
        - Company/Name: ${data.companyName}
        - Color scheme: ${data.colorScheme}
        - Sections: ${data.sections}
        - Features: ${data.features}
        - SEO Keywords: ${data.seoKeywords}
        Include inline CSS, modern design, mobile responsive, JavaScript for interactions, and proper SEO meta tags.`
    },
    'cisco-nso': {
      title: '📦 Cisco NSO Package',
      description: 'Generate NSO service package',
      fields: [
        { name: 'packageName', label: 'Package Name', type: 'text',
          placeholder: 'vlan-service' },
        { name: 'packageDescription', label: 'Package Description', type: 'text',
          placeholder: 'Service for VLAN configuration management' },
        { name: 'deviceType', label: 'Device Type', type: 'select',
          options: [
            'cisco-ios',
            'cisco-iosxe',
            'cisco-iosxr',
            'cisco-nxos',
            'cisco-aci',
            'cisco-asa',
            'cisco-ftd',
            'juniper-junos',
            'nokia-sros',
            'huawei-vrp',
            'arista-eos',
            'f5-bigip',
            'fortinet-fortigate',
            'paloalto-panos',
            'generic-cli'
          ] },
        { name: 'serviceType', label: 'Service Type', type: 'select',
          options: ['l3vpn', 'l2vpn', 'qos', 'acl', 'vlan', 'interface', 'routing', 'nat', 'firewall'] },
        { name: 'serviceVariables', label: 'Service Variables (name:type pairs)', type: 'textarea',
          placeholder: 'vlan_id:uint16\nvlan_name:string\ninterfaces:string-list\nip_address:ipv4-address' },
        { name: 'cliConfig', label: 'CLI Configuration Template', type: 'textarea',
          placeholder: 'vlan ${vlan_id}\n  name ${vlan_name}\ninterface ${interface}\n  switchport mode access\n  switchport access vlan ${vlan_id}' },
        { name: 'validationRules', label: 'Validation Rules (optional)', type: 'text',
          placeholder: 'vlan_id:1-4094, vlan_name:required, ip_address:subnet-check' }
      ],
      generatePrompt: (data: Record<string, string>) =>
        `Create a Cisco NSO service package with these specifications:
        Package name: ${data.packageName}
        Description: ${data.packageDescription}
        Target device: ${data.deviceType}
        Service type: ${data.serviceType}

        Service Variables (YANG model):
        ${data.serviceVariables}

        CLI Configuration Template:
        ${data.cliConfig}

        Validation Rules: ${data.validationRules}

        Generate complete NSO package including:
        - YANG model with all variables
        - XML template mapping variables to CLI
        - Python service callbacks with validation
        - Package metadata files
        - README with usage instructions`
    },
    'crosswork': {
      title: '⚙️ Crosswork Workflow',
      description: 'Generate automation workflow',
      fields: [
        { name: 'workflowName', label: 'Workflow Name', type: 'text',
          placeholder: 'network-health-check' },
        { name: 'workflowDescription', label: 'Workflow Description', type: 'text',
          placeholder: 'Automated health monitoring and remediation' },
        { name: 'triggerType', label: 'Trigger Type', type: 'select',
          options: ['scheduled', 'event-based', 'manual', 'api-webhook', 'threshold-based'] },
        { name: 'scheduleDetails', label: 'Schedule/Event Details', type: 'text',
          placeholder: 'For scheduled: */5 * * * * (cron), For event: device-down' },
        { name: 'inputParameters', label: 'Input Parameters (comma-separated)', type: 'text',
          placeholder: 'device_list, threshold_value, notification_email' },
        { name: 'actionSteps', label: 'Action Steps', type: 'textarea',
          placeholder: '1. collect-device-metrics\n2. analyze-thresholds\n3. generate-report\n4. send-notifications\n5. trigger-remediation' },
        { name: 'errorHandling', label: 'Error Handling Strategy', type: 'select',
          options: ['retry-3-times', 'alert-and-continue', 'rollback-changes', 'escalate-to-admin', 'failover-workflow'] }
      ],
      generatePrompt: (data: Record<string, string>) =>
        `Create a Cisco Crosswork workflow with these specifications:
        Workflow name: ${data.workflowName}
        Description: ${data.workflowDescription}
        Trigger: ${data.triggerType}
        Schedule/Event: ${data.scheduleDetails}
        Input Parameters: ${data.inputParameters}

        Action Steps:
        ${data.actionSteps}

        Error Handling: ${data.errorHandling}

        Generate complete workflow including:
        - Workflow metadata in JSON/YAML
        - Trigger configuration
        - Input parameter definitions with types
        - Step-by-step actions with error handling
        - Output formatting
        - Notification templates
        - Rollback procedures if applicable`
    }
  };

  const handleSubmit = () => {
    const template = wizardTemplates[selectedType as keyof typeof wizardTemplates];
    if (template) {
      const prompt = template.generatePrompt(formData);
      onSendMessage(prompt);
      setShowWizard(false);
      setSelectedType('');
      setFormData({});
    }
  };

  const handleFieldChange = (fieldName: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
  };

  const renderField = (field: any) => {
    if (field.type === 'select') {
      return (
        <select
          value={formData[field.name] || ''}
          onChange={(e) => handleFieldChange(field.name, e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value="">Select...</option>
          {field.options?.map((option: string) => (
            <option key={option} value={option}>
              {option.split('-').map((word: string) =>
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ')}
            </option>
          ))}
        </select>
      );
    } else if (field.type === 'textarea') {
      return (
        <textarea
          value={formData[field.name] || ''}
          onChange={(e) => handleFieldChange(field.name, e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          placeholder={field.placeholder}
          rows={4}
        />
      );
    } else if (field.type === 'select-multiple') {
      return (
        <div className="space-y-2">
          {field.options?.map((option: string) => (
            <label key={option} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={option}
                onChange={(e) => {
                  const current = formData[field.name] ? formData[field.name].split(',') : [];
                  if (e.target.checked) {
                    current.push(option);
                  } else {
                    const index = current.indexOf(option);
                    if (index > -1) current.splice(index, 1);
                  }
                  handleFieldChange(field.name, current.join(','));
                }}
                className="rounded text-blue-600"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {option.split('-').map((word: string) =>
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </span>
            </label>
          ))}
        </div>
      );
    } else {
      return (
        <input
          type="text"
          value={formData[field.name] || ''}
          onChange={(e) => handleFieldChange(field.name, e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
        />
      );
    }
  };

  return (
    <div className="relative">
      {/* Wizard Toggle Button */}
      <button
        onClick={() => setShowWizard(!showWizard)}
        className="fixed bottom-20 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all z-50"
        title="Quick Code Wizard"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </button>

      {/* Wizard Modal */}
      {showWizard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-3">
              {/* Cisco Logo in Wizard */}
              <svg className="h-8 w-auto" viewBox="0 0 100 50" fill="currentColor">
                <g className="text-blue-600 dark:text-blue-400">
                  <rect x="10" y="15" width="4" height="20" rx="2"/>
                  <rect x="20" y="10" width="4" height="30" rx="2"/>
                  <rect x="30" y="5" width="4" height="40" rx="2"/>
                  <rect x="40" y="10" width="4" height="30" rx="2"/>
                  <rect x="50" y="15" width="4" height="20" rx="2"/>
                  <rect x="60" y="10" width="4" height="30" rx="2"/>
                  <rect x="70" y="5" width="4" height="40" rx="2"/>
                  <rect x="80" y="10" width="4" height="30" rx="2"/>
                  <rect x="90" y="15" width="4" height="20" rx="2"/>
                </g>
              </svg>
              <span>Quick Code Generator</span>
            </h2>

            {!selectedType ? (
              <div>
                <p className="mb-4 text-gray-600 dark:text-gray-300">
                  Select a project type to generate code instantly:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(wizardTemplates).map(([key, template]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedType(key)}
                      className="p-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-all"
                    >
                      <div className="text-3xl mb-2">{template.title.split(' ')[0]}</div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {template.title.substring(2)}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {template.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center mb-4">
                  <button
                    onClick={() => {
                      setSelectedType('');
                      setFormData({});
                    }}
                    className="mr-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    ← Back
                  </button>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {wizardTemplates[selectedType as keyof typeof wizardTemplates].title}
                  </h3>
                </div>

                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                  {wizardTemplates[selectedType as keyof typeof wizardTemplates].fields.map(field => (
                    <div key={field.name}>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {field.label}
                      </label>
                      {renderField(field)}
                    </div>
                  ))}
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => setShowWizard(false)}
                    className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={Object.keys(formData).length === 0}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
                  >
                    Generate Code
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};