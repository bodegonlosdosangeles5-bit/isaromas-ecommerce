import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { CartProvider } from "@/context/CartContext";
import WhatsAppButton from "@/components/WhatsAppButton";
import CheckoutDrawer from "@/components/CheckoutDrawer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Component {...pageProps} />
      <CheckoutDrawer />
      <WhatsAppButton />
    </CartProvider>
  );
}
