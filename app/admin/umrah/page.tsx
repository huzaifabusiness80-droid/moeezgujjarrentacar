"use client";

import React from "react";
import SubServiceManager from "../components/SubServiceManager";
import { Moon } from "lucide-react";

export default function AdminUmrahPage() {
  return (
    <SubServiceManager
      parentSlug="umrah-services"
      pageTitle="Executive Umrah & Hajj Services"
      pageSubtitle="Manage 5-star, luxury, family, and economy Umrah packages, hotel proximity, Ziyarat, and e-visas"
      categoryName="Umrah Package"
      icon={Moon}
    />
  );
}
