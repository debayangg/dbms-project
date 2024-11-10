import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Compass, Map, Plane } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Discover Your Next Adventure
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Explore curated travel packages and create unforgettable memories around the world.
              </p>
            </div>
            <div className="space-x-4">
              <Link href="/packages">
                <Button size="lg" className="h-11">
                  Browse Packages
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="outline" size="lg" className="h-11">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
            <div className="flex flex-col items-center space-y-4">
              <Compass className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold">Curated Experiences</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Hand-picked destinations and expertly crafted itineraries.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <Map className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold">Guided Adventures</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                Professional guides and local experts at every destination.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <Plane className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-bold">Seamless Travel</h3>
              <p className="text-center text-gray-500 dark:text-gray-400">
                All-inclusive packages with flights, hotels, and activities.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}