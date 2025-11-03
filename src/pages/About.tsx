import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Heart, Shield, Truck, Award } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-hero text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About MediStore</h1>
            <p className="text-lg max-w-2xl mx-auto opacity-90">
              Your trusted partner in healthcare, delivering quality medical products since 2020
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                MediStore was founded with a simple mission: to make quality healthcare products accessible to everyone. We understand that health is wealth, and accessing the right medicines and healthcare products should be easy and convenient.
              </p>
              <p className="text-muted-foreground mb-4">
                Over the years, we've grown from a small local pharmacy to a comprehensive online medical store, serving thousands of customers nationwide. Our commitment to quality, authenticity, and customer service remains unwavering.
              </p>
              <p className="text-muted-foreground">
                Every product in our store is carefully selected and sourced from trusted manufacturers. We work directly with pharmaceutical companies and healthcare brands to ensure that you receive only genuine products.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background-alt">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                  <Shield className="h-8 w-8" />
                </div>
                <h3 className="font-semibold mb-2">100% Authentic</h3>
                <p className="text-sm text-muted-foreground">
                  All products are sourced directly from manufacturers
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 text-secondary mb-4">
                  <Truck className="h-8 w-8" />
                </div>
                <h3 className="font-semibold mb-2">Fast Delivery</h3>
                <p className="text-sm text-muted-foreground">
                  Quick and reliable delivery to your doorstep
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent mb-4">
                  <Heart className="h-8 w-8" />
                </div>
                <h3 className="font-semibold mb-2">Expert Care</h3>
                <p className="text-sm text-muted-foreground">
                  Pharmacist consultation available for your queries
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                  <Award className="h-8 w-8" />
                </div>
                <h3 className="font-semibold mb-2">Trusted Quality</h3>
                <p className="text-sm text-muted-foreground">
                  Certified and licensed online pharmacy
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
