export const KYC_PASS_TYPES = {
    KycPass: [
        { name: 'wallet', type: 'address' },
        { name: 'expires', type: 'uint256' },
    ],
};
export const KYC_DOMAIN = (chainId) => ({
    name: 'HitcastorKYC',
    version: '1',
    chainId,
});
//# sourceMappingURL=eip712.js.map