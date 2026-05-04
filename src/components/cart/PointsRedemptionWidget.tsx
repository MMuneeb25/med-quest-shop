import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRewards } from '@/hooks/useRewards';
import { POINTS_FOR_DISCOUNT, DISCOUNT_PER_BLOCK } from '@/store/slices/rewardsSlice';

const PointsRedemptionWidget = () => {
  const {
    pointsBalance,
    appliedDiscount,
    canRedeem,
    isAuthenticated,
    redeemPoints,
    cancelRedemption,
  } = useRewards();

  if (!isAuthenticated || !canRedeem) return null;

  return (
    <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <p className="font-semibold flex items-center gap-1.5 text-sm">
          <Star className="h-4 w-4 text-yellow-500" />
          Sehat Points
        </p>
        <span className="text-sm text-muted-foreground">{pointsBalance} pts available</span>
      </div>

      {appliedDiscount > 0 ? (
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-green-700">
            Rs. {appliedDiscount} discount applied!
          </p>
          <Button variant="outline" size="sm" onClick={cancelRedemption}>
            Remove
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">
            Redeem {POINTS_FOR_DISCOUNT} points = Rs. {DISCOUNT_PER_BLOCK} discount
          </p>
          <Button
            size="sm"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
            onClick={() => redeemPoints(POINTS_FOR_DISCOUNT)}
          >
            Redeem {POINTS_FOR_DISCOUNT} pts for Rs. {DISCOUNT_PER_BLOCK} off
          </Button>
        </div>
      )}
    </div>
  );
};

export default PointsRedemptionWidget;
