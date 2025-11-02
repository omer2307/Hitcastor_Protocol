export declare const KYC_PASS_TYPES: {
    readonly KycPass: readonly [{
        readonly name: "wallet";
        readonly type: "address";
    }, {
        readonly name: "expires";
        readonly type: "uint256";
    }];
};
export declare const KYC_DOMAIN: (chainId: number) => {
    name: string;
    version: string;
    chainId: number;
};
//# sourceMappingURL=eip712.d.ts.map