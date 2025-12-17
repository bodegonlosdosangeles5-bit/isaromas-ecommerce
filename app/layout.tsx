// Estilos globales
import "@/styles/globals.css";

// Next.js
import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";

import Script from "next/script";

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
  title: "ISAROMA",
  description: "Tienda ISAROMA - Velas, difusores y perfumes finos",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-48x48.png", type: "image/png", sizes: "48x48" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${playfair.variable} ${poppins.variable}`}>
      <body className="antialiased bg-isaroma-cream text-isaroma-text-main">
        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JV907175PQ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-JV907175PQ');
          `}
        </Script>

        <CartProvider>
          {children}
          <CheckoutDrawer />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}

