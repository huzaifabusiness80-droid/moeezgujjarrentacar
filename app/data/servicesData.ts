export interface ServiceDetail {
  slug: string;
  title: string;
  shortDesc: string;
  heroImage: string;
  tagline: string;
  overview: string;
  benefits: string[];
  keyFeatures: {
    title: string;
    description: string;
  }[];
  processSteps: {
    step: string;
    title: string;
    description: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const servicesData: Record<string, ServiceDetail> = {
  "luxury-cars": {
    slug: "luxury-cars",
    title: "Luxury Cars & VIP Rentals",
    shortDesc: "Experience premium travel with our fleet of luxury sedans for weddings, corporate events, and VIP transport.",
    heroImage: "/fleet/mercedes-s-class.jpg",
    tagline: "Arrive in Style with Our Premium Fleet",
    overview: "Moeez Gujjar Rent A Car provides an exclusive selection of luxury vehicles designed to offer unmatched comfort and prestige. Whether you need a car for a high-profile business meeting, a wedding, or simply want to experience the finest automotive engineering, our luxury fleet is at your service.",
    benefits: [
      "Latest Model Premium Vehicles",
      "Impeccable Interior and Comfort",
      "Professional Chauffeur Option Available",
      "Flexible Daily and Weekly Rates",
      "24/7 Roadside Assistance"
    ],
    keyFeatures: [
      {
        title: "Wedding Packages",
        description: "Specialized vehicle decoration and red-carpet service for your special day."
      },
      {
        title: "Corporate Transport",
        description: "Reliable and discreet transportation for executives and VIP guests."
      }
    ],
    processSteps: [
      {
        step: "01",
        title: "Select Your Vehicle",
        description: "Browse our luxury fleet and choose the car that matches your style."
      },
      {
        step: "02",
        title: "Book & Confirm",
        description: "Provide your dates and requirements to secure your booking instantly."
      },
      {
        step: "03",
        title: "Enjoy the Ride",
        description: "Experience the ultimate in luxury travel with Moeez Gujjar Rent A Car."
      }
    ],
    faqs: [
      {
        question: "Do you provide cars with drivers?",
        answer: "Yes, all our luxury vehicles can be rented with professional, well-trained chauffeurs."
      },
      {
        question: "Can I rent a luxury car for a wedding?",
        answer: "Absolutely! We offer specialized wedding packages including vehicle decoration."
      }
    ]
  },

  "suv-rentals": {
    slug: "suv-rentals",
    title: "SUV & 4x4 Rentals",
    shortDesc: "Robust and spacious SUVs perfect for family trips, Northern areas tours, and rugged terrains.",
    heroImage: "/fleet/land-cruiser-v8.jpg",
    tagline: "Power and Space for Every Adventure",
    overview: "Our SUV and 4x4 fleet is perfect for those who require space, power, and safety. Whether you're planning a family vacation to the Northern areas or need a commanding presence on the road, vehicles like the Land Cruiser V8 and Fortuner are ready for the journey.",
    benefits: [
      "Spacious Seating for 5 to 7 Passengers",
      "Powerful Engines for All Terrains",
      "Advanced Safety Features",
      "Ample Luggage Space",
      "Ideal for Long Distance Travel"
    ],
    keyFeatures: [
      {
        title: "Northern Areas Tours",
        description: "Vehicles specifically maintained for steep and rugged mountainous terrains."
      },
      {
        title: "Family Vacations",
        description: "Comfortable and spacious interiors ensuring a pleasant journey for everyone."
      }
    ],
    processSteps: [
      {
        step: "01",
        title: "Choose Your SUV",
        description: "Select from our range of powerful SUVs based on your passenger and luggage needs."
      },
      {
        step: "02",
        title: "Set Your Itinerary",
        description: "Let us know your destination so we can ensure the vehicle is perfectly prepped."
      },
      {
        step: "03",
        title: "Start Exploring",
        description: "Embark on your journey with confidence and comfort."
      }
    ],
    faqs: [
      {
        question: "Are these SUVs suitable for trips to Hunza or Skardu?",
        answer: "Yes, our Land Cruisers and Fortuners are highly recommended and fully capable for Northern area tours."
      }
    ]
  },

  "economy-cars": {
    slug: "economy-cars",
    title: "Economy & Daily Rentals",
    shortDesc: "Reliable, fuel-efficient, and affordable cars for your daily commuting and inter-city travel needs.",
    heroImage: "/fleet/honda-civic-rs.jpg",
    tagline: "Affordable Reliability for Everyday Travel",
    overview: "Need a car for a day, a week, or a month? Our economy fleet offers the perfect balance of comfort, fuel efficiency, and affordability. Perfect for personal errands, family visits, or business trips within and outside the city.",
    benefits: [
      "Highly Fuel Efficient",
      "Affordable Daily and Monthly Rates",
      "Well-Maintained and Clean",
      "Easy to Drive and Park in the City",
      "Quick and Hassle-Free Booking"
    ],
    keyFeatures: [
      {
        title: "Inter-City Travel",
        description: "Comfortable sedans like Honda Civic and Toyota Corolla for smooth highway driving."
      },
      {
        title: "Long-Term Rentals",
        description: "Special discounted rates available for rentals exceeding a month."
      }
    ],
    processSteps: [
      {
        step: "01",
        title: "Pick Your Car",
        description: "Select a reliable sedan or hatchback from our economy range."
      },
      {
        step: "02",
        title: "Provide Details",
        description: "Submit your CNIC and driving license for quick verification."
      },
      {
        step: "03",
        title: "Drive Away",
        description: "Get the keys and enjoy your hassle-free rental experience."
      }
    ],
    faqs: [
      {
        question: "What documents are required to rent a car?",
        answer: "You will need a valid original CNIC, a valid driving license, and a reference for self-drive rentals."
      },
      {
        question: "Do you offer cars without a driver (self-drive)?",
        answer: "Yes, we offer self-drive options subject to our verification and security deposit policy."
      }
    ]
  }
};
