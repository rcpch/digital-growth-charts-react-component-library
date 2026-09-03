// SPDX-License-Identifier: AGPL-3.0-or-later
// @ts-check

/**
 * Regenerate typed measurement fixtures from a running digital growth charts
 * API. The API must expose X-Git-Revision and provenance-aware measurements.
 * Use the repository entry point, s/generate-fixtures, rather than invoking
 * this implementation directly.
 */
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { format } from 'prettier';

const IMPLEMENTATION_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(IMPLEMENTATION_DIR, '..');
const OUT_DIR = join(REPO_ROOT, 'src', 'testParameters', 'measurements', 'generated');
const MEASUREMENT_IMPORT = '../../../interfaces/RCPCHMeasurementObject';
const REQUEST_TIMEOUT_MS = 30_000;

const scenarios = JSON.parse(readFileSync(join(IMPLEMENTATION_DIR, 'measurement-scenarios.json'), 'utf8'));

/** @param {string} reference */
const referenceToCamelCase = (reference) =>
    reference.replace(/-([a-z0-9])/g, (_, character) => character.toUpperCase()).replace(/-/g, '');

/** @param {string} value */
const capitalise = (value) => value.charAt(0).toUpperCase() + value.slice(1);

/** @param {string} reference */
const expectedProvenanceReference = (reference) => (reference === 'turner' ? 'turners-syndrome' : reference);

function usage() {
    console.log(`Usage: s/generate-fixtures [--api-base-url URL]

Options:
  --api-base-url URL   API origin (default: FIXTURE_API_BASEURL or http://127.0.0.1:8000)
  --help               Show this help`);
}

/** @param {string[]} args */
function parseArgs(args) {
    let baseUrl = process.env.FIXTURE_API_BASEURL || 'http://127.0.0.1:8000';

    for (let index = 0; index < args.length; index += 1) {
        const argument = args[index];
        if (argument === '--help') {
            usage();
            process.exit(0);
        }
        if (argument === '--api-base-url') {
            baseUrl = args[index + 1];
            index += 1;
            if (!baseUrl) throw new Error('--api-base-url requires a URL');
            continue;
        }
        if (argument.startsWith('--api-base-url=')) {
            baseUrl = argument.slice('--api-base-url='.length);
            continue;
        }
        throw new Error(`Unknown argument: ${argument}`);
    }

    return baseUrl.replace(/\/$/, '');
}

/**
 * @param {string} baseUrl
 * @param {string} reference
 * @param {string} endpoint
 * @param {Record<string, unknown>} body
 */
async function post(baseUrl, reference, endpoint, body) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
        const response = await fetch(`${baseUrl}/${reference}/${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
            signal: controller.signal,
        });
        const text = await response.text();
        let json;
        try {
            json = JSON.parse(text);
        } catch {
            json = undefined;
        }
        return { status: response.status, json, text };
    } finally {
        clearTimeout(timer);
    }
}

/**
 * @param {string} endpoint
 * @param {any} response
 * @returns {any[]}
 */
function measurementsFromResponse(endpoint, response) {
    if (endpoint === 'fictional-child-data') return Array.isArray(response) ? response : [];
    if (endpoint === 'calculation') return response ? [response] : [];
    if (endpoint === 'bulk-calculation') {
        const results = response?.results || [];
        const measurements = results.filter((result) => result?.plottable_data);
        if (measurements.length !== results.length) {
            throw new Error(`bulk-calculation returned ${results.length - measurements.length} error result(s)`);
        }
        return measurements;
    }
    throw new Error(`Unsupported endpoint: ${endpoint}`);
}

function buildJobs() {
    const jobs = [];
    const series = scenarios.series;

    for (const matrix of series.matrices) {
        for (const sex of matrix.sexes) {
            for (const method of matrix.methods) {
                jobs.push({
                    name: `${referenceToCamelCase(matrix.reference)}${capitalise(sex)}${capitalise(method)}`,
                    reference: matrix.reference,
                    endpoint: series.endpoint,
                    body: { ...series.body, measurement_method: method, sex },
                    description: `${matrix.reference} ${sex} ${method}, age ${series.body.start_chronological_age}-${series.body.end_age}`,
                });
            }
        }
    }

    for (const special of scenarios.special) jobs.push(special);

    const names = jobs.map(({ name }) => name);
    if (new Set(names).size !== names.length) throw new Error('Fixture scenario names must be unique');

    return jobs;
}

/** @param {any[]} measurements @param {any} job */
function validateProvenance(measurements, job) {
    const expectedReference = expectedProvenanceReference(job.reference);
    let engine;

    for (const [index, measurement] of measurements.entries()) {
        const provenance = measurement?.provenance;
        if (!provenance?.calculation_engine) {
            throw new Error(`${job.name}[${index}] has no calculation-engine provenance`);
        }
        if (provenance.growth_reference !== expectedReference) {
            throw new Error(
                `${job.name}[${index}] provenance is ${provenance.growth_reference}, expected ${expectedReference}`,
            );
        }

        const measurementEngine = provenance.calculation_engine;
        if (
            measurementEngine.name !== 'rcpchgrowth' ||
            !measurementEngine.version ||
            !/^[0-9a-f]{40}$/.test(measurementEngine.commit)
        ) {
            throw new Error(`${job.name}[${index}] has invalid calculation-engine provenance`);
        }
        const identity = `${measurementEngine.name}@${measurementEngine.version}#${measurementEngine.commit}`;
        if (engine && identity !== engine.identity) {
            throw new Error(`${job.name} contains measurements from different calculation engines`);
        }
        engine = { ...measurementEngine, identity };
    }

    return engine;
}

