export type GiftType = 'mask' | 'sanitizer' | 'voucher';

export interface OrderGift {
  id: GiftType;
  name: string;
  description: string;
  value: string;
}

export const ORDER_GIFTS: OrderGift[] = [
  {
    id: 'mask',
    name: 'Free Surgical Mask (Pack of 10)',
    description: 'High-quality 3-ply surgical masks for daily protection',
    value: 'Rs. 150 value',
  },
  {
    id: 'sanitizer',
    name: 'Free Mini Hand Sanitizer (50ml)',
    description: '70% alcohol-based instant sanitizer, pocket-sized',
    value: 'Rs. 120 value',
  },
  {
    id: 'voucher',
    name: 'Rs. 100 Discount Voucher',
    description: 'Use on your next order at ShahMedical',
    value: 'Rs. 100 off next order',
  },
];

export const selectGiftForOrder = (cartItemCount: number): OrderGift => {
  return ORDER_GIFTS[cartItemCount % ORDER_GIFTS.length];
};
