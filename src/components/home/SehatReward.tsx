import { useEffect, useState } from 'react';
import { Sparkles, Trophy, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import SkeletonCard from '@/components/common/SkeletonCard';

const PRIZE_ITEMS = [
  {
    id: 'prize-bp',
    name: 'Digital BP Machine',
    description: 'Automatic upper arm blood pressure monitor with memory function',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400',
    value: 'Rs. 2,500 value',
  },
  {
    id: 'prize-gluco',
    name: 'Glucometer Device',
    description: 'Accurate blood glucose monitoring system with 50 test strips included',
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400',
    value: 'Rs. 1,800 value',
  },
];

const SehatReward = () => {
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const sehatEntries = useSelector((state: RootState) => state.rewards.sehatEntries);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-br from-accent/10 to-secondary/10">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
          {/* Left — Program Info */}
          <div>
            <div className="inline-flex items-center gap-2 bg-accent/20 rounded-full px-4 py-2 mb-4">
              <Sparkles className="h-5 w-5 text-accent" />
              <span className="text-sm font-semibold text-accent">Sehat Reward Program</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Win a FREE BP Machine or Glucometer!
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              Get a <span className="font-semibold text-foreground">FREE entry</span> into our
              Sehat Reward draw on every purchase of{' '}
              <span className="font-semibold text-primary">Rs. 1,500 or more</span>. No extra
              cost — just shop for your health and win!
            </p>

            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center mb-6">
              <div className="flex items-center gap-2 bg-background rounded-lg px-4 py-3 border">
                <Trophy className="h-5 w-5 text-accent flex-shrink-0" />
                {isAuthenticated ? (
                  <span className="text-sm font-medium">
                    You have{' '}
                    <span className="text-accent font-bold">{sehatEntries.length}</span>{' '}
                    {sehatEntries.length === 1 ? 'entry' : 'entries'}
                  </span>
                ) : (
                  <span className="text-sm text-muted-foreground">
                    <Link to="/auth" className="text-primary font-semibold hover:underline">
                      Login
                    </Link>{' '}
                    to track your entries
                  </span>
                )}
              </div>
            </div>

            <Link to="/products">
              <Button size="lg" className="bg-gradient-accent hover:opacity-90">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Shop Now & Enter
              </Button>
            </Link>
          </div>

          {/* Right — Prize Cards */}
          <div className="grid grid-cols-2 gap-4">
            {loading
              ? Array.from({ length: 2 }).map((_, i) => <SkeletonCard key={i} />)
              : PRIZE_ITEMS.map((prize) => (
                  <div
                    key={prize.id}
                    className="bg-card rounded-lg overflow-hidden border shadow-sm"
                  >
                    <div className="relative">
                      <img
                        src={prize.image}
                        alt={prize.name}
                        className="w-full h-36 object-cover"
                      />
                      <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground">
                        Prize
                      </Badge>
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold text-sm mb-1">{prize.name}</h3>
                      <p className="text-xs text-muted-foreground mb-2">{prize.description}</p>
                      <p className="text-xs font-bold text-accent">{prize.value}</p>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SehatReward;
