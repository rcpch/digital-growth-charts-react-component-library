import { createHash } from 'node:crypto';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

interface MeasurementScenarios {
    series: { matrices: Array<{ sexes: string[]; methods: string[] }> };
    special: unknown[];
}

interface FixtureManifest {
    server: { revision: string };
    calculationEngine: { name: string; version: string; commit: string };
    fixtureCount: number;
    fixtures: Array<{
        name: string;
        measurementCount: number;
        sourceSha256: string;
        request: { reference: string; endpoint: string; body: Record<string, unknown> };
    }>;
}

const generatedDirectory = join(__dirname, 'generated');
const manifest: FixtureManifest = JSON.parse(readFileSync(join(generatedDirectory, 'manifest.json'), 'utf8'));
const scenarios: MeasurementScenarios = JSON.parse(
    readFileSync(join(__dirname, '../../../fixture-generation/measurement-scenarios.json'), 'utf8'),
);
const expectedFixtureCount =
    scenarios.series.matrices.reduce((count, matrix) => count + matrix.sexes.length * matrix.methods.length, 0) +
    scenarios.special.length;

describe('API-generated measurement fixtures', () => {
    it('contains every declared scenario', () => {
        expect(manifest.fixtureCount).toBe(expectedFixtureCount);
        expect(manifest.fixtures).toHaveLength(expectedFixtureCount);
        expect(new Set(manifest.fixtures.map(({ name }) => name)).size).toBe(expectedFixtureCount);
    });

    it('records a complete request and non-empty response for every fixture', () => {
        for (const fixture of manifest.fixtures) {
            expect(fixture.measurementCount).toBeGreaterThan(0);
            expect(fixture.request.reference).toBeTruthy();
            expect(fixture.request.endpoint).toBeTruthy();
            expect(fixture.request.body).toBeDefined();
        }
    });

    it('contains exactly the generated files recorded by the manifest', () => {
        const fixtureFiles = readdirSync(generatedDirectory)
            .filter((name) => name.endsWith('.ts') && name !== 'index.ts')
            .sort();
        const manifestFiles = manifest.fixtures.map(({ name }) => `${name}.ts`).sort();

        expect(fixtureFiles).toEqual(manifestFiles);
    });

    it('exports every generated fixture recorded by the manifest', () => {
        const indexSource = readFileSync(join(generatedDirectory, 'index.ts'), 'utf8');
        const exportedFixtures = Array.from(
            indexSource.matchAll(/export \{ (\w+) \} from/g),
            (match) => match[1],
        ).sort();
        const manifestFixtures = manifest.fixtures.map(({ name }) => name).sort();

        expect(exportedFixtures).toEqual(manifestFixtures);
    });

    it('embeds the requested canonical provenance in every measurement', () => {
        for (const fixture of manifest.fixtures) {
            const source = readFileSync(join(generatedDirectory, `${fixture.name}.ts`), 'utf8');
            const provenanceReferences = Array.from(
                source.matchAll(/growth_reference: '([^']+)'/g),
                (match) => match[1],
            );
            const expectedReference =
                fixture.request.reference === 'turner' ? 'turners-syndrome' : fixture.request.reference;

            expect(provenanceReferences).toHaveLength(fixture.measurementCount);
            expect(new Set(provenanceReferences)).toEqual(new Set([expectedReference]));
        }
    });

    it('matches the recorded content hash for every generated fixture', () => {
        for (const fixture of manifest.fixtures) {
            const source = readFileSync(join(generatedDirectory, `${fixture.name}.ts`), 'utf8');
            const sourceSha256 = createHash('sha256').update(source).digest('hex');

            expect(sourceSha256).toBe(fixture.sourceSha256);
        }
    });

    it('records the exact server and calculation-engine revisions', () => {
        expect(manifest.server.revision).toMatch(/^[0-9a-f]{40}$/);
        expect(manifest.calculationEngine.name).toBe('rcpchgrowth');
        expect(manifest.calculationEngine.version).toBeTruthy();
        expect(manifest.calculationEngine.commit).toMatch(/^[0-9a-f]{40}$/);
    });
});
