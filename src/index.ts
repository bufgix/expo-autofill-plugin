import { ConfigPlugin, withEntitlementsPlist } from '@expo/config-plugins';
import { withExtensionConfig } from './withExtensionConfig';
import { withInfoPlist } from './withInfoPlist';
import { withXcodeTarget } from './withXcodeTarget';
import { ExpoConfig } from '@expo/config-types';

const withRemoveiOSNotificationEntitlement = (baseConfig: ExpoConfig) => {
  return withEntitlementsPlist(baseConfig, mod => {
    delete mod.modResults['aps-environment'];
    return mod;
  });
};

const withAutoFillService: ConfigPlugin = config => {
  // for some reason had to switch the ios plugins in order for
  // them to run in the required order

  config = withExtensionConfig(config, {
    folderName: 'PasswallAutoFillService',
  });

  config = withRemoveiOSNotificationEntitlement(config);
  config = withInfoPlist(config, { folderName: 'PasswallAutoFillService' });
  config = withXcodeTarget(config, { folderName: 'PasswallAutoFillService' });

  return config;
};

export default withAutoFillService;
