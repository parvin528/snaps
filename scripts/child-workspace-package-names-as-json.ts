#!yarn ts-node

import execa from 'execa';

const PRIVATE_WORKSPACES = ['@metamask/snaps-simulator'];

/**
 * The entrypoint to this script.
 */
async function main() {
  const { stdout } = await execa('yarn', [
    'workspaces',
    'list',
    '--no-private',
    '--json',
  ]);

  const workspaces = stdout.split('\n').map((line) => JSON.parse(line));
  const childWorkspaceNames = workspaces
    .filter((workspace) => workspace.location !== '.')
    .map((workspace) => workspace.name);

  // eslint-disable-next-line no-console
  console.log(JSON.stringify([...childWorkspaceNames, ...PRIVATE_WORKSPACES]));
}

main().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exitCode = 1;
});
