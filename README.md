# @hitcastor/protocol

[![npm version](https://badge.fury.io/js/@hitcastor%2Fprotocol.svg)](https://badge.fury.io/js/@hitcastor%2Fprotocol)
[![CI](https://github.com/hitcastor/hitcastor-protocol/actions/workflows/ci.yml/badge.svg)](https://github.com/hitcastor/hitcastor-protocol/actions/workflows/ci.yml)

The single source of truth for Hitcastor protocol ABIs, types, and addresses. This package provides trimmed contract ABIs, deployed addresses, shared types, and constants for the Hitcastor prediction market ecosystem on BNB Chain.

## What is this package?

This is the public interface package for Hitcastor protocol that contains:

- **Contract ABIs**: Trimmed ABIs for CPMM/Market, MarketFactory, and Resolver contracts
- **Deployed Addresses**: Contract addresses for BSC mainnet and testnet
- **Shared Types**: TypeScript types for Evidence data and EIP-712 schemas
- **Constants**: Event names and protocol rule summaries

## Installation

```bash
npm install @hitcastor/protocol
# or
pnpm add @hitcastor/protocol
# or
yarn add @hitcastor/protocol
```

## Usage

### Import ABIs and addresses

```typescript
import { MARKET_ABI, MARKET_FACTORY_ABI, RESOLVER_ABI, ERC20_MIN_ABI } from '@hitcastor/protocol';
import { ADDRESSES as BSC } from '@hitcastor/protocol/src/addresses/bsc';
import { ADDRESSES as BSC_TESTNET } from '@hitcastor/protocol/src/addresses/bscTestnet';

// Use with viem
import { createPublicClient, http } from 'viem';
import { bsc } from 'viem/chains';

const client = createPublicClient({
  chain: bsc,
  transport: http(),
});

const marketContract = {
  address: BSC.factory,
  abi: MARKET_FACTORY_ABI,
} as const;
```

### Import types and constants

```typescript
import { 
  Evidence, 
  EvidenceSide, 
  RULES_SUMMARY, 
  KYC_PASS_TYPES, 
  KYC_DOMAIN,
  EVENTS 
} from '@hitcastor/protocol';

// Evidence structure for market resolution
const evidence: Evidence = {
  t0: {
    csvUrl: 'https://example.com/spotify-daily-top200-t0.csv',
    csvSha256: '0x1234...abcd',
    jsonUrl: 'https://example.com/top100-t0.json', 
    jsonSha256: '0xabcd...1234',
    ipfsCid: 'QmExample...'
  },
  t1: {
    csvUrl: 'https://example.com/spotify-daily-top200-t1.csv',
    csvSha256: '0x5678...efgh',
    jsonUrl: 'https://example.com/top100-t1.json',
    jsonSha256: '0xefgh...5678'
  }
};

// EIP-712 for KYC signatures
const domain = KYC_DOMAIN(56); // BSC mainnet
const types = KYC_PASS_TYPES;

// Event names
console.log(EVENTS.MARKET_CREATED); // "MarketCreated"
console.log(EVENTS.RESOLVED); // "Resolved"
```

### Protocol Rules

```typescript
import { RULES_SUMMARY } from '@hitcastor/protocol';

console.log(RULES_SUMMARY);
// "YES if rank(t1) < rank(t0); tie=NO; absent=rank101=NO."
```

## Contract Addresses

### BSC Mainnet (Chain ID: 56)
```typescript
import { ADDRESSES } from '@hitcastor/protocol/src/addresses/bsc';

console.log(ADDRESSES.factory);      // MarketFactory address
console.log(ADDRESSES.resolver);     // Resolver address  
console.log(ADDRESSES.treasury);     // Treasury address
console.log(ADDRESSES.quoteTokenUSDT); // USDT address
console.log(ADDRESSES.quoteTokenFDUSD); // FDUSD address
```

### BSC Testnet (Chain ID: 97)
```typescript
import { ADDRESSES } from '@hitcastor/protocol/src/addresses/bscTestnet';
// Same structure as mainnet
```

## Updating ABIs

When contract ABIs change, use the provided script to copy updated ABIs from the contract repositories:

```bash
# Copy ABIs from local Foundry repositories
pnpm copy-abis --amm=../hitcastor-contracts-amm/out --resolver=../hitcastor-contracts-resolver/out

# Review changes, update version, and publish
pnpm build && pnpm test
npm version patch  # or minor/major based on changes
npm publish
```

The `copy-abis` script:
- Reads Foundry artifacts from specified directories
- Strips bytecode, deployedBytecode, and metadata
- Keeps only the `abi` field
- Writes trimmed ABIs to `src/abi/core/*.json`

## Versioning Policy

This package follows [Semantic Versioning](https://semver.org/):

- **Major version**: Breaking ABI changes (function signatures changed/removed)
- **Minor version**: Additive ABI changes (new functions added) or new features
- **Patch version**: Bug fixes, documentation, or non-ABI changes

## Package Structure

```
src/
├── abi/
│   ├── core/
│   │   ├── Market.json          # CPMM/Market contract ABI
│   │   ├── MarketFactory.json   # MarketFactory contract ABI
│   │   └── Resolver.json        # Resolver contract ABI
│   └── std/
│       └── ERC20_MIN.json       # Minimal ERC-20 ABI
├── addresses/
│   ├── bsc.ts                   # BSC mainnet addresses
│   └── bscTestnet.ts           # BSC testnet addresses
├── types/
│   └── evidence.ts             # Evidence and related types
├── eip712.ts                   # EIP-712 schemas for KYC
├── events.ts                   # Event name constants
└── index.ts                    # Main exports
```

## Protocol Overview

Hitcastor is a prediction market protocol running on BNB Chain that uses:

- **Data Source**: Spotify Daily Top-200 CSV files
- **Market Scope**: Top-100 songs (rank 1-100)
- **Resolution Rule**: YES if `rank(t1) < rank(t0)`; ties and absent songs (rank > 100) resolve to NO
- **Chain**: BNB Chain (BSC) with default chainId 56

## Development

```bash
# Install dependencies
pnpm install

# Build the package
pnpm build

# Run tests
pnpm test

# Lint and format
pnpm lint
pnpm format

# Run copy-abis script
pnpm copy-abis --amm=../path/to/amm/out --resolver=../path/to/resolver/out
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes and add tests
4. Ensure `pnpm build` and `pnpm test` pass
5. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Links

- [GitHub Repository](https://github.com/hitcastor/hitcastor-protocol)
- [npm Package](https://www.npmjs.com/package/@hitcastor/protocol)
- [Hitcastor Documentation](https://docs.hitcastor.com)

## Support

For issues and questions:
- [GitHub Issues](https://github.com/hitcastor/hitcastor-protocol/issues)
- [Discord Community](https://discord.gg/hitcastor)