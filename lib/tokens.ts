export interface Token {
  address: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  logoURI: string | null;
}

export const FALLBACK_TOKENS: Token[] = [
  {
    address: "So11111111111111111111111111111111111111112",
    symbol: "SOL",
    name: "Solana",
    price: 182.45,
    change24h: 4.82,
    logoURI:
      "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
  },
  {
    address: "EKpQGSJtjMFqKZ9LNqk7YsiX2CmcBCXXNct3FcC7jBg3",
    symbol: "WIF",
    name: "dogwifhat",
    price: 3.12,
    change24h: 12.45,
    logoURI:
      "https://bafybeiemwe6t7u7nky2n575cowbqoa2op7ne4cl6fzape3z62o5vbb6m4a.ipfs.nftstorage.link",
  },
  {
    address: "DezXAZ8z7PnrnRJjz3wJaRix35C1RRCJ4YSMW39pH55",
    symbol: "BONK",
    name: "Bonk",
    price: 0.00003421,
    change24h: -2.31,
    logoURI: "https://doc.bonkcoin.com/assets/bonk-logo-circle.png",
  },
  {
    address: "JUPcuzNzCjVv4fcNWFLg26Aj9dJk5fEDMxxadCDF36T",
    symbol: "JUP",
    name: "Jupiter",
    price: 1.18,
    change24h: 1.15,
    logoURI:
      "https://dd.dexscreener.com/ds-data/tokens/solana/JUPcuzNzCjVv4fcNWFLg26Aj9dJk5fEDMxxadCDF36T.png",
  },
  {
    address: "7GCihKy13CJre4Lv6T2nd9mQQZ546TRtT4GGD5tzpifB",
    symbol: "POPCAT",
    name: "Popcat",
    price: 1.48,
    change24h: 8.76,
    logoURI:
      "https://dd.dexscreener.com/ds-data/tokens/solana/7GCihKy13CJre4Lv6T2nd9mQQZ546TRtT4GGD5tzpifB.png",
  },
  {
    address: "MEW1gQWJ3nEXgUBjGB26ugfg1Spv5GDWPBNC3v26BHb",
    symbol: "MEW",
    name: "cat in a dogs world",
    price: 0.00894,
    change24h: 15.34,
    logoURI:
      "https://dd.dexscreener.com/ds-data/tokens/solana/MEW1gQWJ3nEXgUBjGB26ugfg1Spv5GDWPBNC3v26BHb.png",
  },
  {
    address: "HZ128229z61SBnrDZFBmgfJRsY2CgT85tYY7vc16nDQ1",
    symbol: "PYTH",
    name: "Pyth Network",
    price: 0.425,
    change24h: -0.85,
    logoURI:
      "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/HZ128229z61SBnrDZFBmgfJRsY2CgT85tYY7vc16nDQ1/logo.png",
  },
  {
    address: "CHADovNzCjVv4fcNWFLg26Aj9dJk5fEDMxxadCDF36T",
    symbol: "CHAD",
    name: "ChadWallet Token",
    price: 0.0888,
    change24h: 69.42,
    logoURI: "/brand/dark-logo.png",
  },
];
