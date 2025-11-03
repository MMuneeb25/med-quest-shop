import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Product } from '@/store/slices/productsSlice';
import ProductCard from '@/components/common/ProductCard';
import SkeletonCard from '@/components/common/SkeletonCard';
import { Button } from '@/components/ui/button';
import { productsApi } from '@/api/endpoints';
import { toast } from 'sonner';

const LuckyDraw = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLuckyDrawProducts = async () => {
    setLoading(true);
    try {
      // Mock lucky draw products since API might not be available
      const mockLuckyProducts: Product[] = [
        {
          id: 'lucky-1',
          name: 'Premium Multivitamin Pack',
          description: 'Complete daily vitamin solution',
          price: 39.99,
          image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400',
          category: 'Vitamins',
          brand: 'HealthPlus',
          inStock: true,
        },
        {
          id: 'lucky-2',
          name: 'Herbal Immunity Booster',
          description: 'Natural immune system support',
          price: 27.99,
          image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400',
          category: 'Supplements',
          brand: 'NatureCare',
          inStock: true,
        },
        {
          id: 'lucky-3',
          name: 'Advanced Probiotic Formula',
          description: 'Gut health and digestive support',
          price: 32.99,
          image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400',
          category: 'Supplements',
          brand: 'BioHealth',
          inStock: true,
        },
      ];
      
      setTimeout(() => {
        setProducts(mockLuckyProducts);
        setLoading(false);
      }, 800);
    } catch (error) {
      toast.error('Failed to load lucky draw products');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLuckyDrawProducts();
  }, []);

  return (
    <section className="py-16 bg-gradient-to-br from-accent/10 to-secondary/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-accent/20 rounded-full px-4 py-2 mb-4">
            <Sparkles className="h-5 w-5 text-accent" />
            <span className="text-sm font-semibold text-accent">Special Offers</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Lucky Draw Products</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Limited time special offers on premium healthcare products. Don't miss out!
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
            : products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
        <div className="text-center">
          <Button
            onClick={fetchLuckyDrawProducts}
            size="lg"
            className="bg-gradient-accent hover:opacity-90"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Refresh Lucky Draw
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LuckyDraw;
