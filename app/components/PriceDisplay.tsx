"use client";
import React from "react";
import { useCurrency } from "./CurrencyContext";

interface PriceDisplayProps {
  priceStr: string;
  priceUsd?: string | null;
  className?: string;
}

export default function PriceDisplay({ priceStr, priceUsd, className = "" }: PriceDisplayProps) {
  const { currency, exchangeRate } = useCurrency();

  if (!priceStr) return <span className={className}>Price on Request</span>;

  if (currency === "USD" && priceUsd) {
    return <span className={className}>{priceUsd}</span>;
  }

  // Extract the numeric part (e.g. from "PKR 15,000 / Day")
  const match = priceStr.match(/[\d,]+/);
  if (!match) {
    return <span className={className}>{priceStr}</span>;
  }

  const numericValue = parseInt(match[0].replace(/,/g, ""), 10);
  const textSuffix = priceStr.split(match[0])[1] || "";
  const textPrefix = priceStr.split(match[0])[0] || "";

  // If currency is PKR, return as is (but ensure formatting)
  if (currency === "PKR") {
    // If the string already contains PKR, just return it, otherwise format it.
    if (priceStr.toLowerCase().includes("pkr")) {
      return <span className={className}>{priceStr}</span>;
    }
    return <span className={className}>PKR {numericValue.toLocaleString()}{textSuffix}</span>;
  }

  // If currency is USD, convert the numeric value
  const usdValue = Math.round(numericValue / exchangeRate);
  
  // Clean prefix if it contains PKR
  let newPrefix = textPrefix.replace(/pkr|rs\.?/i, "").trim();
  if (newPrefix) newPrefix += " ";

  return (
    <span className={className}>
      {newPrefix}${usdValue}{textSuffix}
    </span>
  );
}
