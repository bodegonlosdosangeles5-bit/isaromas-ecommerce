// Estilos globales
import "@/styles/globals.css";

// Next.js
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

// Contextos
import { CartProvider } from "@/context/CartContext";

// Componentes globales
import CheckoutDrawer from "@/components/CheckoutDrawer";
import WhatsAppButton from "@/components/WhatsAppButton";

// Configuración de fuentes
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ISAROMAS | Esencias que iluminan",
  description: "Velas de soja, difusores y esencias artesanales personalizadas.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <CartProvider>
          {children}
          <CheckoutDrawer />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}

