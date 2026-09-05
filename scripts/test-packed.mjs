import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { cp, mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const directory = await mkdtemp(join(tmpdir(), 'lomray-eslint-consumer-'));
const projectRoot = process.cwd();
const manifest = JSON.parse(await readFile('package.json', 'utf8'));
const typescript = JSON.parse(await readFile('node_modules/typescript/package.json', 'utf8'));
const baseArchive = process.env.LOMRAY_BASE_CONFIG_ARCHIVE;

try {
    execFileSync('npm', ['pack', '--ignore-scripts', '--pack-destination', directory], {
        stdio: 'ignore',
    });
    const archives = (await readdir(directory)).filter((file) => file.endsWith('.tgz'));

    assert.equal(archives.length, 1);
    await writeFile(
        join(directory, 'package.json'),
        JSON.stringify({
            private: true,
            type: 'module',
            devDependencies: {
                ...(baseArchive ? { '@lomray/eslint-config': `file:${baseArchive}` } : {}),
                react: manifest.devDependencies.react,
                '@types/react': manifest.devDependencies['@types/react'],
                [manifest.name]: `file:./${archives[0]}`,
                eslint: manifest.devDependencies.eslint,
                prettier: manifest.devDependencies.prettier,
                typescript: typescript.version,
            },
        }),
    );
    execFileSync('npm', ['install', '--ignore-scripts', '--no-fund'], {
        cwd: directory,
        stdio: 'inherit',
    });
    execFileSync('npm', ['ls', '--all'], { cwd: directory, stdio: 'ignore' });
    await cp(join(projectRoot, 'tests/fixtures'), directory, { recursive: true });
    await writeFile(
        join(directory, 'eslint.config.js'),
        `import config from '${manifest.name}';\nexport default config.config();\n`,
    );
    execFileSync(
        process.execPath,
        [join(directory, 'node_modules/eslint/bin/eslint.js'), 'src/valid.tsx', '--max-warnings=0'],
        { cwd: directory, stdio: 'inherit' },
    );
    console.info('Packed config: clean installation and typed React consumer on ESLint 10 passed.');
} finally {
    await rm(directory, { recursive: true, force: true });
}
