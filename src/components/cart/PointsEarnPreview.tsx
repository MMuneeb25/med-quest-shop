import { useEffect } from 'react';
import { Star } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useRewards } from '@/hooks/useRewards';

const PointsEarnPreview = () => {
  const cartTotal = useSelector((state: RootState) => state.cart.total);
  const { setPendingPoints } = useRewards();
  const pendingPoints = Math.floor(cartTotal / 100);

  useEffect(() => {
    setPendingPoints(cartTotal);
  }, [cartTotal]);

  if (pendingPoints === 0) return null;

  return (
    <div className="flex items-center justify-between text-sm py-2 border-t">
      <span className="flex items-center gap-1 text-muted-foreground">
        <Star className="h-3.5 w-3.5 text-yellow-500" />
        Points you'll earn
      </span>
      <span className="font-semibold text-yellow-600">+{pendingPoints} pts</span>
    </div>
  );
};

export default PointsEarnPreview;
