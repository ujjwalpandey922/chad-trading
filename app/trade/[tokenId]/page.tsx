import TradeLayout from "@/components/trade/TradeLayout";

interface PageProps {
  params: Promise<{
    tokenId: string;
  }>;
  searchParams: Promise<{
    symbol?: string;
    price?: string;
    change?: string;
    logo?: string;
  }>;
}

export default async function TradePage({ params, searchParams }: PageProps) {
  const { tokenId } = await params;
  const resolvedSearchParams = await searchParams;

  const symbol = resolvedSearchParams.symbol;
  const price = resolvedSearchParams.price ? parseFloat(resolvedSearchParams.price) : undefined;
  const change = resolvedSearchParams.change ? parseFloat(resolvedSearchParams.change) : undefined;
  const logo = resolvedSearchParams.logo ? decodeURIComponent(resolvedSearchParams.logo) : null;

  return (
    <TradeLayout
      tokenId={tokenId}
      initialData={{
        symbol,
        price,
        change,
        logo,
      }}
    />
  );
}
