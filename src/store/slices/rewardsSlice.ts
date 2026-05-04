import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const SEHAT_ENTRY_THRESHOLD = 1500;
export const POINTS_FOR_DISCOUNT = 50;
export const DISCOUNT_PER_BLOCK = 200;

export interface SehatEntry {
  orderId: string;
  orderTotal: number;
  earnedAt: string;
}

export interface PointTransaction {
  id: string;
  type: 'earned' | 'redeemed';
  points: number;
  orderId?: string;
  description: string;
  createdAt: string;
}

interface RewardsState {
  sehatEntries: SehatEntry[];
  pointsBalance: number;
  pointsTransactions: PointTransaction[];
  pendingPointsFromCart: number;
  appliedPointsDiscount: number;
}

const initialState: RewardsState = {
  sehatEntries: [],
  pointsBalance: 0,
  pointsTransactions: [],
  pendingPointsFromCart: 0,
  appliedPointsDiscount: 0,
};

const rewardsSlice = createSlice({
  name: 'rewards',
  initialState,
  reducers: {
    addSehatEntry: (state, action: PayloadAction<{ orderId: string; orderTotal: number }>) => {
      state.sehatEntries.push({
        orderId: action.payload.orderId,
        orderTotal: action.payload.orderTotal,
        earnedAt: new Date().toISOString(),
      });
    },
    earnPoints: (state, action: PayloadAction<{ orderId: string; orderTotal: number }>) => {
      const earned = Math.floor(action.payload.orderTotal / 100);
      if (earned > 0) {
        state.pointsBalance += earned;
        state.pointsTransactions.push({
          id: `txn-${Date.now()}`,
          type: 'earned',
          points: earned,
          orderId: action.payload.orderId,
          description: `Earned for order #${action.payload.orderId}`,
          createdAt: new Date().toISOString(),
        });
      }
    },
    redeemPoints: (state, action: PayloadAction<{ points: number }>) => {
      const { points } = action.payload;
      if (points > state.pointsBalance) return;
      const blocks = Math.floor(points / POINTS_FOR_DISCOUNT);
      if (blocks < 1) return;
      const discount = blocks * DISCOUNT_PER_BLOCK;
      const actualPoints = blocks * POINTS_FOR_DISCOUNT;
      state.pointsBalance -= actualPoints;
      state.appliedPointsDiscount = discount;
      state.pointsTransactions.push({
        id: `txn-${Date.now()}`,
        type: 'redeemed',
        points: -actualPoints,
        description: `Redeemed ${actualPoints} points for Rs. ${discount} discount`,
        createdAt: new Date().toISOString(),
      });
    },
    cancelRedemption: (state) => {
      if (state.appliedPointsDiscount > 0) {
        const blocks = state.appliedPointsDiscount / DISCOUNT_PER_BLOCK;
        const pointsToRestore = blocks * POINTS_FOR_DISCOUNT;
        state.pointsBalance += pointsToRestore;
        state.pointsTransactions = state.pointsTransactions.filter(
          (t) => !(t.type === 'redeemed' && t.description.includes('discount'))
        );
        state.appliedPointsDiscount = 0;
      }
    },
    setPendingPointsFromCart: (state, action: PayloadAction<number>) => {
      state.pendingPointsFromCart = action.payload;
    },
    clearRewardsOnOrder: (state, action: PayloadAction<{ orderId: string; orderTotal: number }>) => {
      const { orderId, orderTotal } = action.payload;
      if (orderTotal >= SEHAT_ENTRY_THRESHOLD) {
        state.sehatEntries.push({
          orderId,
          orderTotal,
          earnedAt: new Date().toISOString(),
        });
      }
      const earned = Math.floor(orderTotal / 100);
      if (earned > 0) {
        state.pointsBalance += earned;
        state.pointsTransactions.push({
          id: `txn-${Date.now()}`,
          type: 'earned',
          points: earned,
          orderId,
          description: `Earned for order #${orderId}`,
          createdAt: new Date().toISOString(),
        });
      }
      state.appliedPointsDiscount = 0;
      state.pendingPointsFromCart = 0;
    },
  },
});

export const {
  addSehatEntry,
  earnPoints,
  redeemPoints,
  cancelRedemption,
  setPendingPointsFromCart,
  clearRewardsOnOrder,
} = rewardsSlice.actions;

export default rewardsSlice.reducer;
