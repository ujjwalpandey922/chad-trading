"use client";

import { usePrivy } from "@privy-io/react-auth";

interface StartTradingButtonProps {
  className?: string;
}

export function StartTradingButton({ className }: StartTradingButtonProps) {
  const { login } = usePrivy();

  return (
    <button type="button" onClick={login} className={className}>
      <span>Start trading</span>
      <div className="flex w-0 items-center overflow-hidden opacity-0 transition-all duration-150 ease-out group-hover:w-7 group-hover:opacity-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="ml-2 shrink-0"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </div>
    </button>
  );
}
