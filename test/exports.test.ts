import { describe, it, expect } from 'vitest';
import {
  MARKET_ABI,
  MARKET_FACTORY_ABI,
  RESOLVER_ABI,
  ERC20_MIN_ABI,
  BSC_ADDRESSES,
  BSC_TESTNET_ADDRESSES,
  Evidence,
  EvidenceSide,
  RULES_SUMMARY,
  KYC_PASS_TYPES,
  KYC_DOMAIN,
  EVENTS,
  EventName,
} from '../src/index.js';

describe('Package Exports', () => {
  it('should export all ABIs', () => {
    expect(MARKET_ABI).toBeDefined();
    expect(Array.isArray(MARKET_ABI)).toBe(true);
    expect(MARKET_ABI.length).toBeGreaterThan(0);

    expect(MARKET_FACTORY_ABI).toBeDefined();
    expect(Array.isArray(MARKET_FACTORY_ABI)).toBe(true);
    expect(MARKET_FACTORY_ABI.length).toBeGreaterThan(0);

    expect(RESOLVER_ABI).toBeDefined();
    expect(Array.isArray(RESOLVER_ABI)).toBe(true);
    expect(RESOLVER_ABI.length).toBeGreaterThan(0);

    expect(ERC20_MIN_ABI).toBeDefined();
    expect(Array.isArray(ERC20_MIN_ABI)).toBe(true);
    expect(ERC20_MIN_ABI.length).toBe(3);
  });

  it('should export address configurations', () => {
    expect(BSC_ADDRESSES).toBeDefined();
    expect(BSC_ADDRESSES.chainId).toBe(56);
    expect(BSC_ADDRESSES.resolver).toBeDefined();
    expect(BSC_ADDRESSES.factory).toBeDefined();
    expect(BSC_ADDRESSES.treasury).toBeDefined();
    expect(BSC_ADDRESSES.quoteTokenUSDT).toBeDefined();
    expect(BSC_ADDRESSES.quoteTokenFDUSD).toBeDefined();

    expect(BSC_TESTNET_ADDRESSES).toBeDefined();
    expect(BSC_TESTNET_ADDRESSES.chainId).toBe(97);
    expect(BSC_TESTNET_ADDRESSES.resolver).toBeDefined();
    expect(BSC_TESTNET_ADDRESSES.factory).toBeDefined();
    expect(BSC_TESTNET_ADDRESSES.treasury).toBeDefined();
    expect(BSC_TESTNET_ADDRESSES.quoteTokenUSDT).toBeDefined();
    expect(BSC_TESTNET_ADDRESSES.quoteTokenFDUSD).toBeDefined();
  });

  it('should export evidence types', () => {
    expect(RULES_SUMMARY).toBe('YES if rank(t1) < rank(t0); tie=NO; absent=rank101=NO.');
  });

  it('should export EIP-712 types', () => {
    expect(KYC_PASS_TYPES).toBeDefined();
    expect(KYC_PASS_TYPES.KycPass).toBeDefined();
    expect(KYC_PASS_TYPES.KycPass).toHaveLength(2);
    expect(KYC_PASS_TYPES.KycPass[0]).toEqual({ name: 'wallet', type: 'address' });
    expect(KYC_PASS_TYPES.KycPass[1]).toEqual({ name: 'expires', type: 'uint256' });

    expect(KYC_DOMAIN).toBeDefined();
    expect(typeof KYC_DOMAIN).toBe('function');
    
    const domain = KYC_DOMAIN(56);
    expect(domain.name).toBe('HitcastorKYC');
    expect(domain.version).toBe('1');
    expect(domain.chainId).toBe(56);
  });

  it('should export event constants', () => {
    expect(EVENTS).toBeDefined();
    expect(EVENTS.RESOLVE_COMMITTED).toBe('ResolveCommitted');
    expect(EVENTS.RESOLVED).toBe('Resolved');
    expect(EVENTS.MARKET_CREATED).toBe('MarketCreated');
    expect(EVENTS.SWAP).toBe('Swap');
    expect(EVENTS.LIQUIDITY_ADDED).toBe('LiquidityAdded');
    expect(EVENTS.LIQUIDITY_REMOVED).toBe('LiquidityRemoved');
    expect(EVENTS.OUTCOME_APPLIED).toBe('OutcomeApplied');
    expect(EVENTS.REDEEMED).toBe('Redeemed');
  });
});

describe('ABI Structure', () => {
  it('should have correct Market ABI structure', () => {
    const expectedFunctions = [
      'addLiquidity',
      'removeLiquidity', 
      'swap',
      'redeem',
      'getPrice',
      'getReserves',
      'balanceOf',
      'question',
      'outcome',
      'resolved',
    ];

    const functionNames = MARKET_ABI
      .filter(item => item.type === 'function')
      .map(item => item.name);

    expectedFunctions.forEach(name => {
      expect(functionNames).toContain(name);
    });
  });

  it('should have correct MarketFactory ABI structure', () => {
    const expectedFunctions = [
      'createMarket',
      'getMarketCount',
      'getMarket',
      'isMarket',
      'resolver',
      'treasury',
    ];

    const functionNames = MARKET_FACTORY_ABI
      .filter(item => item.type === 'function')
      .map(item => item.name);

    expectedFunctions.forEach(name => {
      expect(functionNames).toContain(name);
    });
  });

  it('should have correct Resolver ABI structure', () => {
    const expectedFunctions = [
      'commitResolve',
      'resolve',
      'isResolutionCommitted',
      'getCommittedHash',
      'getCommitTimestamp',
      'COMMIT_REVEAL_DELAY',
    ];

    const functionNames = RESOLVER_ABI
      .filter(item => item.type === 'function')
      .map(item => item.name);

    expectedFunctions.forEach(name => {
      expect(functionNames).toContain(name);
    });
  });

  it('should have minimal ERC-20 ABI', () => {
    const expectedFunctions = ['balanceOf', 'allowance', 'approve'];

    const functionNames = ERC20_MIN_ABI
      .filter(item => item.type === 'function')
      .map(item => item.name);

    expect(functionNames).toEqual(expectedFunctions);
  });
});

describe('TypeScript Types', () => {
  it('should validate Evidence type structure', () => {
    const mockEvidence: Evidence = {
      t0: {
        csvUrl: 'https://example.com/t0.csv',
        csvSha256: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
        jsonUrl: 'https://example.com/t0.json',
        jsonSha256: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
        ipfsCid: 'QmExample1'
      },
      t1: {
        csvUrl: 'https://example.com/t1.csv',
        csvSha256: '0xfedcba0987654321fedcba0987654321fedcba0987654321fedcba0987654321',
        jsonUrl: 'https://example.com/t1.json',
        jsonSha256: '0x0987654321fedcba0987654321fedcba0987654321fedcba0987654321fedcba',
        ipfsCid: 'QmExample2'
      }
    };

    expect(mockEvidence.t0.csvUrl).toBeDefined();
    expect(mockEvidence.t0.csvSha256).toMatch(/^0x[0-9a-f]{64}$/);
    expect(mockEvidence.t1.jsonUrl).toBeDefined();
    expect(mockEvidence.t1.jsonSha256).toMatch(/^0x[0-9a-f]{64}$/);
  });

  it('should validate EventName type', () => {
    const eventName: EventName = 'MarketCreated';
    expect(typeof eventName).toBe('string');
  });
});