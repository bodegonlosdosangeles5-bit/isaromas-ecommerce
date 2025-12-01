// Estilos globales
import "@/styles/globals.css";

// Next.js
import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";

// Contextos
import { CartProvider } from "@/context/CartContext";

// Componentes globales
import CheckoutDrawer from "@/components/CheckoutDrawer";
import WhatsAppButton from "@/components/WhatsAppButton";

// Configuración de fuentes
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "ISAROMA | Esencias que iluminan",
  description: "Velas de soja, difusores y esencias artesanales personalizadas.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${playfair.variable} ${poppins.variable}`}>
      <body className="antialiased bg-isaroma-cream text-isaroma-text-main">
        <CartProvider>
          {children}
          <CheckoutDrawer />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}

