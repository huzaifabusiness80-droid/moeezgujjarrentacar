"use client";

import React from "react";
import SubServiceManager from "../components/SubServiceManager";
import { FileCheck2 } from "lucide-react";

export default function AdminVisasPage() {
  return (
    <SubServiceManager
      parentSlug="visa-processing"
      pageTitle="Visa Processing & Consultancy"
      pageSubtitle="Manage visit, tourist, and business visa services, requirements, pricing, and embassy procedures"
      categoryName="Visa"
      icon={FileCheck2}
    />
  );
}
