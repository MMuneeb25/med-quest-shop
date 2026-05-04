import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { addToCart, removeFromCart, updateQuantity, clearCart, CartItem } from '@/store/slices/cartSlice';
import { toast } from 'sonner';

export const useCart = () => {
  const dispatch = useDispatch();
  const { items, total } = useSelector((state: RootState) => state.cart);

  const handleAddToCart = (item: CartItem) => {
    dispatch(addToCart(item));
    toast.success(`${item.name} added to cart!`);
  };

  const handleRemoveFromCart = (id: string) => {
    dispatch(removeFromCart(id));
    toast.info('Item removed from cart');
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      handleRemoveFromCart(id);
      return;
    }
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.info('Cart cleared');
  };

  const getItemCount = () => {
    return items.length;
  };

  return {
    items,
    total,
    addToCart: handleAddToCart,
    removeFromCart: handleRemoveFromCart,
    updateQuantity: handleUpdateQuantity,
    clearCart: handleClearCart,
    itemCount: getItemCount(),
  };
};
