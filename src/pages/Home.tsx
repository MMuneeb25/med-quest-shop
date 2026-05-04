import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import SehatReward from '@/components/home/SehatReward';
import CareBundles from '@/components/home/CareBundles';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <FeaturedProducts />
        <SehatReward />
        <CareBundles />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
