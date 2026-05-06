import ProductCard from '@/components/common/ProductCard';
import SkeletonCard from '@/components/common/SkeletonCard';
import { useFeaturedProducts } from '@/hooks/useProducts';

const FeaturedProducts = () => {
  const { data: products = [], isLoading, isError } = useFeaturedProducts();

  return (
    <section className="py-16 bg-background-alt">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our most popular healthcare products, carefully selected for your wellness needs
          </p>
        </div>

        {isError && (
          <p className="text-center text-muted-foreground text-sm mb-6">
            Could not load featured products right now.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
            : products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
