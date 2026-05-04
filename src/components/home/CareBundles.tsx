import { Link } from 'react-router-dom';
import { Package, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BundleCard from '@/components/bundles/BundleCard';
import { CARE_BUNDLES } from '@/data/bundlesMockData';

const CareBundles = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 mb-4">
              <Package className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold text-primary">Care Bundle Offers</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">All-in-One Health Bundles</h2>
            <p className="text-muted-foreground">
              Save more when you buy complete, curated health care kits
            </p>
          </div>
          <Link to="/bundles">
            <Button variant="outline" className="shrink-0">
              View All Bundles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CARE_BUNDLES.map((bundle) => (
            <BundleCard key={bundle.id} bundle={bundle} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareBundles;
