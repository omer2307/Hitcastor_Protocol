export type EvidenceSide = {
  csvUrl: string;
  csvSha256: `0x${string}`;
  jsonUrl: string;
  jsonSha256: `0x${string}`;
  ipfsCid?: string;
};

export type Evidence = {
  t0: EvidenceSide;
  t1: EvidenceSide;
};

export const RULES_SUMMARY = 'YES if rank(t1) < rank(t0); tie=NO; absent=rank101=NO.';
