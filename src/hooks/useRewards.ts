import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import {
  earnPoints,
  redeemPoints,
  cancelRedemption,
  setPendingPointsFromCart,
  clearRewardsOnOrder,
  POINTS_FOR_DISCOUNT,
  DISCOUNT_PER_BLOCK,
} from '@/store/slices/rewardsSlice';
import { toast } from 'sonner';

export const useRewards = () => {
  const dispatch = useDispatch();
  const { pointsBalance, sehatEntries, pendingPointsFromCart, appliedPointsDiscount, pointsTransactions } =
    useSelector((state: RootState) => state.rewards);
  const { isAuthenticated } = useSelector((state: RootState) => state.user);

  const canRedeem = pointsBalance >= POINTS_FOR_DISCOUNT;
  const redeemableBlocks = Math.floor(pointsBalance / POINTS_FOR_DISCOUNT);
  const maxRedeemableDiscount = redeemableBlocks * DISCOUNT_PER_BLOCK;

  const handleEarnPoints = (orderId: string, orderTotal: number) => {
    const earned = Math.floor(orderTotal / 100);
    dispatch(earnPoints({ orderId, orderTotal }));
    if (earned > 0) toast.success(`You earned ${earned} Sehat Points!`);
  };

  const handleRedeemPoints = (points: number) => {
    if (points > pointsBalance) {
      toast.error('Insufficient points');
      return;
    }
    dispatch(redeemPoints({ points }));
    const blocks = Math.floor(points / POINTS_FOR_DISCOUNT);
    const discount = blocks * DISCOUNT_PER_BLOCK;
    toast.success(`Rs. ${discount} discount applied!`);
  };

  const handleCancelRedemption = () => {
    dispatch(cancelRedemption());
    toast.info('Points redemption cancelled');
  };

  const handleSetPendingPoints = (cartTotal: number) => {
    dispatch(setPendingPointsFromCart(Math.floor(cartTotal / 100)));
  };

  const handleClearRewardsOnOrder = (orderId: string, orderTotal: number) => {
    dispatch(clearRewardsOnOrder({ orderId, orderTotal }));
  };

  return {
    pointsBalance,
    sehatEntries,
    pendingPoints: pendingPointsFromCart,
    appliedDiscount: appliedPointsDiscount,
    pointsTransactions,
    canRedeem,
    redeemableBlocks,
    maxRedeemableDiscount,
    isAuthenticated,
    earnPoints: handleEarnPoints,
    redeemPoints: handleRedeemPoints,
    cancelRedemption: handleCancelRedemption,
    setPendingPoints: handleSetPendingPoints,
    clearRewardsOnOrder: handleClearRewardsOnOrder,
  };
};
