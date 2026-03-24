import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Minus, Plus, ShoppingCart, ArrowLeft } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/common/ProductCard';
import { Button } from '@/components/ui/button';
import { Product } from '@/store/slices/productsSlice';
import { useCart } from '@/hooks/useCart';
import { Skeleton } from '@/components/ui/skeleton';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    // Mock product data
    const mockProduct: Product = {
      id: id || '1',
      name: 'Vitamin D3 High Potency Supplement',
      description: 'Premium vitamin D3 supplement for optimal bone health, immune support, and overall wellness. Each capsule contains 5000 IU of vitamin D3 (cholecalciferol), the most bioavailable form of vitamin D. Non-GMO, gluten-free, and made with natural ingredients.',
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800',
      category: 'Vitamins',
      brand: 'HealthPlus',
      inStock: true,
      featured: true,
    };

    const mockRelated: Product[] = Array.from({ length: 4 }, (_, i) => ({
      id: `related-${i + 1}`,
      name: `Related Product ${i + 1}`,
      description: 'Related healthcare product',
      price: Math.floor(Math.random() * 50) + 10,
      image: `https://images.unsplash.com/photo-${1584308666744 + i}?w=400`,
      category: 'Vitamins',
      brand: 'HealthPlus',
      inStock: true,
    }));

    setTimeout(() => {
      setProduct(mockProduct);
      setRelatedProducts(mockRelated);
      setLoading(false);
    }, 800);
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity,
        image: product.image,
        category: product.category,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Link to="/products" className="inline-flex items-center text-primary hover:underline mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Link>

        {loading ? (
          <div className="grid md:grid-cols-2 gap-8">
            <Skeleton className="aspect-square rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-12 w-32" />
            </div>
          </div>
        ) : product ? (
          <>
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
                  <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                  <p className="text-2xl font-bold text-primary mb-4">
                    Rs. {product.price.toFixed(2)}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Brand: {product.brand}</p>
                    {product.inStock ? (
                      <p className="text-sm text-secondary">✓ In Stock</p>
                    ) : (
                      <p className="text-sm text-destructive">Out of Stock</p>
                    )}
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border rounded-lg">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="px-4 font-medium">{quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      size="lg"
                      onClick={handleAddToCart}
                      disabled={!product.inStock}
                      className="flex-1 bg-gradient-accent hover:opacity-90"
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Product not found</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetails;
