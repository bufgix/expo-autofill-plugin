import { ConfigPlugin } from '@expo/config-plugins';

export const withExtensionConfig: ConfigPlugin<{
  folderName: string;
}> = (config, { folderName }) => {
  const appBundleIdentifier = config.ios?.bundleIdentifier;
  const extensionBundleIdentifier = `${appBundleIdentifier}.${folderName}`;

  config.extra = {
    ...config.extra,
    eas: {
      ...config.extra?.eas,
      build: {
        ...config.extra?.eas?.build,
        experimental: {
          ...config.extra?.eas?.build?.experimental,
          ios: {
            ...config.extra?.eas?.build?.experimental?.ios,
            appExtensions: [
              ...(config.extra?.eas?.build?.experimental?.ios?.appExtensions ??
                []),
              {
                targetName: folderName,
                bundleIdentifier: extensionBundleIdentifier,
                entitlements: {
                  'com.apple.security.application-groups': [
                    'group.com.ppyn.passwall',
                  ],
                  'com.apple.developer.authentication-services.autofill-credential-provider':
                    true,
                },
              },
            ],
          },
        },
      },
    },
  };

  return config;
};
