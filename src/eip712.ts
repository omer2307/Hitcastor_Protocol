export const KYC_PASS_TYPES = {
  KycPass: [
    { name: 'wallet', type: 'address' },
    { name: 'expires', type: 'uint256' },
  ],
} as const;

export const KYC_DOMAIN = (chainId: number) => ({
  name: 'HitcastorKYC',
  version: '1',
  chainId,
});
