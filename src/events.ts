export const EVENTS = {
  RESOLVE_COMMITTED: 'ResolveCommitted',
  RESOLVED: 'Resolved',
  MARKET_CREATED: 'MarketCreated',
  SWAP: 'Swap',
  LIQUIDITY_ADDED: 'LiquidityAdded',
  LIQUIDITY_REMOVED: 'LiquidityRemoved',
  OUTCOME_APPLIED: 'OutcomeApplied',
  REDEEMED: 'Redeemed',
} as const;

export type EventName = (typeof EVENTS)[keyof typeof EVENTS];
