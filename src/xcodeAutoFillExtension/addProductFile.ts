import { XcodeProject } from '@expo/config-plugins';

export default function addProductFile(
  proj: XcodeProject,
  extensionName: string,
  groupName: string,
) {
  const productFile = {
    basename: `${extensionName}.appex`,
    fileRef: proj.generateUuid(),
    uuid: proj.generateUuid(),
    group: groupName,
    explicitFileType: 'wrapper.app-extension',
    settings: {
      ATTRIBUTES: ['RemoveHeadersOnCopy'],
    },
    includeInIndex: 0,
    path: `${extensionName}.appex`,
    sourceTree: 'BUILT_PRODUCTS_DIR',
  };

  const authServiceProducFile = {
    basename: 'AuthenticationServices.framework',
    lastKnownFileType: 'wrapper.framework',
    fileRef: proj.generateUuid(),
    uuid: proj.generateUuid(),
    group: groupName,
    explicitFileType: 'wrapper.app-extension',
    includeInIndex: 0,
    path: 'System/Library/Frameworks/AuthenticationServices.framework',
    sourceTree: 'SDKROOT',
  };

  proj.addToPbxFileReferenceSection(productFile);
  proj.addToPbxBuildFileSection(productFile);

  proj.addToPbxFileReferenceSection(authServiceProducFile);
  proj.addToPbxBuildFileSection(authServiceProducFile);

  return { productFile, authServiceProducFile };
}
