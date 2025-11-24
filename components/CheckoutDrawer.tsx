'use client';

import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, MessageCircle } from 'lucide-react';
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
        <div className="p-5 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-gray-50 to-white">
          <h2 className="text-xl font-extrabold text-gray-900 flex items-center gap-2">
            <ShoppingBag size={22} className="text-pink-500" /> Tu Carrito
          </h2>
          <button 
            onClick={toggleCart} 
            className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-200 transition-all duration-300 hover:scale-110"
            aria-label="Cerrar carrito"
          >
            <X size={24} />
          </button>
        </div>

        {/* Cart Items (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
              <ShoppingBag size={48} className="opacity-20" />
              <p>Tu carrito está vacío</p>
              <button onClick={toggleCart} className="text-pink-600 font-semibold hover:text-rose-600 hover:underline">
                Ver productos
              </button>
            </div>
          ) : (
            items.map((item, index) => (
              <div key={`${item.product.id}-${index}`} className="flex gap-4 bg-white p-4 rounded-2xl border-2 border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-isaromas-pink/30">
                <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden flex-shrink-0 shadow-md">
                  <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 line-clamp-1 mb-1">{item.product.name}</h3>
                  <p className="text-xs text-gray-600 mb-3 font-medium">
                    {[item.variant?.aroma, item.variant?.color, item.variant?.size].filter(Boolean).join(' • ')}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden shadow-sm">
                      <button 
                        className="px-3 py-1.5 text-gray-700 hover:bg-gray-50 font-bold transition-colors"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.variant)}
                        aria-label="Disminuir cantidad"
                      >-</button>
                      <span className="px-3 text-sm font-bold text-gray-900 min-w-[2rem] text-center">{item.quantity}</span>
                      <button 
                        className="px-3 py-1.5 text-gray-700 hover:bg-gray-50 font-bold transition-colors"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.variant)}
                        aria-label="Aumentar cantidad"
                      >+</button>
                    </div>
                    <div className="text-right">
                        <p className="font-extrabold text-gray-900 text-lg">${(item.product.price * item.quantity).toLocaleString()}</p>
                        <button 
                            onClick={() => removeFromCart(item.product.id, item.variant)}
                            className="text-red-500 hover:text-red-600 text-xs mt-1.5 flex items-center gap-1.5 ml-auto font-semibold transition-colors"
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
          <div className="border-t-2 border-gray-200 bg-gradient-to-b from-gray-50 to-white p-5 space-y-5">
            <div className="space-y-4">
                <h3 className="font-extrabold text-gray-900 text-base uppercase tracking-wide">Datos para el pedido</h3>
                <div className="grid grid-cols-2 gap-3">
                    <input 
                        type="text" name="name" placeholder="Nombre y Apellido" required 
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white text-gray-800 text-sm font-medium focus:ring-4 focus:ring-pink-200 focus:border-pink-500 outline-none shadow-sm transition-all"
                        value={formData.name} onChange={handleInputChange}
                    />
                    <input 
                        type="tel" name="phone" placeholder="Teléfono" required 
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white text-gray-800 text-sm font-medium focus:ring-4 focus:ring-pink-200 focus:border-pink-500 outline-none shadow-sm transition-all"
                        value={formData.phone} onChange={handleInputChange}
                    />
                </div>
                <input 
                    type="text" name="address" placeholder="Dirección o Zona de entrega" required 
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white text-gray-800 text-sm font-medium focus:ring-4 focus:ring-isaromas-pink/30 focus:border-isaromas-pink outline-none shadow-sm transition-all"
                    value={formData.address} onChange={handleInputChange}
                />
                <textarea 
                    name="notes" placeholder="Notas (ej: aroma preferido, horario...)" rows={2}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white text-gray-800 text-sm font-medium focus:ring-4 focus:ring-isaromas-pink/30 focus:border-isaromas-pink outline-none resize-none shadow-sm transition-all"
                    value={formData.notes} onChange={handleInputChange}
                />
            </div>

            <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-4 rounded-2xl border-2 border-pink-200 text-sm text-pink-900 shadow-md">
                <p className="font-extrabold mb-2 text-base">Cómo Pagar:</p>
                <p className="font-semibold">Alias Mercado Pago: <span className="font-mono font-extrabold bg-white px-2 py-1 rounded">ISAROMAS.VENTAS</span></p>
                <p className="text-xs mt-2 text-pink-700 font-medium">Envianos el comprobante por WhatsApp al finalizar.</p>
            </div>

            <div className="flex justify-between items-center pt-3 border-t-2 border-gray-200">
                <span className="text-gray-700 font-bold text-lg">Total estimado:</span>
                <span className="text-3xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  ${totalPrice.toLocaleString()}
                </span>
            </div>

            <button 
                onClick={handleCheckout}
                disabled={!formData.name || !formData.phone || !formData.address}
                className="w-full bg-gradient-to-r from-[#25D366] to-[#20bd5a] hover:from-[#20bd5a] hover:to-[#1da851] disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white py-4 rounded-xl font-extrabold shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center gap-3 text-lg hover:scale-105 disabled:hover:scale-100"
            >
                <MessageCircle size={22} />
                Enviar Pedido por WhatsApp
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CheckoutDrawer;
