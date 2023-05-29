import { XcodeProject } from '@expo/config-plugins';
import addXCConfigurationList from './addXCConfigurationList';
import addProductFile from './addProductFile';
import addToPbxNativeTargetSection from './addToPbxNativeTargetSection';
import addToPbxProjectSection from './addToPbxProjectSection';
import addTargetDependency from './addTargetDependency';
import addBuildPhases from './addBuildPhases';
import addPbxGroup from './addPbxGroup';

type AddXCodeTargetParmas = {
  appName: string;
  extensionName: string;
  extensionBundleIdentifier: string;
  currentProjectVersion: string;
  marketingVersion: string;
  iosRoot: string;
  extensionPath: string;
};

export async function addAutoFillExtensionXcodeTarget(
  proj: XcodeProject,
  {
    appName,
    extensionName,
    extensionBundleIdentifier,
    currentProjectVersion,
    marketingVersion,
    extensionPath,
  }: AddXCodeTargetParmas,
) {
  if (proj.getFirstProject().firstProject.targets?.length > 1) return true;
  const targetUuid = proj.generateUuid();
  const groupName = 'Embed Foundation Extensions';

  const xCConfigurationList = addXCConfigurationList(proj, {
    extensionBundleIdentifier,
    currentProjectVersion,
    marketingVersion,
    extensionName,
    appName,
  });

  const { productFile, authServiceProducFile } = addProductFile(
    proj,
    extensionName,
    groupName,
  );

  const target = addToPbxNativeTargetSection(proj, {
    extensionName,
    targetUuid,
    productFile,
    xCConfigurationList,
  });

  addToPbxProjectSection(proj, target);
  addTargetDependency(proj, target);

  addBuildPhases(proj, {
    groupName,
    productFile,
    targetUuid,
    extensionName,
    authServiceProducFile,
    extensionPath,
  });

  addPbxGroup(proj, { extensionName, extensionPath });

  return true;
}
