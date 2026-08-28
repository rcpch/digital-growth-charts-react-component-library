import { createHash } from 'node:crypto';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const EXPECTED_FIXTURE_COUNT = 45;

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

describe('API-generated measurement fixtures', () => {
    it('contains every declared scenario', () => {
        expect(manifest.fixtureCount).toBe(EXPECTED_FIXTURE_COUNT);
        expect(manifest.fixtures).toHaveLength(EXPECTED_FIXTURE_COUNT);
        expect(new Set(manifest.fixtures.map(({ name }) => name)).size).toBe(EXPECTED_FIXTURE_COUNT);
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
