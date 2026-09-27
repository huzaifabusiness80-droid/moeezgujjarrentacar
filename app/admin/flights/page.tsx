"use client";

import React from "react";
import SubServiceManager from "../components/SubServiceManager";
import { Plane } from "lucide-react";

export default function AdminFlightsPage() {
  return (
    <SubServiceManager
      parentSlug="air-ticketing"
      pageTitle="Air Ticketing & Flight Bookings"
      pageSubtitle="Manage international and domestic flight services, airline routes, baggage advisory, and fares"
      categoryName="Flight Route"
      icon={Plane}
    />
  );
}
