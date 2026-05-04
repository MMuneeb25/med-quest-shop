export type BundleId = 'diabetes-care' | 'bp-care' | 'immunity-pack';

export interface BundleProduct {
  id: string;
  name: string;
  quantity: number;
}

export interface CareBundle {
  id: BundleId;
  name: string;
  tagline: string;
  description: string;
  image: string;
  originalPrice: number;
  bundlePrice: number;
  savings: number;
  products: BundleProduct[];
  badge?: string;
}

export const CARE_BUNDLES: CareBundle[] = [
  {
    id: 'diabetes-care',
    name: 'Diabetes Care Kit',
    tagline: 'Complete diabetes management in one pack',
    description:
      'Everything you need for daily diabetes monitoring and care, curated by healthcare professionals.',
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=600',
    originalPrice: 4500,
    bundlePrice: 3499,
    savings: 1001,
    badge: 'Best Value',
    products: [
      { id: 'dc-1', name: 'Glucometer Device', quantity: 1 },
      { id: 'dc-2', name: 'Glucometer Test Strips (50 pcs)', quantity: 1 },
      { id: 'dc-3', name: 'Lancets (100 pcs)', quantity: 1 },
      { id: 'dc-4', name: 'Diabetes Multivitamin (30 tabs)', quantity: 1 },
    ],
  },
  {
    id: 'bp-care',
    name: 'BP Care Bundle',
    tagline: 'Monitor your blood pressure with confidence',
    description:
      'A complete blood pressure management kit including a digital monitor and supportive supplements.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600',
    originalPrice: 3800,
    bundlePrice: 2999,
    savings: 801,
    badge: 'Most Popular',
    products: [
      { id: 'bp-1', name: 'Digital BP Machine', quantity: 1 },
      { id: 'bp-2', name: 'Omega-3 Capsules (60 caps)', quantity: 1 },
      { id: 'bp-3', name: 'BP Diary & Logbook', quantity: 1 },
    ],
  },
  {
    id: 'immunity-pack',
    name: 'Immunity Pack',
    tagline: 'Strengthen your immune system naturally',
    description:
      'A carefully selected combination of vitamins and natural supplements to boost your immunity year-round.',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600',
    originalPrice: 2800,
    bundlePrice: 1999,
    savings: 801,
    products: [
      { id: 'ip-1', name: 'Vitamin C 1000mg (60 tabs)', quantity: 1 },
      { id: 'ip-2', name: 'Zinc Supplement (30 tabs)', quantity: 1 },
      { id: 'ip-3', name: 'Multivitamin Complex (30 tabs)', quantity: 1 },
      { id: 'ip-4', name: 'Elderberry Syrup', quantity: 1 },
    ],
  },
];
