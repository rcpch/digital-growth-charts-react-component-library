const parseVersion = (value) => value.split('.').map(Number);

const [nodeMajor, nodeMinor, nodePatch] = parseVersion(process.versions.node);
const nodeSupported =
    nodeMajor > 20 || (nodeMajor === 20 && (nodeMinor > 19 || (nodeMinor === 19 && nodePatch >= 0)));

if (!nodeSupported) {
    console.error('Local development requires Node.js 20.19.0 or newer.');
    process.exit(1);
}

const userAgent = process.env.npm_config_user_agent || '';
const npmMatch = userAgent.match(/npm\/(\d+)\.(\d+)\.(\d+)/);

if (npmMatch) {
    const [, npmMajor, npmMinor] = npmMatch.map(Number);
    const npmSupported = npmMajor > 10 || (npmMajor === 10 && npmMinor >= 0);

    if (!npmSupported) {
        console.error('Local development requires npm 10 or newer.');
        process.exit(1);
    }
}
