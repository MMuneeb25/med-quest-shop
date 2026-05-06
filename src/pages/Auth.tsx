import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthContext } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

const loginSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
}).required();

const signupSchema = yup.object({
  name: yup.string().required('Name is required').max(100),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match'),
}).required();

type LoginFormData = yup.InferType<typeof loginSchema>;
type SignupFormData = yup.InferType<typeof signupSchema>;

const Auth = () => {
  const navigate = useNavigate();
  const { login, register } = useAuthContext();
  const [activeTab, setActiveTab] = useState('login');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loginForm = useForm<LoginFormData>({ resolver: yupResolver(loginSchema) });
  const signupForm = useForm<SignupFormData>({ resolver: yupResolver(signupSchema) });

  const onLogin = async (data: LoginFormData) => {
    setIsSubmitting(true);
    const loadingToast = toast.loading('Logging in...');
    try {
      await login(data.email, data.password);
      toast.dismiss(loadingToast);
      toast.success('Welcome back!');
      navigate('/');
    } catch (err: unknown) {
      toast.dismiss(loadingToast);
      const msg = err instanceof Error ? err.message : 'Invalid credentials. Please try again.';
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSignup = async (data: SignupFormData) => {
    setIsSubmitting(true);
    const loadingToast = toast.loading('Creating account...');
    try {
      await register(data.name, data.email, data.password);
      toast.dismiss(loadingToast);
      toast.success('Account created successfully!');
      navigate('/');
    } catch (err: unknown) {
      toast.dismiss(loadingToast);
      const msg = err instanceof Error ? err.message : 'Failed to create account. Please try again.';
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 bg-background-alt">
        <div className="w-full max-w-md px-4">
          <div className="bg-card rounded-lg p-8 shadow-lg">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Welcome to ShahMedical</h1>
              <p className="text-muted-foreground">Sign in to your account or create a new one</p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
                  <div>
                    <Label htmlFor="login-email">Email</Label>
                    <Input id="login-email" type="email" {...loginForm.register('email')} />
                    {loginForm.formState.errors.email && (
                      <p className="text-sm text-destructive mt-1">{loginForm.formState.errors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="login-password">Password</Label>
                    <Input id="login-password" type="password" {...loginForm.register('password')} />
                    {loginForm.formState.errors.password && (
                      <p className="text-sm text-destructive mt-1">{loginForm.formState.errors.password.message}</p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-accent hover:opacity-90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Logging in...' : 'Login'}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={signupForm.handleSubmit(onSignup)} className="space-y-4">
                  <div>
                    <Label htmlFor="signup-name">Name</Label>
                    <Input id="signup-name" {...signupForm.register('name')} />
                    {signupForm.formState.errors.name && (
                      <p className="text-sm text-destructive mt-1">{signupForm.formState.errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="signup-email">Email</Label>
                    <Input id="signup-email" type="email" {...signupForm.register('email')} />
                    {signupForm.formState.errors.email && (
                      <p className="text-sm text-destructive mt-1">{signupForm.formState.errors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="signup-password">Password</Label>
                    <Input id="signup-password" type="password" {...signupForm.register('password')} />
                    {signupForm.formState.errors.password && (
                      <p className="text-sm text-destructive mt-1">{signupForm.formState.errors.password.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="signup-confirm">Confirm Password</Label>
                    <Input id="signup-confirm" type="password" {...signupForm.register('confirmPassword')} />
                    {signupForm.formState.errors.confirmPassword && (
                      <p className="text-sm text-destructive mt-1">{signupForm.formState.errors.confirmPassword.message}</p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-accent hover:opacity-90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Creating account...' : 'Sign Up'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <p className="text-center text-xs text-muted-foreground mt-6">
              Need help?{' '}
              <Link to="/contact" className="text-primary hover:underline">Contact support</Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Auth;
