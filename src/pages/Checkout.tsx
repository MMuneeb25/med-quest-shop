import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCart } from '@/hooks/useCart';
import { useRewards } from '@/hooks/useRewards';
import { toast } from 'sonner';
import OrderGiftBanner from '@/components/cart/OrderGiftBanner';
import { ordersApi } from '@/api/endpoints';
import type { CreateOrderPayload } from '@shahmedical/types';

const checkoutSchema = yup.object({
  fullName: yup.string().required('Full name is required').max(100),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  address: yup.string().required('Address is required').max(200),
  city: yup.string().required('City is required').max(50),
  zipCode: yup.string().required('ZIP code is required').max(10),
  paymentMethod: yup.string().required('Please select a payment method'),
}).required();

type CheckoutFormData = yup.InferType<typeof checkoutSchema>;

const Checkout = () => {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const { appliedDiscount, clearRewardsOnOrder, cancelRedemption } = useRewards();
  const finalTotal = Math.max(0, total - appliedDiscount);

  const { mutateAsync: createOrder, isPending } = useMutation({
    mutationFn: (payload: CreateOrderPayload) => ordersApi.create(payload),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CheckoutFormData>({
    resolver: yupResolver(checkoutSchema),
    defaultValues: { paymentMethod: 'card' },
  });

  const paymentMethod = watch('paymentMethod');

  const onSubmit = async (data: CheckoutFormData) => {
    const loadingToast = toast.loading('Processing your order...');
    try {
      const payload: CreateOrderPayload = {
        items: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        shippingInfo: {
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          address: data.address,
          city: data.city,
          zipCode: data.zipCode,
        },
        paymentMethod: data.paymentMethod === 'cash' ? 'CASH_ON_DELIVERY' : 'CARD',
        discount: appliedDiscount,
        pointsRedeemed: 0,
      };

      const response = await createOrder(payload);
      const orderId = response.data.data.id;

      toast.dismiss(loadingToast);
      clearRewardsOnOrder(orderId, total);
      cancelRedemption();
      clearCart();
      toast.success('Order placed successfully! Check your Sehat Points.', { duration: 4000 });
      toast.success('Your free gift has been added to your order!', { duration: 3000 });
      setTimeout(() => navigate('/'), 2000);
    } catch {
      toast.dismiss(loadingToast);
      toast.error('Failed to process order. Please try again.');
    }
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Information */}
            <div className="bg-card rounded-lg p-6">
              <h2 className="text-xl font-bold mb-6">Shipping Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" {...register('fullName')} />
                  {errors.fullName && (
                    <p className="text-sm text-destructive mt-1">{errors.fullName.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" {...register('email')} />
                  {errors.email && (
                    <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" {...register('phone')} />
                  {errors.phone && (
                    <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" {...register('address')} />
                  {errors.address && (
                    <p className="text-sm text-destructive mt-1">{errors.address.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" {...register('city')} />
                  {errors.city && (
                    <p className="text-sm text-destructive mt-1">{errors.city.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input id="zipCode" {...register('zipCode')} />
                  {errors.zipCode && (
                    <p className="text-sm text-destructive mt-1">{errors.zipCode.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-card rounded-lg p-6">
              <h2 className="text-xl font-bold mb-6">Payment Method</h2>
              <RadioGroup
                value={paymentMethod}
                onValueChange={(value) => setValue('paymentMethod', value)}
              >
                <div className="flex items-center space-x-2 mb-4">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card">Credit/Debit Card (Demo)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cash" id="cash" />
                  <Label htmlFor="cash">Cash on Delivery</Label>
                </div>
              </RadioGroup>
              {errors.paymentMethod && (
                <p className="text-sm text-destructive mt-2">{errors.paymentMethod.message}</p>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg p-6 sticky top-24 space-y-4">
              <h2 className="text-xl font-bold">Order Summary</h2>
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{item.name} x{item.quantity}</span>
                    <span className="font-medium">Rs. {(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <OrderGiftBanner cartItemCount={items.length} variant="checkout" />

              <div className="space-y-2 border-t pt-3">
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-sm text-green-700">
                    <span>Points Discount</span>
                    <span>- Rs. {appliedDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-xl text-primary">Rs. {finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-accent hover:opacity-90"
                disabled={isPending}
              >
                {isPending ? 'Processing...' : 'Place Order'}
              </Button>
            </div>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
