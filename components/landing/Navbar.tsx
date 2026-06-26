"use client";

import Image from "next/image";
import Link from "next/link";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Check, Copy, ChevronDown, LogOut } from "lucide-react";
import { useMemo, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { StoreButtons } from "./StoreButtons";
import { isEthereumWallet, isSolanaWallet } from "@/lib/privy";

export const APP_STORE_URL =
  "https://apps.apple.com/us/app/chadwallet/id6757367474";

export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=xyz.chadwallet.www";

function shorten(address?: string) {
  if (!address) return "-";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function WalletRow({ title, address }: { title: string; address?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    if (!address) return;

    await navigator.clipboard.writeText(address);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  }

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
      <div className="mb-1 flex items-center justify-between">
        <p className="text-xs font-medium tracking-wider text-white/50 uppercase">
          {title}
        </p>

        <button
          onClick={copy}
          className="rounded-md p-1 text-white/60 transition hover:bg-white/10 hover:text-white"
        >
          {copied ? <Check size={15} /> : <Copy size={15} />}
        </button>
      </div>

      <p className="font-mono text-sm text-white">{shorten(address)}</p>
    </div>
  );
}

export function Navbar() {
  const { authenticated, login, logout, user } = usePrivy();

  const ethereumWallet = useMemo(
    () => user?.linkedAccounts.find(isEthereumWallet),
    [user]
  );

  const solanaWallet = useMemo(
    () => user?.linkedAccounts.find(isSolanaWallet),
    [user]
  );

  const initials = useMemo(() => {
    const name = user?.google?.name ?? user?.google?.email ?? "";

    if (!name) return "U";

    return name
      .split(" ")
      .map((x) => x[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }, [user]);

  return (
    <header className="absolute inset-x-0 top-0 z-50 p-4 max-sm:hidden">
      <nav className="mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/brand/dark-logo.png"
            alt="logo"
            width={36}
            height={36}
            className="rounded-lg"
          />

          <span className="text-lg font-semibold text-white">ChadWallet</span>
        </Link>

        <div className="flex items-center gap-3">
          <StoreButtons />

          {!authenticated ? (
            <button
              onClick={login}
              className="bg-btn-login cursor-pointer rounded-lg px-5 py-2.5 font-bold text-white"
            >
              Login
            </button>
          ) : (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1.5 pl-2 transition hover:bg-white/10">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow-400 font-bold text-black">
                    {initials}
                  </div>

                  <ChevronDown size={18} className="mr-1 text-white/60" />
                </button>
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  align="end"
                  sideOffset={12}
                  className="z-50 w-80 rounded-2xl border border-white/10 bg-neutral-950 p-4 shadow-2xl"
                >
                  <div className="mb-4">
                    <p className="font-semibold text-white">
                      {user?.google?.name}
                    </p>

                    <p className="text-sm text-white/50">
                      {user?.google?.email}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <WalletRow
                      title="Ethereum"
                      address={ethereumWallet?.address}
                    />

                    <WalletRow title="Solana" address={solanaWallet?.address} />
                  </div>

                  <DropdownMenu.Separator className="my-4 h-px bg-white/10" />

                  <DropdownMenu.Item asChild>
                    <button
                      onClick={logout}
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-500 py-2.5 font-medium text-white transition outline-none hover:bg-red-600"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          )}
        </div>
      </nav>
    </header>
  );
}
