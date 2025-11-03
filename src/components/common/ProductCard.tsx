import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Product } from '@/store/slices/productsSlice';
import { useCart } from '@/hooks/useCart';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      category: product.category,
    });
  };

  return (
    <Link to={`/products/${product.id}`}>
      <Card className="h-full hover:shadow-lg transition-all duration-300 group">
        <CardContent className="p-4">
          <div className="aspect-square relative overflow-hidden rounded-lg bg-muted mb-4">
            <img
              src={product.image}
              alt={product.name}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            />
            {product.featured && (
              <div className="absolute top-2 right-2 bg-accent text-accent-foreground text-xs font-semibold px-2 py-1 rounded">
                Featured
              </div>
            )}
          </div>
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground uppercase">{product.category}</p>
            <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-smooth">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</p>
            {product.inStock ? (
              <p className="text-xs text-secondary">In Stock</p>
            ) : (
              <p className="text-xs text-destructive">Out of Stock</p>
            )}
          </div>
          <Button
            size="icon"
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="bg-gradient-accent hover:opacity-90"
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
