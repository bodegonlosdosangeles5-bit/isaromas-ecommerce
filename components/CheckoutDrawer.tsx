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

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out">
        
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <ShoppingBag size={20} /> Tu Carrito
          </h2>
          <button onClick={toggleCart} className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-200 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Cart Items (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
              <ShoppingBag size={48} className="opacity-20" />
              <p>Tu carrito está vacío</p>
              <button onClick={toggleCart} className="text-isaromas-pink font-medium hover:underline">
                Ver productos
              </button>
            </div>
          ) : (
            items.map((item, index) => (
              <div key={`${item.product.id}-${index}`} className="flex gap-4 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800 line-clamp-1">{item.product.name}</h3>
                  <p className="text-xs text-gray-500 mb-2">
                    {[item.variant?.aroma, item.variant?.color, item.variant?.size].filter(Boolean).join(' • ')}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center border border-gray-200 rounded-lg">
                      <button 
                        className="px-2 py-1 text-gray-600 hover:bg-gray-50"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.variant)}
                      >-</button>
                      <span className="px-2 text-sm font-medium">{item.quantity}</span>
                      <button 
                        className="px-2 py-1 text-gray-600 hover:bg-gray-50"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.variant)}
                      >+</button>
                    </div>
                    <div className="text-right">
                        <p className="font-bold text-gray-900">${(item.product.price * item.quantity).toLocaleString()}</p>
                        <button 
                            onClick={() => removeFromCart(item.product.id, item.variant)}
                            className="text-red-400 hover:text-red-600 text-xs mt-1 flex items-center gap-1 ml-auto"
                        >
                            <Trash2 size={12} /> Eliminar
                        </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Checkout Form */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 bg-gray-50 p-4 space-y-4">
            <div className="space-y-3">
                <h3 className="font-semibold text-gray-800 text-sm">Datos para el pedido</h3>
                <div className="grid grid-cols-2 gap-3">
                    <input 
                        type="text" name="name" placeholder="Nombre y Apellido" required 
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 text-sm focus:ring-2 focus:ring-isaromas-pink/50 outline-none shadow-sm"
                        value={formData.name} onChange={handleInputChange}
                    />
                    <input 
                        type="tel" name="phone" placeholder="Teléfono" required 
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 text-sm focus:ring-2 focus:ring-isaromas-pink/50 outline-none shadow-sm"
                        value={formData.phone} onChange={handleInputChange}
                    />
                </div>
                <input 
                    type="text" name="address" placeholder="Dirección o Zona de entrega" required 
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 text-sm focus:ring-2 focus:ring-isaromas-pink/50 outline-none shadow-sm"
                    value={formData.address} onChange={handleInputChange}
                />
                <textarea 
                    name="notes" placeholder="Notas (ej: aroma preferido, horario...)" rows={2}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-800 text-sm focus:ring-2 focus:ring-isaromas-pink/50 outline-none resize-none shadow-sm"
                    value={formData.notes} onChange={handleInputChange}
                />
            </div>

            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 text-sm text-blue-800">
                <p className="font-semibold mb-1">Cómo Pagar:</p>
                <p>Alias Mercado Pago: <span className="font-mono font-bold">ISAROMAS.VENTAS</span></p>
                <p className="text-xs mt-1 text-blue-600">Envianos el comprobante por WhatsApp al finalizar.</p>
            </div>

            <div className="flex justify-between items-center pt-2">
                <span className="text-gray-600">Total estimado:</span>
                <span className="text-2xl font-bold text-gray-900">${totalPrice.toLocaleString()}</span>
            </div>

            <button 
                onClick={handleCheckout}
                disabled={!formData.name || !formData.phone || !formData.address}
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
                <MessageCircle size={20} />
                Enviar Pedido por WhatsApp
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CheckoutDrawer;
