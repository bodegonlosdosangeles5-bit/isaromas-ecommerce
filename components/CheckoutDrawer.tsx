'use client';

import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, MessageCircle, Info } from 'lucide-react';
import { useCart } from '@/context/CartContext';

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
    let message = `*Hola ISAROMAS! Quiero realizar el siguiente pedido:*\n\n`;
    
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
      message += ` - $${(item.product.price * item.quantity).toLocaleString()}\n`;
    });

    message += `\n*Total: $${totalPrice.toLocaleString()}*\n\n`;
    
    message += `*Mis Datos:*\n`;
    message += `Nombre: ${formData.name}\n`;
    message += `Teléfono: ${formData.phone}\n`;
    message += `Dirección/Zona: ${formData.address}\n`;
    if (formData.notes) message += `Notas: ${formData.notes}\n`;
    
    message += `\n*Forma de Pago:*\n`;
    message += `Transferencia al Alias: ISAROMAS.VENTAS\n`;
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

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={toggleCart}
      />

      {/* Drawer Mejorado */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out">
        
        {/* Header Mejorado */}
        <div className="p-5 border-b border-isaromas-card-border flex justify-between items-center bg-isaromas-cream">
          <h2 className="text-xl font-bold text-isaromas-text-main flex items-center gap-2 tracking-tight">
            <ShoppingBag size={22} className="text-isaromas-primary" strokeWidth={2} /> 
            Tu Carrito
          </h2>
          <button 
            onClick={toggleCart} 
            className="text-isaromas-icon-muted hover:text-isaromas-text-main p-2 rounded-full hover:bg-isaromas-pink-light/30 transition-all duration-300 hover:scale-110"
            aria-label="Cerrar carrito"
          >
            <X size={24} strokeWidth={2} />
          </button>
        </div>

        {/* Cart Items (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-isaromas-text-secondary space-y-4">
              <ShoppingBag size={48} className="opacity-20 text-isaromas-icon-muted" strokeWidth={1.5} />
              <p className="font-light">Tu carrito está vacío</p>
              <button onClick={toggleCart} className="text-isaromas-primary font-semibold hover:text-isaromas-primary-hover hover:underline tracking-wide">
                Ver productos
              </button>
            </div>
          ) : (
            items.map((item, index) => (
              <div key={`${item.product.id}-${index}`} className="flex gap-4 bg-white p-4 rounded-2xl border border-isaromas-card-border shadow-sm hover:shadow-md transition-all duration-300 hover:border-isaromas-primary/50">
                <div className="w-24 h-24 bg-gradient-to-br from-isaromas-cream to-pink-50 rounded-xl overflow-hidden flex-shrink-0 shadow-sm border border-isaromas-card-border">
                  <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-isaromas-text-main line-clamp-1 mb-1 tracking-tight">{item.product.name}</h3>
                  <p className="text-xs text-isaromas-text-secondary mb-3 font-medium">
                    {[item.variant?.aroma, item.variant?.color, item.variant?.size].filter(Boolean).join(' • ')}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center border border-isaromas-card-border rounded-xl overflow-hidden shadow-sm">
                      <button 
                        className="px-3 py-1.5 text-isaromas-text-secondary hover:bg-pink-50 font-bold transition-colors"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.variant)}
                        aria-label="Disminuir cantidad"
                      >-</button>
                      <span className="px-3 text-sm font-bold text-isaromas-text-main min-w-[2rem] text-center">{item.quantity}</span>
                      <button 
                        className="px-3 py-1.5 text-isaromas-text-secondary hover:bg-pink-50 font-bold transition-colors"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.variant)}
                        aria-label="Aumentar cantidad"
                      >+</button>
                    </div>
                    <div className="text-right">
                        <p className="font-bold text-isaromas-text-main text-lg">${(item.product.price * item.quantity).toLocaleString()}</p>
                        <button 
                            onClick={() => removeFromCart(item.product.id, item.variant)}
                            className="text-isaromas-rose-light hover:text-isaromas-rose text-xs mt-1.5 flex items-center gap-1.5 ml-auto font-semibold transition-colors"
                        >
                            <Trash2 size={14} /> Eliminar
                        </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Checkout Form Mejorado */}
        {items.length > 0 && (
          <div className="border-t border-isaromas-card-border bg-isaromas-cream p-5 space-y-5">
            <div className="space-y-4">
                <h3 className="font-bold text-isaromas-text-main text-sm uppercase tracking-widest border-b border-isaromas-primary/30 pb-2 inline-block">Datos para el pedido</h3>
                <div className="grid grid-cols-2 gap-3">
                    <input 
                        type="text" name="name" placeholder="Nombre y Apellido" required 
                        className="w-full px-4 py-3 rounded-xl border border-isaromas-card-border bg-white text-isaromas-text-main text-sm font-medium focus:ring-2 focus:ring-isaromas-pink-light focus:border-isaromas-primary outline-none shadow-sm transition-all placeholder:text-isaromas-text-muted"
                        value={formData.name} onChange={handleInputChange}
                    />
                    <input 
                        type="tel" name="phone" placeholder="Teléfono" required 
                        className="w-full px-4 py-3 rounded-xl border border-isaromas-card-border bg-white text-isaromas-text-main text-sm font-medium focus:ring-2 focus:ring-isaromas-pink-light focus:border-isaromas-primary outline-none shadow-sm transition-all placeholder:text-isaromas-text-muted"
                        value={formData.phone} onChange={handleInputChange}
                    />
                </div>
                <input 
                    type="text" name="address" placeholder="Dirección o Zona de entrega" required 
                    className="w-full px-4 py-3 rounded-xl border border-isaromas-card-border bg-white text-isaromas-text-main text-sm font-medium focus:ring-2 focus:ring-isaromas-pink-light focus:border-isaromas-primary outline-none shadow-sm transition-all placeholder:text-isaromas-text-muted"
                    value={formData.address} onChange={handleInputChange}
                />
                <textarea 
                    name="notes" placeholder="Notas (ej: aroma preferido, horario...)" rows={2}
                    className="w-full px-4 py-3 rounded-xl border border-isaromas-card-border bg-white text-isaromas-text-main text-sm font-medium focus:ring-2 focus:ring-isaromas-pink-light focus:border-isaromas-primary outline-none resize-none shadow-sm transition-all placeholder:text-isaromas-text-muted"
                    value={formData.notes} onChange={handleInputChange}
                />
            </div>

            <div className="bg-white p-4 rounded-2xl border border-isaromas-card-border text-sm text-isaromas-text-main shadow-sm">
                <p className="font-bold mb-2 text-base tracking-tight">Cómo Pagar:</p>
                <p className="font-medium text-isaromas-text-secondary">Alias Mercado Pago: <span className="font-mono font-bold bg-isaromas-pink-light/30 px-2 py-1 rounded text-isaromas-primary ml-1">ISAROMAS.VENTAS</span></p>
                <p className="text-xs mt-2 text-isaromas-text-muted font-medium flex items-center gap-1">
                  <Info size={12} /> Envianos el comprobante por WhatsApp al finalizar.
                </p>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-isaromas-card-border">
                <span className="text-isaromas-text-main font-bold text-lg tracking-tight">Total estimado:</span>
                <span className="text-3xl font-extrabold text-isaromas-primary tracking-tight">
                  ${totalPrice.toLocaleString()}
                </span>
            </div>

            <button 
                onClick={handleCheckout}
                disabled={!formData.name || !formData.phone || !formData.address}
                className="w-full bg-isaromas-primary hover:bg-isaromas-primary-hover disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 text-lg hover-button disabled:shadow-none tracking-wide"
            >
                <MessageCircle size={22} strokeWidth={2.5} />
                Enviar Pedido por WhatsApp
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CheckoutDrawer;
