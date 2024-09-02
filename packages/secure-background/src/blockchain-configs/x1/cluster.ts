export const DEFAULT_X1_CLUSTER = "https://xolana.xen.network";
export const X1Cluster = {
  MAINNET: DEFAULT_X1_CLUSTER,
  DEVNET: "https://xolana.xen.network",
  DEFAULT: process.env.DEFAULT_X1_CONNECTION_URL || DEFAULT_X1_CLUSTER,
};
