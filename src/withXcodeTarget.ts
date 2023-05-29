import { ConfigPlugin, withXcodeProject } from '@expo/config-plugins';
import { addAutoFillExtensionXcodeTarget } from './xcodeAutoFillExtension/autoFillExtension';

export const withXcodeTarget: ConfigPlugin<{
  folderName: string;
}> = (baseConfig, { folderName }) => {
  return withXcodeProject(baseConfig, config => {
    addAutoFillExtensionXcodeTarget(config.modResults, {
      appName: config.modRequest.projectName!,
      extensionName: folderName,
      extensionBundleIdentifier: `${config.ios!
        .bundleIdentifier!}.${folderName}`,
      currentProjectVersion: config.ios!.buildNumber || '1',
      marketingVersion: config.version!,
      iosRoot: config.modRequest.platformProjectRoot,
      extensionPath: `${config.modRequest.projectRoot}/${folderName}`,
    });

    return config;
  });
};
