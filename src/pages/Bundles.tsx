import { PiggyBank, Layers, Heart } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BundleCard from '@/components/bundles/BundleCard';
import { CARE_BUNDLES } from '@/data/bundlesMockData';

const WHY_BUNDLES = [
  {
    icon: PiggyBank,
    title: 'Save More',
    description: 'Bundle prices are significantly lower than buying each item separately.',
  },
  {
    icon: Layers,
    title: 'Everything Included',
    description: 'No need to hunt for individual items — each kit has everything you need.',
  },
  {
    icon: Heart,
    title: 'Curated by Experts',
    description: 'Bundles are assembled with guidance from healthcare professionals.',
  },
];

const Bundles = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Care Bundle Offers</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Value-based health kits designed to give you real care — not chance. Buy a
              complete bundle and save more than buying items one by one.
            </p>
          </div>
        </div>

        {/* Bundles Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CARE_BUNDLES.map((bundle) => (
                <BundleCard key={bundle.id} bundle={bundle} showPointsHint />
              ))}
            </div>
          </div>
        </section>

        {/* Why Bundles */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">Why Choose Bundles?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {WHY_BUNDLES.map(({ icon: Icon, title, description }) => (
                <div key={title} className="text-center">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{title}</h3>
                  <p className="text-muted-foreground">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Bundles;
