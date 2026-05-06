import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/common/ProductCard';
import SkeletonCard from '@/components/common/SkeletonCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useProducts } from '@/hooks/useProducts';

const ProductListing = () => {
  const [searchParams] = useSearchParams();
  const [category, setCategory] = useState('all');
  const [brand, setBrand] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 500]);

  const search = searchParams.get('search') ?? undefined;

  const { data, isLoading, isError } = useProducts({
    category: category !== 'all' ? category : undefined,
    brand: brand !== 'all' ? brand : undefined,
    search,
  });

  const products = data?.items ?? [];
  const filteredProducts = products.filter(
    (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
  );

  const clearFilters = () => {
    setCategory('all');
    setBrand('all');
    setPriceRange([0, 500]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">All Products</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 space-y-6">
            <div className="bg-card rounded-lg p-6 space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Category</h3>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Medicines">Medicines</SelectItem>
                    <SelectItem value="Vitamins">Vitamins</SelectItem>
                    <SelectItem value="First Aid">First Aid</SelectItem>
                    <SelectItem value="Personal Care">Personal Care</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Brand</h3>
                <Select value={brand} onValueChange={setBrand}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Brands</SelectItem>
                    <SelectItem value="HealthPlus">HealthPlus</SelectItem>
                    <SelectItem value="MedCare">MedCare</SelectItem>
                    <SelectItem value="SafeCare">SafeCare</SelectItem>
                    <SelectItem value="NatureCare">NatureCare</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Price Range</h3>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={500}
                  step={10}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Rs. {priceRange[0]}</span>
                  <span>Rs. {priceRange[1]}</span>
                </div>
              </div>

              <Button variant="outline" className="w-full" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {isError && (
              <div className="bg-destructive/10 text-destructive rounded-lg p-4 mb-6 text-sm">
                Failed to load products. Please check your connection and try again.
              </div>
            )}

            <div className="flex justify-between items-center mb-6">
              <p className="text-muted-foreground">
                {isLoading ? 'Loading products...' : `Showing ${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''}`}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading
                ? Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)
                : filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
            </div>

            {!isLoading && !isError && filteredProducts.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                <p className="text-lg font-medium mb-2">No products found</p>
                <p className="text-sm">Try adjusting your filters or search query.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductListing;
