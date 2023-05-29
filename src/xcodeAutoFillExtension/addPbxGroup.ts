import { XcodeProject } from '@expo/config-plugins';
import fs from 'fs';

export default function addPbxGroup(
  proj: XcodeProject,
  {
    extensionName,
    extensionPath,
  }: { extensionName: string; extensionPath: string },
) {
  const allExtensionFiles = fs.readdirSync(extensionPath);

  // Add PBX group
  const { uuid: pbxGroupUuid } = proj.addPbxGroup(
    allExtensionFiles,
    extensionName,
    `../${extensionName}`,
  );

  // Add PBXGroup to top level group
  const groups = proj.hash.project.objects.PBXGroup;
  if (pbxGroupUuid) {
    Object.keys(groups).forEach(function (key) {
      if (groups[key].name === undefined && groups[key].path === undefined) {
        proj.addToPbxGroup(pbxGroupUuid, key);
      }
    });
  }
}
