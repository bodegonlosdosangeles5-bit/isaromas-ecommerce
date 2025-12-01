'use client';

import React, { useState, useEffect } from 'react';
import { X, Trash2, ShoppingBag, MessageCircle, Info } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/utils/formatPrice';

const CheckoutDrawer: React.FC = () => {
  const { items, isCartOpen, toggleCart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    notes: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateWhatsAppMessage = () => {
    let message = `*Hola ISAROMA! Quiero realizar el siguiente pedido:*\n\n`;
    
    items.forEach(item => {
      message += `• ${item.quantity}x ${item.product.name}`;
      if (item.variant) {
        const variantDetails = [
            item.variant.aroma,
            item.variant.color,
            item.variant.size
        ].filter(Boolean).join(', ');
        message += ` (${variantDetails})`;
      }
      message += ` - ${formatPrice(item.product.price * item.quantity)}\n`;
    });

    message += `\n*Total: ${formatPrice(totalPrice)}*\n\n`;
    
    message += `*Mis Datos:*\n`;
    message += `Nombre: ${formData.name}\n`;
    message += `Teléfono: ${formData.phone}\n`;
    message += `Dirección/Zona: ${formData.address}\n`;
    if (formData.notes) message += `Notas: ${formData.notes}\n`;
    
    message += `\n*Forma de Pago:*\n`;
    message += `Transferencia al Alias: ISAROMA.VENTAS\n`;
    message += `(Envío comprobante a la brevedad)\n\n`;

    message += `*Importante:*\n`;
    message += `⚠️ El costo de envío se confirmará al momento de procesar el pedido.\n`;
    message += `⚠️ El pedido se procesará únicamente al recibir el comprobante de pago.`;

    return encodeURIComponent(message);
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    
    const whatsappUrl = `https://wa.me/5491125146197?text=${generateWhatsAppMessage()}`;
    window.open(whatsappUrl, '_blank');
    
    // Optional: clear cart after sending? 
    // clearCart(); 
    // toggleCart();
  };

  // Bloquear scroll del body cuando el carrito está abierto
  useEffect(() => {
    if (isCartOpen) {
      // Guardar la posición actual del scroll
      const scrollY = window.scrollY;
      
      // Bloquear el scroll del body
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      return () => {
        // Restaurar el scroll cuando se cierra el carrito
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-[90] transition-opacity"
        onClick={toggleCart}
      />

      {/* Drawer Mejorado */}
      <div className="fixed inset-y-0 right-0 z-[100] w-full max-w-full sm:max-w-md bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out">
        
        {/* Header Mejorado */}
        <div className="p-4 sm:p-5 border-b border-isaroma-card-border flex justify-between items-center bg-isaroma-cream">
          <h2 className="text-lg sm:text-xl font-bold text-isaroma-text-main flex items-center gap-2 tracking-tight">
            <ShoppingBag size={20} className="sm:w-[22px] sm:h-[22px] text-isaroma-primary" strokeWidth={2} /> 
            Tu Carrito
          </h2>
          <button 
            onClick={toggleCart} 
            className="text-isaroma-icon-muted hover:text-isaroma-text-main p-2 rounded-full hover:bg-isaroma-pink-light/30 transition-all duration-300 hover:scale-110"
            aria-label="Cerrar carrito"
          >
            <X size={24} strokeWidth={2} />
          </button>
        </div>

        {/* Cart Items (Scrollable) */}
        <div className="flex-1 overflow-y-auto bg-isaroma-cream">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-isaroma-text-secondary space-y-4 p-8">
              <ShoppingBag size={48} className="opacity-20 text-isaroma-icon-muted" strokeWidth={1.5} />
              <p className="font-light">Tu carrito está vacío</p>
              <button onClick={toggleCart} className="text-isaroma-primary font-semibold hover:text-isaroma-primary-hover hover:underline tracking-wide">
                Ver productos
              </button>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {items.map((item, index) => (
                <div 
                  key={`${item.product.id}-${index}`} 
                  className="bg-white rounded-2xl border-2 border-isaroma-card-border shadow-md hover:shadow-lg hover:border-isaroma-primary/40 transition-all duration-300 overflow-hidden"
                >
                  {/* Card Principal */}
                  <div className="p-4">
                    {/* Header: Imagen y Info Principal */}
                    <div className="flex gap-3 sm:gap-4 mb-3 sm:mb-4">
                      {/* Imagen más grande y destacada */}
                      <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-gradient-to-br from-isaroma-pink-light to-white rounded-xl sm:rounded-2xl overflow-hidden shrink-0 shadow-lg border-2 border-white">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      
                      {/* Información Principal */}
                      <div className="flex-1 min-w-0 pt-1">
                        <div className="flex justify-between items-start gap-2 mb-2">
                          <h3 className="font-bold text-isaroma-text-main text-sm sm:text-base leading-snug tracking-tight line-clamp-2 flex-1">
                            {item.product.name}
                          </h3>
                          <button 
                            onClick={() => removeFromCart(item.product.id, item.variant)}
                            className="text-isaroma-icon-muted hover:text-isaroma-rose p-1.5 sm:p-2 rounded-lg sm:rounded-xl hover:bg-pink-50 transition-all duration-200 shrink-0"
                            aria-label="Eliminar producto"
                          >
                            <Trash2 size={16} className="sm:w-[18px] sm:h-[18px]" strokeWidth={2} />
                          </button>
                        </div>
                        
                        {/* Variantes con mejor presentación */}
                        {item.variant && (item.variant.aroma || item.variant.color || item.variant.size) && (
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {item.variant.aroma && (
                              <span className="inline-block px-2.5 py-1 bg-isaroma-pink-light/30 text-isaroma-primary text-xs font-semibold rounded-lg border border-isaroma-pink-light/50">
                                {item.variant.aroma}
                              </span>
                            )}
                            {item.variant.color && (
                              <span className="inline-block px-2.5 py-1 bg-isaroma-pink-light/30 text-isaroma-primary text-xs font-semibold rounded-lg border border-isaroma-pink-light/50">
                                {item.variant.color}
                              </span>
                            )}
                            {item.variant.size && (
                              <span className="inline-block px-2.5 py-1 bg-isaroma-pink-light/30 text-isaroma-primary text-xs font-semibold rounded-lg border border-isaroma-pink-light/50">
                                {item.variant.size}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Footer: Cantidad, Precio Unitario y Total */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-2 pt-3 border-t border-isaroma-card-border">
                      {/* Precio Unitario */}
                      <div className="flex flex-row sm:flex-col items-center sm:items-start justify-between sm:justify-start">
                        <span className="text-xs text-isaroma-text-muted font-medium mb-0 sm:mb-0.5">Precio unitario</span>
                        <span className="text-sm font-bold text-isaroma-text-secondary sm:ml-0 ml-2">
                          {formatPrice(item.product.price)}
                        </span>
                      </div>

                      {/* Controles de Cantidad Mejorados */}
                      <div className="flex flex-row sm:flex-col items-center justify-between sm:items-center">
                        <span className="text-xs text-isaroma-text-muted font-medium mb-0 sm:mb-1.5">Cantidad</span>
                        <div className="flex items-center gap-1 bg-isaroma-cream rounded-lg sm:rounded-xl p-1 border-2 border-isaroma-card-border shadow-sm">
                          <button 
                            className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-isaroma-text-secondary hover:bg-white hover:text-isaroma-primary font-bold text-base sm:text-lg rounded-md sm:rounded-lg transition-all duration-200 shadow-sm"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.variant)}
                            aria-label="Disminuir cantidad"
                          >
                            −
                          </button>
                          <span className="w-8 sm:w-10 text-center font-bold text-sm sm:text-base text-isaroma-text-main bg-white px-1.5 sm:px-2 py-1 rounded-md sm:rounded-lg border border-isaroma-card-border">
                            {item.quantity}
                          </span>
                          <button 
                            className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-isaroma-text-secondary hover:bg-white hover:text-isaroma-primary font-bold text-base sm:text-lg rounded-md sm:rounded-lg transition-all duration-200 shadow-sm"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.variant)}
                            aria-label="Aumentar cantidad"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Precio Total Destacado */}
                      <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start">
                        <span className="text-xs text-isaroma-text-muted font-medium mb-0 sm:mb-0.5">Subtotal</span>
                        <span className="text-lg sm:text-xl font-extrabold text-isaroma-primary tracking-tight">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer / Checkout Form Compacto */}
        {items.length > 0 && (
          <div className="border-t-2 border-isaroma-card-border bg-isaroma-cream">
            {/* Sección de Total y Botón - Siempre Visible */}
            <div className="p-4 border-b border-isaroma-card-border">
              <div className="flex justify-between items-center mb-3">
                <span className="text-isaroma-text-main font-bold text-base tracking-tight">Total:</span>
                <span className="text-2xl font-extrabold text-isaroma-primary tracking-tight">
                  {formatPrice(totalPrice)}
                </span>
              </div>
              <button 
                onClick={handleCheckout}
                disabled={!formData.name || !formData.phone || !formData.address}
                className="w-full bg-isaroma-primary hover:bg-isaroma-primary-hover disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 text-base hover-button disabled:shadow-none tracking-wide"
              >
                <MessageCircle size={20} strokeWidth={2.5} />
                Enviar por WhatsApp
              </button>
            </div>

            {/* Formulario Colapsable/Compacto */}
            <div className="p-4 space-y-3">
              <h3 className="font-bold text-isaroma-text-main text-xs uppercase tracking-wider pb-2 border-b border-isaroma-primary/20">Datos del pedido</h3>
              
              <div className="grid grid-cols-2 gap-2">
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Nombre" 
                  required 
                  className="w-full px-3 py-2 rounded-lg border border-isaroma-card-border bg-white text-isaroma-text-main text-sm font-medium focus:ring-2 focus:ring-isaroma-pink-light focus:border-isaroma-primary outline-none shadow-sm transition-all placeholder:text-isaroma-text-muted"
                  value={formData.name} 
                  onChange={handleInputChange}
                />
                <input 
                  type="tel" 
                  name="phone" 
                  placeholder="Teléfono" 
                  required 
                  className="w-full px-3 py-2 rounded-lg border border-isaroma-card-border bg-white text-isaroma-text-main text-sm font-medium focus:ring-2 focus:ring-isaroma-pink-light focus:border-isaroma-primary outline-none shadow-sm transition-all placeholder:text-isaroma-text-muted"
                  value={formData.phone} 
                  onChange={handleInputChange}
                />
              </div>
              
              <input 
                type="text" 
                name="address" 
                placeholder="Dirección/Zona" 
                required 
                className="w-full px-3 py-2 rounded-lg border border-isaroma-card-border bg-white text-isaroma-text-main text-sm font-medium focus:ring-2 focus:ring-isaroma-pink-light focus:border-isaroma-primary outline-none shadow-sm transition-all placeholder:text-isaroma-text-muted"
                value={formData.address} 
                onChange={handleInputChange}
              />
              
              <textarea 
                name="notes" 
                placeholder="Notas (opcional)" 
                rows={1}
                className="w-full px-3 py-2 rounded-lg border border-isaroma-card-border bg-white text-isaroma-text-main text-sm font-medium focus:ring-2 focus:ring-isaroma-pink-light focus:border-isaroma-primary outline-none resize-none shadow-sm transition-all placeholder:text-isaroma-text-muted"
                value={formData.notes} 
                onChange={handleInputChange}
              />

              {/* Información de Pago Compacta */}
              <div className="bg-white p-3 rounded-lg border border-isaroma-card-border text-xs text-isaroma-text-main shadow-sm">
                <p className="font-bold mb-1.5 text-xs">Pago: <span className="font-mono font-bold bg-isaroma-pink-light/30 px-2 py-0.5 rounded text-isaroma-primary">ISAROMA.VENTAS</span></p>
                <p className="text-xs text-isaroma-text-muted font-medium flex items-start gap-1 leading-tight">
                  <Info size={11} className="mt-0.5 flex-shrink-0" /> 
                  <span>Envía el comprobante por WhatsApp al finalizar</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CheckoutDrawer;
