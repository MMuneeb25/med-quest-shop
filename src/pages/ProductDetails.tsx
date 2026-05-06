import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Minus, Plus, ShoppingCart, ArrowLeft } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/common/ProductCard';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useCart } from '@/hooks/useCart';
import { useProduct, useProducts } from '@/hooks/useProducts';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const { data: product, isLoading, isError } = useProduct(id ?? '');

  const { data: relatedData } = useProducts({
    category: product?.category,
    limit: 4,
  });
  const relatedProducts = (relatedData?.items ?? []).filter((p) => p.id !== id).slice(0, 4);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
      category: product.category,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Link to="/products" className="inline-flex items-center text-primary hover:underline mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Link>

        {isLoading ? (
          <div className="grid md:grid-cols-2 gap-8">
            <Skeleton className="aspect-square rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-12 w-32" />
            </div>
          </div>
        ) : isError || !product ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">Product not found or failed to load.</p>
            <Link to="/products">
              <Button variant="outline">Browse all products</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
                  <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                  <p className="text-2xl font-bold text-primary mb-4">Rs. {product.price.toFixed(2)}</p>
                  <p className="text-muted-foreground leading-relaxed">{product.description}</p>
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

            {relatedProducts.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Related Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {relatedProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetails;
