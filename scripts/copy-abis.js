#!/usr/bin/env node

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { parseArgs } from 'util';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const { values } = parseArgs({
  options: {
    amm: { type: 'string' },
    resolver: { type: 'string' },
    help: { type: 'boolean', short: 'h' }
  }
});

if (values.help) {
  console.log(`
Usage: node copy-abis.js --amm=<path> --resolver=<path>

Copy ABIs from Foundry artifacts to src/abi/core/

Options:
  --amm       Path to hitcastor-contracts-amm/out directory
  --resolver  Path to hitcastor-contracts-resolver/out directory
  --help, -h  Show this help message

Example:
  node copy-abis.js --amm=../hitcastor-contracts-amm/out --resolver=../hitcastor-contracts-resolver/out
`);
  process.exit(0);
}

if (!values.amm || !values.resolver) {
  console.error('Error: Both --amm and --resolver paths are required');
  process.exit(1);
}

const ROOT_DIR = join(__dirname, '..');
const ABI_DIR = join(ROOT_DIR, 'src', 'abi', 'core');

if (!existsSync(ABI_DIR)) {
  mkdirSync(ABI_DIR, { recursive: true });
}

function extractAbi(artifactPath, outputPath) {
  try {
    if (!existsSync(artifactPath)) {
      console.error(`Artifact not found: ${artifactPath}`);
      return false;
    }

    const artifact = JSON.parse(readFileSync(artifactPath, 'utf8'));
    
    if (!artifact.abi) {
      console.error(`No ABI found in artifact: ${artifactPath}`);
      return false;
    }

    const abiOnly = {
      abi: artifact.abi
    };

    writeFileSync(outputPath, JSON.stringify(abiOnly, null, 2));
    console.log(`✓ Extracted ABI to ${outputPath}`);
    return true;
  } catch (error) {
    console.error(`Error processing ${artifactPath}:`, error.message);
    return false;
  }
}

const contracts = [
  {
    name: 'Market',
    source: 'amm',
    foundryName: 'Market.sol/Market.json'
  },
  {
    name: 'MarketFactory', 
    source: 'amm',
    foundryName: 'MarketFactory.sol/MarketFactory.json'
  },
  {
    name: 'Resolver',
    source: 'resolver',
    foundryName: 'Resolver.sol/Resolver.json'
  }
];

let success = true;

for (const contract of contracts) {
  const sourcePath = contract.source === 'amm' ? values.amm : values.resolver;
  const artifactPath = join(sourcePath, contract.foundryName);
  const outputPath = join(ABI_DIR, `${contract.name}.json`);
  
  if (!extractAbi(artifactPath, outputPath)) {
    success = false;
  }
}

if (success) {
  console.log('\n🎉 All ABIs copied successfully!');
  console.log('\nNext steps:');
  console.log('1. Review the extracted ABIs');
  console.log('2. Update version in package.json if needed');
  console.log('3. Run: pnpm build && pnpm test');
  console.log('4. Publish: npm publish');
} else {
  console.log('\n❌ Some ABIs failed to copy. Please check the errors above.');
  process.exit(1);
}