/** @param {any} fixture @param {string} serverRevision */
async function renderFixture(fixture, serverRevision) {
    const header = [
        '// AUTO-GENERATED by s/generate-fixtures - DO NOT EDIT BY HAND.',
        '// Regenerate against a provenance-aware API and review the resulting diff.',
        `// Source server: ${serverRevision}`,
        `// Engine: ${fixture.engine.name} ${fixture.engine.version} (${fixture.engine.commit})`,
        `// Scenario: ${fixture.job.description}`,
    ].join('\n');
    const source = `${header}

import type { Measurement } from '${MEASUREMENT_IMPORT}';

export const ${fixture.job.name}: Measurement[] = ${JSON.stringify(fixture.measurements)};
`;
    return format(source, { parser: 'typescript', tabWidth: 4, singleQuote: true, printWidth: 120 });
}

/** @param {any[]} fixtures */
async function renderIndex(fixtures) {
    const names = fixtures.map((fixture) => fixture.job.name);
    const source = `// AUTO-GENERATED by s/generate-fixtures - DO NOT EDIT BY HAND.
${names.map((name) => `export { ${name} } from './${name}';`).join('\n')}
`;
    return format(source, { parser: 'typescript', tabWidth: 4, singleQuote: true, printWidth: 120 });
}

async function main() {
    const baseUrl = parseArgs(process.argv.slice(2));
    console.log(`Generating measurement fixtures from ${baseUrl}`);

    let rootResponse;
    try {
        rootResponse = await fetch(`${baseUrl}/`, { signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) });
    } catch (error) {
        throw new Error(`API is not reachable at ${baseUrl}. Bring it up before generating fixtures.`, {
            cause: error,
        });
    }
    if (!rootResponse.ok) throw new Error(`GET ${baseUrl}/ returned HTTP ${rootResponse.status}`);

    const serverRevision = rootResponse.headers.get('x-git-revision');
    if (!serverRevision) {
        throw new Error('The API did not expose X-Git-Revision. Rebuild it with GITHUB_SHA set.');
    }
    if (!/^[0-9a-f]{40}$/.test(serverRevision)) {
        throw new Error(`The API exposed an invalid X-Git-Revision: ${serverRevision}`);
    }

    const fixtures = [];
    let sharedEngine;
    for (const job of buildJobs()) {
        const response = await post(baseUrl, job.reference, job.endpoint, job.body);
        if (response.status !== 200 || response.json == null) {
            const detail = response.json ? JSON.stringify(response.json) : response.text;
            throw new Error(`${job.name} returned HTTP ${response.status}: ${detail.slice(0, 500)}`);
        }

        const measurements = measurementsFromResponse(job.endpoint, response.json);
        if (measurements.length === 0) throw new Error(`${job.name} returned no measurements`);
        const engine = validateProvenance(measurements, job);
        if (sharedEngine && engine.identity !== sharedEngine.identity) {
            throw new Error(`${job.name} used ${engine.identity}, but earlier fixtures used ${sharedEngine.identity}`);
        }
        sharedEngine = engine;
        fixtures.push({ job, measurements, engine });
        process.stdout.write('.');
    }
    process.stdout.write('\n');

    const renderedFixtures = await Promise.all(
        fixtures.map(async (fixture) => {
            const source = await renderFixture(fixture, serverRevision);
            return {
                name: fixture.job.name,
                source,
                sourceSha256: createHash('sha256').update(source).digest('hex'),
            };
        }),
    );
    const sourceHashes = Object.fromEntries(renderedFixtures.map(({ name, sourceSha256 }) => [name, sourceSha256]));
    const indexSource = await renderIndex(fixtures);
    const manifest = {
        server: { revision: serverRevision },
        calculationEngine: {
            name: sharedEngine.name,
            version: sharedEngine.version,
            commit: sharedEngine.commit,
        },
        fixtureCount: fixtures.length,
        fixtures: fixtures.map(({ job, measurements }) => ({
            name: job.name,
            description: job.description,
            measurementCount: measurements.length,
            sourceSha256: sourceHashes[job.name],
            request: {
                reference: job.reference,
                endpoint: job.endpoint,
                body: job.body,
            },
        })),
    };
    const manifestSource = await format(JSON.stringify(manifest), { parser: 'json', tabWidth: 4, printWidth: 120 });

    // Do not remove the previous complete fixture set until every request has
    // succeeded and every replacement file has been rendered.
    rmSync(OUT_DIR, { recursive: true, force: true });
    mkdirSync(OUT_DIR, { recursive: true });
    for (const fixture of renderedFixtures) writeFileSync(join(OUT_DIR, `${fixture.name}.ts`), fixture.source);
    writeFileSync(join(OUT_DIR, 'index.ts'), indexSource);
    writeFileSync(join(OUT_DIR, 'manifest.json'), manifestSource);

    console.log(`Wrote ${fixtures.length} fixtures from ${serverRevision}.`);
    console.log(`Calculation engine: ${sharedEngine.name} ${sharedEngine.version} (${sharedEngine.commit})`);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
