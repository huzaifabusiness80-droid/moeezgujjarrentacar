"use client";

import React from "react";
import SubServiceManager from "../components/SubServiceManager";
import { Building2 } from "lucide-react";

export default function AdminHotelsPage() {
  return (
    <SubServiceManager
      parentSlug="hotel-bookings"
      pageTitle="Worldwide & Domestic Hotel Bookings"
      pageSubtitle="Manage international hotel reservations, domestic resorts, corporate rates, and vouchers"
      categoryName="Hotel Reservation"
      icon={Building2}
    />
  );
}
