import { Navigate } from 'react-router-dom';
import { Star, ShoppingBag, Gift, Trophy, TrendingUp } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useRewards } from '@/hooks/useRewards';
import PointsRedemptionWidget from '@/components/cart/PointsRedemptionWidget';
import { POINTS_FOR_DISCOUNT, DISCOUNT_PER_BLOCK } from '@/store/slices/rewardsSlice';

const HOW_IT_WORKS = [
  {
    icon: ShoppingBag,
    step: '1',
    title: 'Shop',
    description: 'Purchase any product from ShahMedical',
  },
  {
    icon: Star,
    step: '2',
    title: 'Earn Points',
    description: 'Get 1 Sehat Point for every Rs. 100 you spend',
  },
  {
    icon: Gift,
    step: '3',
    title: 'Redeem',
    description: `Redeem ${POINTS_FOR_DISCOUNT} points for Rs. ${DISCOUNT_PER_BLOCK} off your next order`,
  },
];

const Rewards = () => {
  const {
    pointsBalance,
    sehatEntries,
    pointsTransactions,
    canRedeem,
    isAuthenticated,
  } = useRewards();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  const progressToNextRedemption = (pointsBalance % POINTS_FOR_DISCOUNT) / POINTS_FOR_DISCOUNT * 100;
  const pointsUntilNextRedemption = POINTS_FOR_DISCOUNT - (pointsBalance % POINTS_FOR_DISCOUNT);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Sehat Rewards</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Points Summary */}
            <Card className="bg-gradient-to-br from-primary to-primary/80 text-white">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-primary-foreground/80 text-sm mb-1">Your Sehat Points</p>
                    <p className="text-5xl font-bold">{pointsBalance}</p>
                    <p className="text-primary-foreground/70 text-sm mt-1">pts</p>
                  </div>
                  <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center">
                    <Star className="h-8 w-8 text-yellow-300" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-primary-foreground/80">
                    <span>Progress to next Rs. {DISCOUNT_PER_BLOCK} discount</span>
                    <span>{pointsBalance % POINTS_FOR_DISCOUNT} / {POINTS_FOR_DISCOUNT} pts</span>
                  </div>
                  <Progress value={progressToNextRedemption} className="bg-white/20 h-2" />
                  {!canRedeem && (
                    <p className="text-xs text-primary-foreground/70">
                      {pointsUntilNextRedemption} more points to earn Rs. {DISCOUNT_PER_BLOCK} discount
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Redeem Card */}
            {canRedeem && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Redeem Your Points</CardTitle>
                </CardHeader>
                <CardContent>
                  <PointsRedemptionWidget />
                </CardContent>
              </Card>
            )}

            {/* Transaction History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Transaction History
                </CardTitle>
              </CardHeader>
              <CardContent>
                {pointsTransactions.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    No transactions yet. Start shopping to earn points!
                  </p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Points</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[...pointsTransactions].reverse().map((txn) => (
                        <TableRow key={txn.id}>
                          <TableCell className="text-sm text-muted-foreground">
                            {new Date(txn.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-sm">{txn.description}</TableCell>
                          <TableCell className="text-right">
                            <Badge
                              variant={txn.type === 'earned' ? 'default' : 'secondary'}
                              className={
                                txn.type === 'earned'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-red-100 text-red-700'
                              }
                            >
                              {txn.type === 'earned' ? '+' : ''}{txn.points}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            {/* How It Works */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How It Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {HOW_IT_WORKS.map(({ icon: Icon, step, title, description }) => (
                  <div key={step} className="flex gap-3">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="h-4.5 w-4.5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{title}</p>
                      <p className="text-xs text-muted-foreground">{description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Sehat Reward Entries */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Trophy className="h-5 w-5 text-accent" />
                  Sehat Reward Entries
                </CardTitle>
              </CardHeader>
              <CardContent>
                {sehatEntries.length === 0 ? (
                  <p className="text-muted-foreground text-sm text-center py-4">
                    No entries yet. Spend Rs. 1,500 or more on a single order to earn your first entry!
                  </p>
                ) : (
                  <ul className="space-y-3">
                    {[...sehatEntries].reverse().map((entry, i) => (
                      <li key={entry.orderId} className="flex justify-between text-sm border-b pb-2 last:border-0">
                        <span className="text-muted-foreground">
                          Entry #{sehatEntries.length - i} — Rs. {entry.orderTotal.toLocaleString()}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(entry.earnedAt).toLocaleDateString()}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Rewards;
