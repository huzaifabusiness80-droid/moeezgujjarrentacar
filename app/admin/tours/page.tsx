"use client";

import React from "react";
import SubServiceManager from "../components/SubServiceManager";
import { Plane } from "lucide-react";

export default function AdminToursPage() {
  return (
    <SubServiceManager
      parentSlug="tour-packages"
      pageTitle="Tour Packages & Holidays"
      pageSubtitle="Manage worldwide holiday packages, day-by-day itineraries, inclusions, hotels, and prices"
      categoryName="Tour Package"
      icon={Plane}
    />
  );
}
