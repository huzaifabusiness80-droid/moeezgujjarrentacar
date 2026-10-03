"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type Currency = "PKR" | "USD";

interface CurrencyContextProps {
  currency: Currency;
  exchangeRate: number; // 1 USD = X PKR
}

const CurrencyContext = createContext<CurrencyContextProps>({
  currency: "PKR",
  exchangeRate: 280,
});

export const useCurrency = () => useContext(CurrencyContext);

export const CurrencyProvider = ({ children }: { children: React.ReactNode }) => {
  const [currency, setCurrency] = useState<Currency>("PKR");
  const exchangeRate = 280; // Fixed conversion rate

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        if (data.country_code && data.country_code !== "PK") {
          setCurrency("USD");
        }
      } catch (error) {
        // Silently fail if ipapi blocks or network fails
      }
    };

    fetchCountry();
  }, []);

  return (
    <CurrencyContext.Provider value={{ currency, exchangeRate }}>
      {children}
    </CurrencyContext.Provider>
  );
};
