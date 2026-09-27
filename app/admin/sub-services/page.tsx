"use client";

import React from "react";
import SubServiceManager from "../components/SubServiceManager";
import { Layers } from "lucide-react";

export default function AdminSubServicesPage() {
  return (
    <SubServiceManager
      parentSlug="ALL"
      pageTitle="All Visas & Sub-Services"
      pageSubtitle="Central directory of all sub-services across Visas, Tours, Flights, Umrah, Hotels, and Insurance"
      categoryName="Service"
      icon={Layers}
    />
  );
}
