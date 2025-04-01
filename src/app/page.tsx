'use client';

import { useState } from 'react';
import AuthImage from '@/app/components/ui/AuthImage';
import LogoImage from '@/app/assets/images/Group 394.png';
import { Button } from './components/ui/Buttons';
import { Input } from './components/ui/Input';
import { Label } from './components/ui/Label';
import { Link } from './components/ui/Link';
import Image from 'next/image';
import { useMutation } from '@tanstack/react-query';
import apiClient from './lib/apiClient';
import useAuthStore from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { User } from '@/store/useAuthStore';

export default function Home() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutate, error } = useMutation({
    mutationFn: (credentials: { email: string; password: string }) =>
      apiClient.post('/api/Auth/login', credentials).then((response) => response.data),
    onSuccess: (data: { data: { accessToken: string; refreshToken: string; user: User }}) => {
      const { accessToken, refreshToken, user } = data.data;
      login(accessToken, refreshToken, user);
      router.push('/dashboard');
    },
    onError: (error: Error) => {
      console.error('Login failed', error);
    },
  });

  const validateEmail = (email: string) => {
    if (!email) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please enter a valid email';
    return '';
  };

  const validatePassword = (password: string) => {
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    return '';
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setErrors({...errors, email: validateEmail(value)});
    } else if (name === 'password') {
      setErrors({...errors, password: validatePassword(value)});
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const credentials = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    // Validate inputs
    const emailError = validateEmail(credentials.email);
    const passwordError = validatePassword(credentials.password);

    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError
      });
      setIsSubmitting(false);
      return;
    }

    mutate(credentials, {
      onSettled: () => setIsSubmitting(false)
    });
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Login Form */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col">
          <div className="">
            <Image
              src={LogoImage}
              alt="Somo logo"
              width={130}
              height={130}
              className="mx-auto -mt-32 ml-9"
              priority
            />
          </div>
          <h2 className="mt-4 ml-10 text-left text-2xl font-bold text-gray-900">Login</h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-3 px-4 sm:rounded-lg sm:px-10">
            <form onSubmit={handleSubmit}>
              <div className="">
                <Label htmlFor="email">Email</Label>
                <div className="mt-3 text-black">
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                    onBlur={handleBlur}
                    onChange={() => setErrors({...errors, email: undefined})}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="mt-3 text-black">
                <Label htmlFor="password">Password</Label>
                <div className="mt-2">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    onBlur={handleBlur}
                    onChange={() => setErrors({...errors, password: undefined})}
                  />
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>
              </div>

              <div className="flex items-center justify-end">
                <div className="text-sm mt-4 mb-4">
                  <Link href="#">Forgot Password?</Link>
                </div>
              </div>

              <div>
                <Button 
                  type="submit" 
                  className="text-white w-full bg-primary hover:bg-secondary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Signing In...' : 'Sign In'}
                </Button>
              </div>
              {error && <p className="text-red-500 text-sm mt-2">{error.message}</p>}
            </form>
          </div>
        </div>
      </div>
      <AuthImage />
    </div>
  );
}