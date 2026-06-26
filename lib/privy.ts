import type {
  LinkedAccountWithMetadata,
  WalletWithMetadata,
} from "@privy-io/react-auth";

export function isEthereumWallet(
  account: LinkedAccountWithMetadata
): account is WalletWithMetadata {
  return account.type === "wallet" && account.chainType === "ethereum";
}

export function isSolanaWallet(
  account: LinkedAccountWithMetadata
): account is WalletWithMetadata {
  return account.type === "wallet" && account.chainType === "solana";
}
