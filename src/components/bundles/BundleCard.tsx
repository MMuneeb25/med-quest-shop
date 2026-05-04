import { Package } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CareBundle } from '@/data/bundlesMockData';
import { useCart } from '@/hooks/useCart';

interface BundleCardProps {
  bundle: CareBundle;
  showPointsHint?: boolean;
}

const BundleCard = ({ bundle, showPointsHint = true }: BundleCardProps) => {
  const { addToCart } = useCart();
  const pointsToEarn = Math.floor(bundle.bundlePrice / 100);
  const visibleProducts = bundle.products.slice(0, 4);
  const extraCount = bundle.products.length - 4;

  const handleAddBundle = () => {
    addToCart({
      id: `bundle-${bundle.id}`,
      name: bundle.name,
      price: bundle.bundlePrice,
      quantity: 1,
      image: bundle.image,
      category: 'Bundle',
    });
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 relative flex flex-col h-full">
      {bundle.badge && (
        <Badge className="absolute top-3 right-3 z-10 bg-accent text-accent-foreground">
          {bundle.badge}
        </Badge>
      )}

      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={bundle.image}
          alt={bundle.name}
          className="w-full h-48 object-cover"
        />
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{bundle.name}</CardTitle>
        <CardDescription>{bundle.tagline}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        <ul className="space-y-1">
          {visibleProducts.map((p) => (
            <li key={p.id} className="flex items-center gap-2 text-sm text-muted-foreground">
              <Package className="h-3.5 w-3.5 flex-shrink-0 text-primary" />
              {p.name}
            </li>
          ))}
          {extraCount > 0 && (
            <li className="text-xs text-muted-foreground pl-5">+{extraCount} more items</li>
          )}
        </ul>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground line-through">
            Rs. {bundle.originalPrice.toLocaleString()}
          </span>
          <span className="text-xl font-bold text-primary">
            Rs. {bundle.bundlePrice.toLocaleString()}
          </span>
          <Badge variant="secondary" className="text-xs text-green-700 bg-green-100">
            Save Rs. {bundle.savings.toLocaleString()}
          </Badge>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-2 pt-0">
        <Button
          className="w-full bg-gradient-accent hover:opacity-90"
          onClick={handleAddBundle}
        >
          Add Bundle to Cart
        </Button>
        {showPointsHint && (
          <p className="text-xs text-muted-foreground text-center">
            Earn {pointsToEarn} Sehat Points with this purchase
          </p>
        )}
      </CardFooter>
    </Card>
  );
};

export default BundleCard;
