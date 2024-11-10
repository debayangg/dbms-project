'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { Plane } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const isAuth = pathname === '/login' || pathname === '/signup';

  if (isAuth) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex flex-1 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Plane className="h-6 w-6" />
            <span className="font-bold">Wanderlust</span>
          </Link>
          <nav className="flex items-center space-x-6">
            <Link href="/packages">
              <Button variant="ghost">Browse Packages</Button>
            </Link>
            <Link href="/my-packages">
              <Button variant="ghost">My Packages</Button>
            </Link>
            <ModeToggle />
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}