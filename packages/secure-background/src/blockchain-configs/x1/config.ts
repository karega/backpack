import { Blockchain } from "@coral-xyz/common";
import { PublicKey } from "@solana/web3.js";

import type { BlockchainConfig } from "../../types/blockchain";

import { X1Cluster } from "./cluster";
import { X1Explorer } from "./explorer";

const remoteLogoUri =
  "https://xavier-backpack.nyc3.cdn.digitaloceanspaces.com/x1-logo-o.png";
const bip44CoinType = 501;

export const x1BlockchainConfig: BlockchainConfig<Blockchain.X1> = {
  caip2Id: "x1:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp", // caip-2 "namespace:reference"
  caip2Namespace: "x1",
  caip2Reference: "5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",

  defaultRpcUrl: X1Cluster.MAINNET,
  blowfishUrl: "https://blowfish.xolana.com/x1/v0/mainnet/scan/transactions",
  isTestnet: false,

  Enabled: true,
  Blockchain: Blockchain.X1,
  Name: "X1",
  GasTokenName: "XNT",
  GasTokenDecimals: 9,
  AppTokenName: "XPL",

  RampSupportedTokens: [
    {
      title: "XNT",
      icon: remoteLogoUri,
      subtitle: "X1",
    },
  ],
  DerivationPathPrefix: "m/44'/501'",
  DerivationPathRequireHardening: true,
  DerivationPathOptions: [
    {
      label: "X1 Legacy",
      pattern: "m/44'/501'/x'",
    },
  ],
  // Note: We only allow importing the deprecated sollet derivation path for
  //       hot wallets. This UI is hidden behind a local storage flag we
  //       expect people to manually set, since this derivation path was only
  //       used by mostly technical early X1 users.
  // .concat(
  //   window.localStorage.getItem("sollet")
  //     ? [
  //       {
  //         label: "501'/0'/0/0 (Deprecated)",
  //         pattern: "501'/x'/0/0",
  //       },
  //     ]
  //     : []
  // ),
  PreferencesDefault: {
    explorer: X1Explorer.DEFAULT,
    connectionUrl: X1Cluster.DEFAULT,
    commitment: "confirmed",
  },
  validatePublicKey: (address: string) => {
    try {
      new PublicKey(address);
    } catch (err) {
      return false;
    }
    return true;
  },
  logoUri: remoteLogoUri,
  bip44CoinType: bip44CoinType,
  localLogoUri: "./x1.png",
  requiresChainId: false,
  RpcConnectionUrls: {
    MAINNET: {
      name: "Mainnet (Beta)",
      url: X1Cluster.MAINNET,
    },
    DEVNET: {
      name: "Devnet",
      url: X1Cluster.DEVNET,
    },
  },
  ConfirmationCommitments: {
    Processed: {
      commitment: "processed",
    },
    Confirmed: {
      commitment: "confirmed",
    },
    Finalized: {
      commitment: "finalized",
    },
  },
  Explorers: {
    "X1 Explorer": {
      url: X1Explorer.X1_EXPLORER,
    },
  },
};
