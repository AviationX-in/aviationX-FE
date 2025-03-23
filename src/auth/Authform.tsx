import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { Input } from '@/components/atoms/Input';
import { Button } from '@/components/atoms/Button';
import { Card, CardContent, CardHeader } from '@/components/molecules/Card';
import { Label } from '@/components/atoms/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/molecules/tabs';
import { Alert, AlertDescription } from '@/components/atoms/alert';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/molecules/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/molecules/avatar';
import { loginSchema, loginSchemaType, signupSchema, signupSchemaType } from '@/schema/Authschema';
import { api } from '../services/apiService';

// Define a type for the response
interface UserProfile {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

const AuthForms = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const {
    register: registerSignup,
    handleSubmit: handleSignupSubmit,
    formState: { errors: signupErrors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSignup = async (data: signupSchemaType) => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, data, {
        headers: {
          'Content-Type': 'application/json',
          'With-Credentials': 'true',
        },
      });

      if (response.status === 201) {
        setError('');
        alert('Account created successfully! You can now log in.');
        document
          .querySelector('[value="login"]')
          ?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      }
    } catch (err: any) {
      console.error('Signup error:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const onLogin = async (data: loginSchemaType) => {
    setLoading(true);
    setError('');

    try {
      const response = await api.post<{ message: string; user: UserProfile }>('/auth/login', data);

      console.log('Login successful:', response);

      if (response.message === 'Authentication successful') {
        console.log('anshu');
        // Use navigate correctly - this should be a relative path or full URL
        navigate('/'); // or navigate to dashboard or whatever your home route is
      }
    } catch (err: any) {
      console.error('Login error:', err);
      if (err && err.message) {
        setError(err.message);
      } else {
        setError('Login failed. Please check your credentials and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-[20rem] sm:w-[26rem] md:w-[28rem] ">
          <div className="relative h-32 bg-gradient-to-r from-blue-500 to-blue-300">
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                      <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Brand Logo" />
                      <AvatarFallback>BR</AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Welcome to AviationX</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <CardHeader className="pt-16 text-center">
            <h1 className="text-2xl font-bold tracking-tight">Welcome to AviationX</h1>
            <p className="text-sm text-muted-foreground">Sign in to your account to continue</p>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <div className="h-[400px] relative">
                <TabsContent value="login" className="absolute w-full h-full overflow-y-auto">
                  <form className="space-y-4 w-full" onSubmit={handleLoginSubmit(onLogin)}>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        {...registerLogin('email')}
                        className="w-full"
                        disabled={loading}
                      />
                      {loginErrors.email && (
                        <p className="text-sm text-red-500">{loginErrors.email.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        {...registerLogin('password')}
                        className="w-full"
                        disabled={loading}
                      />
                      {loginErrors.password && (
                        <p className="text-sm text-red-500">{loginErrors.password.message}</p>
                      )}
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? 'Logging in...' : 'Login'}
                    </Button>
                  </form>
                </TabsContent>
                <TabsContent value="signup" className="absolute w-full h-full overflow-y-auto">
                  <form className="space-y-4 w-full" onSubmit={handleSignupSubmit(onSignup)}>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          placeholder="John"
                          {...registerSignup('firstName')}
                          className="w-full"
                          disabled={loading}
                        />
                        {signupErrors.firstName && (
                          <p className="text-sm text-red-500">{signupErrors.firstName.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          placeholder="Doe"
                          {...registerSignup('lastName')}
                          className="w-full"
                          disabled={loading}
                        />
                        {signupErrors.lastName && (
                          <p className="text-sm text-red-500">{signupErrors.lastName.message}</p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        {...registerSignup('email')}
                        className="w-full"
                        disabled={loading}
                      />
                      {signupErrors.email && (
                        <p className="text-sm text-red-500">{signupErrors.email.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Create a password"
                        {...registerSignup('password')}
                        className="w-full"
                        disabled={loading}
                      />
                      {signupErrors.password && (
                        <p className="text-sm text-red-500">{signupErrors.password.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mobile">Mobile</Label>
                      <Input
                        id="mobile"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        {...registerSignup('mobile')}
                        className="w-full"
                        disabled={loading}
                      />
                      {signupErrors.mobile && (
                        <p className="text-sm text-red-500">{signupErrors.mobile.message}</p>
                      )}
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? 'Creating Account...' : 'Create Account'}
                    </Button>
                  </form>
                </TabsContent>
              </div>

              {error && (
                <Alert variant="destructive" className="mt-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AuthForms;
