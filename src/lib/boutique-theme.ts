import { Playfair_Display, Montserrat } from "next/font/google";

export const boutiqueSerif = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const boutiqueSans = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const boutique = {
  rose: "#D68C96",
  roseDeep: "#C46F7A",
  roseSoft: "#E8A4AB",
  blush: "#FEFAF9",
  blushDeep: "#F7E8EA",
  ink: "#2C2C2C",
  border: "#F0E4E5",
  danger: "#E35D67",
} as const;
