import { useEffect, useState } from 'react';
import { Product } from '@/store/slices/productsSlice';
import ProductCard from '@/components/common/ProductCard';
import SkeletonCard from '@/components/common/SkeletonCard';
import { toast } from 'sonner';

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock featured products
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Vitamin D3 Supplement',
        description: 'High potency vitamin D3 for bone health',
        price: 24.99,
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400',
        category: 'Vitamins',
        brand: 'HealthPlus',
        inStock: true,
        featured: true,
      },
      {
        id: '2',
        name: 'Pain Relief Tablets',
        description: 'Fast-acting pain relief medication',
        price: 12.99,
        image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400',
        category: 'Medicines',
        brand: 'MedCare',
        inStock: true,
        featured: true,
      },
      {
        id: '3',
        name: 'First Aid Kit',
        description: 'Complete emergency first aid kit',
        price: 34.99,
        image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400',
        category: 'First Aid',
        brand: 'SafeCare',
        inStock: true,
        featured: true,
      },
      {
        id: '4',
        name: 'Omega-3 Fish Oil',
        description: 'Premium quality omega-3 supplement',
        price: 29.99,
        image: 'https://images.unsplash.com/photo-1550572017-4e3e5b6a8f85?w=400',
        category: 'Vitamins',
        brand: 'HealthPlus',
        inStock: true,
        featured: true,
      },
    ];

    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <section className="py-16 bg-background-alt">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our most popular healthcare products, carefully selected for your wellness needs
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
            : products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
