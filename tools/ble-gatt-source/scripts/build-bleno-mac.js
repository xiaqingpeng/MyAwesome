const { copyFileSync, existsSync, mkdirSync } = require('fs');
const { dirname, join } = require('path');
const { execFileSync } = require('child_process');

if (process.platform !== 'darwin') {
  console.log('bleno macOS native binding build skipped: current platform is not macOS.');
  process.exit(0);
}

const blenoPackageJson = require.resolve('@abandonware/bleno/package.json');
const blenoRoot = dirname(blenoPackageJson);
const macDir = join(blenoRoot, 'lib', 'mac');
const expectedBinding = join(macDir, 'native', 'binding.node');

if (existsSync(expectedBinding)) {
  console.log('bleno macOS native binding already exists.');
  process.exit(0);
}

const nodeGyp = join(process.cwd(), 'node_modules', '.bin', 'node-gyp');
console.log('building bleno macOS native binding...');
execFileSync(nodeGyp, ['rebuild'], {
  cwd: macDir,
  stdio: 'inherit',
});

const builtBinding = join(macDir, 'build', 'Release', 'binding.node');
if (!existsSync(builtBinding)) {
  throw new Error(`node-gyp finished, but binding was not found at ${builtBinding}`);
}

mkdirSync(dirname(expectedBinding), { recursive: true });
copyFileSync(builtBinding, expectedBinding);
console.log(`bleno macOS native binding ready: ${expectedBinding}`);
