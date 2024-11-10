'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from "@/hooks/use-toast";
import { Plane } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Send request to the backend's login route
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                // Parse response containing the token and role
                const { token, role } = await response.json();

                // Store token (in local storage or cookie) for later authenticated requests
                localStorage.setItem('token', token);

                // Redirect based on user role
                if (role === 'admin') {
                    router.push('/admin/packages'); // Redirect to admin page if role is admin
                } else {
                    router.push('/packages'); // Redirect to user packages page
                }
            } else {
                // Show error message when login fails
                toast({
                    variant: "destructive",
                    title: "Login failed",
                    description: "Please check your credentials and try again.",
                });
            }
        } catch (error) {
            // Show a general error message in case of any issues with the fetch request
            toast({
                variant: "destructive",
                title: "Error",
                description: "An error occurred. Please try again later.",
            });
        }
    };

    return (
        <div className="container relative flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <div className="flex flex-col space-y-2 text-center">
                    <div className="flex items-center justify-center">
                        <Plane className="h-8 w-8" />
                    </div>
                    <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
                    <p className="text-sm text-muted-foreground">
                        Enter your email to sign in to your account
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        Sign In
                    </Button>
                </form>
                <div className="text-center text-sm">
                    Don't have an account?{' '}
                    <Link href="/signup" className="underline">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
}
