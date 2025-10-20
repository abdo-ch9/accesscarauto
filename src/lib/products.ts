import carbonFiberSpoiler from "@/assets/carbon-fiber-spoiler.jpg";
import performanceExhaust from "@/assets/performance-exhaust.jpg";
import racingSeats from "@/assets/racing-seats.jpg";
import turboKit from "@/assets/turbo-kit.jpg";
import brakeDiscImage from "@/assets/brake-disc-set.jpg";
import brakeCaliperImage from "@/assets/brake-caliper-red.jpg";

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: "Performance" | "Accessories";
  badge?: string;
  description: string;
  features?: string[];
};

export const products: Product[] = [
  { id: "spoiler", name: "Carbon Fiber Spoiler", price: 899, image: carbonFiberSpoiler, category: "Accessories", badge: "NEW", description: "Lightweight aero spoiler for downforce and style." },
  { id: "exhaust", name: "Performance Exhaust System", price: 1299, image: performanceExhaust, category: "Performance", badge: "BEST", description: "Mandrel-bent stainless exhaust for power and sound." },
  { id: "seats", name: "Racing Seats Set", price: 2499, image: racingSeats, category: "Accessories", badge: "HOT", description: "Supportive bucket seats with FIA-inspired design." },
  { id: "turbo", name: "Turbo Upgrade Kit", price: 3999, image: turboKit, category: "Performance", badge: "PRO", description: "Complete turbo kit with intercooler and hardware." },
  { id: "discs", name: "Brake Disc Set", price: 1299, image: brakeDiscImage, category: "Performance", badge: "TRACK", description: "Carbon-ceramic rotors for extreme braking." },
  { id: "calipers", name: "Racing Caliper Set", price: 2499, image: brakeCaliperImage, category: "Performance", badge: "PRO", description: "6-piston calipers with drilled rotors." },
];

export const getProductById = (id: string) => products.find(p => p.id === id);


