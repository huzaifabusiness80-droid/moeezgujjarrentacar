export interface SubServiceDetail {
  parentSlug: string;
  parentTitle: string;
  slug: string;
  title: string;
  subtitle: string;
  badge: string;
  image: string;
  priceOrFee: string;
  durationOrProcessing: string;
  validity: string;
  overview: string;
  requirements: string[];
  inclusions: string[];
  stepsOrItinerary: {
    title: string;
    description: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const subServicesData: Record<string, SubServiceDetail> = {
  // ==================== 1. LUXURY CARS ====================
  "mercedes-s-class": {
    parentSlug: "luxury-cars",
    parentTitle: "Luxury Cars",
    slug: "mercedes-s-class",
    title: "Mercedes S-Class",
    subtitle: "The epitome of luxury and prestige. Perfect for weddings, VIP transport, and executive travel.",
    badge: "Ultimate Luxury",
    image: "/fleet/mercedes-s-class.jpg",
    priceOrFee: "Call for Pricing",
    durationOrProcessing: "Available Daily/Weekly",
    validity: "With Chauffeur Only",
    overview: "The Mercedes S-Class sets the standard for luxury sedans. Experience unparalleled comfort, advanced technology, and a smooth, silent ride. It is the ultimate choice for those who demand the very best.",
    requirements: [
      "Advance booking required",
      "CNIC Copy of the client",
      "Route details for the booking period"
    ],
    inclusions: [
      "Professional Chauffeur",
      "Fuel as per agreed terms",
      "Immaculately clean interior and exterior",
      "Tolls and taxes (optional package)"
    ],
    stepsOrItinerary: [
      {
        title: "Step 1: Inquiry",
        description: "Contact us with your dates and specific requirements."
      },
      {
        title: "Step 2: Confirmation",
        description: "We will confirm availability and provide a tailored quote."
      },
      {
        title: "Step 3: Service",
        description: "The vehicle arrives on time, driven by a professional chauffeur."
      }
    ],
    faqs: [
      {
        question: "Can I rent the S-Class for self-drive?",
        answer: "No, our ultra-luxury vehicles like the S-Class are only available with our professional chauffeurs to ensure safety and exceptional service."
      }
    ]
  },
  "audi-a6": {
    parentSlug: "luxury-cars",
    parentTitle: "Luxury Cars",
    slug: "audi-a6",
    title: "Audi A6",
    subtitle: "A perfect blend of sporty elegance and executive comfort.",
    badge: "Executive Choice",
    image: "/fleet/audi-a6.jpg",
    priceOrFee: "Call for Pricing",
    durationOrProcessing: "Available Daily/Weekly",
    validity: "With Chauffeur Only",
    overview: "The Audi A6 offers a dynamic driving experience coupled with a luxurious and tech-forward interior. It's an excellent choice for corporate travel, airport transfers, and special events.",
    requirements: [
      "Advance booking required",
      "CNIC Copy of the client",
      "Route details"
    ],
    inclusions: [
      "Professional Chauffeur",
      "Fuel as per agreed terms",
      "Immaculately clean interior and exterior"
    ],
    stepsOrItinerary: [
      {
        title: "Step 1: Inquiry",
        description: "Contact us with your dates."
      },
      {
        title: "Step 2: Confirmation",
        description: "We will confirm availability."
      },
      {
        title: "Step 3: Service",
        description: "Enjoy the premium Audi experience."
      }
    ],
    faqs: [
      {
        question: "Is the Audi A6 available for wedding rentals?",
        answer: "Yes, it is a very popular choice for weddings and we offer special decoration packages."
      }
    ]
  },

  // ==================== 2. SUV RENTALS ====================
  "land-cruiser-v8": {
    parentSlug: "suv-rentals",
    parentTitle: "SUV Rentals",
    slug: "land-cruiser-v8",
    title: "Toyota Land Cruiser V8",
    subtitle: "The King of the Road. Unmatched power, space, and off-road capability.",
    badge: "Premium SUV",
    image: "/fleet/land-cruiser-v8.jpg",
    priceOrFee: "Call for Pricing",
    durationOrProcessing: "Available Daily/Weekly",
    validity: "With Chauffeur / Self Drive (Conditions Apply)",
    overview: "The Toyota Land Cruiser V8 is legendary for its reliability, power, and comfort. Whether you are navigating city streets or exploring the rugged terrains of Northern Pakistan, the V8 ensures you travel in supreme comfort and safety.",
    requirements: [
      "Original CNIC (for self-drive)",
      "Valid Driving License (for self-drive)",
      "Security Deposit & References (for self-drive)"
    ],
    inclusions: [
      "Fully serviced and maintained vehicle",
      "Chauffeur option available",
      "24/7 Support"
    ],
    stepsOrItinerary: [
      {
        title: "Step 1: Booking",
        description: "Select dates and specify if you need a driver."
      },
      {
        title: "Step 2: Verification",
        description: "Provide necessary documents for self-drive verification."
      },
      {
        title: "Step 3: Handover",
        description: "Vehicle inspection and handover."
      }
    ],
    faqs: [
      {
        question: "Is the V8 suitable for a trip to Khunjerab Pass?",
        answer: "Absolutely. The Land Cruiser V8 is the most capable vehicle for Northern areas and high-altitude terrains."
      }
    ]
  },
  "fortuner-legender": {
    parentSlug: "suv-rentals",
    parentTitle: "SUV Rentals",
    slug: "fortuner-legender",
    title: "Toyota Fortuner Legender",
    subtitle: "Sleek, modern, and powerful. The perfect SUV for family trips and style.",
    badge: "Highly Demanded",
    image: "/fleet/fortuner-legender.jpg",
    priceOrFee: "Call for Pricing",
    durationOrProcessing: "Available Daily/Weekly",
    validity: "With Chauffeur / Self Drive",
    overview: "The Fortuner Legender combines aggressive, sporty styling with robust SUV capabilities. It offers a premium interior, ample seating for 7, and the reliability Toyota is known for.",
    requirements: [
      "Original CNIC",
      "Valid Driving License",
      "Security Deposit"
    ],
    inclusions: [
      "Fully serviced vehicle",
      "Chauffeur option available"
    ],
    stepsOrItinerary: [
      {
        title: "Step 1: Booking",
        description: "Contact us to reserve the Legender."
      },
      {
        title: "Step 2: Verification",
        description: "Document check for self-drive."
      },
      {
        title: "Step 3: Handover",
        description: "Drive away in style."
      }
    ],
    faqs: [
      {
        question: "How many passengers can the Fortuner seat?",
        answer: "The Fortuner has 3 rows of seats and can comfortably accommodate up to 7 passengers."
      }
    ]
  },
  "prado-tx": {
    parentSlug: "suv-rentals",
    parentTitle: "SUV Rentals",
    slug: "prado-tx",
    title: "Toyota Prado TX",
    subtitle: "A highly comfortable and capable SUV for all your travel needs.",
    badge: "Classic Choice",
    image: "/fleet/prado-tx.jpg",
    priceOrFee: "Call for Pricing",
    durationOrProcessing: "Available Daily/Weekly",
    validity: "With Chauffeur / Self Drive",
    overview: "The Prado TX is a favorite among travelers for its smooth ride quality, spacious cabin, and dependable performance. Ideal for long journeys and family vacations.",
    requirements: [
      "Original CNIC",
      "Valid Driving License",
      "Security Deposit"
    ],
    inclusions: [
      "Fully serviced vehicle",
      "Chauffeur option available"
    ],
    stepsOrItinerary: [
      {
        title: "Step 1: Booking",
        description: "Contact us to reserve the Prado."
      },
      {
        title: "Step 2: Verification",
        description: "Document check."
      },
      {
        title: "Step 3: Handover",
        description: "Enjoy your trip."
      }
    ],
    faqs: [
      {
        question: "Is Prado comfortable for long trips?",
        answer: "Yes, the Prado is renowned for its comfortable suspension and spacious interior, making it ideal for long-distance travel."
      }
    ]
  },

  // ==================== 3. ECONOMY & SEDANS ====================
  "honda-civic-rs": {
    parentSlug: "economy-cars",
    parentTitle: "Economy Cars",
    slug: "honda-civic-rs",
    title: "Honda Civic RS",
    subtitle: "Sporty, comfortable, and feature-packed sedan for city and highway driving.",
    badge: "Popular Sedan",
    image: "/fleet/honda-civic-rs.jpg",
    priceOrFee: "Call for Pricing",
    durationOrProcessing: "Available Daily/Weekly/Monthly",
    validity: "With Chauffeur / Self Drive",
    overview: "The Honda Civic RS offers a thrilling driving experience, aggressive styling, and a premium interior. It is perfect for those who want a stylish and comfortable sedan for their travels.",
    requirements: [
      "Original CNIC",
      "Valid Driving License",
      "Security Deposit (for self-drive)"
    ],
    inclusions: [
      "Well-maintained vehicle",
      "Clean interior",
      "24/7 Support"
    ],
    stepsOrItinerary: [
      {
        title: "Step 1: Booking",
        description: "Check availability and book."
      },
      {
        title: "Step 2: Verification",
        description: "Submit documents."
      },
      {
        title: "Step 3: Handover",
        description: "Receive the car."
      }
    ],
    faqs: [
      {
        question: "Can I rent the Civic for a month?",
        answer: "Yes, we offer special discounted rates for monthly rentals."
      }
    ]
  },
  "hyundai-sonata": {
    parentSlug: "economy-cars",
    parentTitle: "Economy Cars",
    slug: "hyundai-sonata",
    title: "Hyundai Sonata",
    subtitle: "A luxurious and spacious sedan with modern features.",
    badge: "Premium Economy",
    image: "/fleet/hyundai-sonata.jpg",
    priceOrFee: "Call for Pricing",
    durationOrProcessing: "Available Daily/Weekly/Monthly",
    validity: "With Chauffeur / Self Drive",
    overview: "The Hyundai Sonata stands out with its striking design, spacious and quiet cabin, and advanced technology. It bridges the gap between economy and luxury sedans.",
    requirements: [
      "Original CNIC",
      "Valid Driving License",
      "Security Deposit"
    ],
    inclusions: [
      "Well-maintained vehicle",
      "Clean interior"
    ],
    stepsOrItinerary: [
      {
        title: "Step 1: Booking",
        description: "Contact to reserve."
      },
      {
        title: "Step 2: Verification",
        description: "Submit documents."
      },
      {
        title: "Step 3: Handover",
        description: "Receive the car."
      }
    ],
    faqs: [
      {
        question: "Is the Sonata suitable for corporate use?",
        answer: "Absolutely, its sleek design and comfortable interior make it an excellent choice for corporate clients."
      }
    ]
  }
};
