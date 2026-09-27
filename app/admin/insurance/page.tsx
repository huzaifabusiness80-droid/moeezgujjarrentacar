"use client";

import React from "react";
import SubServiceManager from "../components/SubServiceManager";
import { ShieldCheck } from "lucide-react";

export default function AdminInsurancePage() {
  return (
    <SubServiceManager
      parentSlug="travel-insurance"
      pageTitle="Travel Health Insurance"
      pageSubtitle="Manage Schengen & worldwide embassy approved travel insurance policies, coverage limits, and rates"
      categoryName="Insurance Policy"
      icon={ShieldCheck}
    />
  );
}
