import { Gift } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { selectGiftForOrder } from '@/data/giftsMockData';

interface OrderGiftBannerProps {
  cartItemCount: number;
  variant?: 'cart' | 'checkout';
}

const OrderGiftBanner = ({ cartItemCount, variant = 'cart' }: OrderGiftBannerProps) => {
  const gift = selectGiftForOrder(cartItemCount);

  if (variant === 'checkout') {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-3 flex items-center gap-3">
        <Gift className="h-6 w-6 text-green-600 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-green-800">{gift.name}</p>
          <p className="text-xs text-green-600">{gift.value}</p>
        </div>
        <Badge className="bg-green-600 text-white shrink-0">FREE</Badge>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-green-200 bg-green-50 p-4 flex items-center gap-3">
      <Gift className="h-8 w-8 text-green-600 flex-shrink-0" />
      <div className="flex-1">
        <p className="font-semibold text-green-800">Gift with Your Order!</p>
        <p className="text-sm text-green-700">{gift.name}</p>
        <p className="text-xs text-green-600 mt-0.5">{gift.description}</p>
        <p className="text-xs font-medium text-green-700 mt-1">{gift.value}</p>
      </div>
      <Badge className="bg-green-600 text-white shrink-0">FREE</Badge>
    </div>
  );
};

export default OrderGiftBanner;
