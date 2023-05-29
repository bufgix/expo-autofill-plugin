import { XcodeProject } from '@expo/config-plugins';
import { PBXFile, quoted } from '../utils';
import fs from 'fs';

type AddBuildPhaseParams = {
  groupName: string;
  productFile: PBXFile;
  authServiceProducFile: PBXFile;
  targetUuid: string;
  extensionName: string;
  extensionPath: string;
};

export default function addBuildPhases(
  proj: XcodeProject,
  {
    groupName,
    productFile,
    targetUuid,
    extensionName,
    authServiceProducFile,
    extensionPath,
  }: AddBuildPhaseParams,
) {
  const buildPath = quoted('');

  const allSwiftFiles = fs
    .readdirSync(extensionPath)
    .filter(file => file.endsWith('.swift'))
    .map(file => `../${extensionName}/${file}`);

  // Sources build phase
  proj.addBuildPhase(
    allSwiftFiles,
    'PBXSourcesBuildPhase',
    groupName,
    targetUuid,
    'app_extension',
    buildPath,
  );

  // Copy files build phase
  proj.addBuildPhase(
    [productFile.path],
    'PBXCopyFilesBuildPhase',
    groupName,
    proj.getFirstTarget().uuid,
    'app_extension',
    buildPath,
  );

  // Frameworks build phase
  proj.addBuildPhase(
    [authServiceProducFile.path],
    'PBXFrameworksBuildPhase',
    groupName,
    targetUuid,
    'app_extension',
    buildPath,
  );

  // Resources build phase
  proj.addBuildPhase(
    [`../${extensionName}/MainInterface.storyboard`],
    'PBXResourcesBuildPhase',
    groupName,
    targetUuid,
    'app_extension',
    buildPath,
  );
}
