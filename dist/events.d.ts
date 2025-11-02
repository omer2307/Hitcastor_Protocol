export declare const EVENTS: {
    readonly RESOLVE_COMMITTED: "ResolveCommitted";
    readonly RESOLVED: "Resolved";
    readonly MARKET_CREATED: "MarketCreated";
    readonly SWAP: "Swap";
    readonly LIQUIDITY_ADDED: "LiquidityAdded";
    readonly LIQUIDITY_REMOVED: "LiquidityRemoved";
    readonly OUTCOME_APPLIED: "OutcomeApplied";
    readonly REDEEMED: "Redeemed";
};
export type EventName = (typeof EVENTS)[keyof typeof EVENTS];
//# sourceMappingURL=events.d.ts.map