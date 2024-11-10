'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { Calendar, MapPin, Users } from 'lucide-react';

interface Package {
    id: string;
    title: string;
    description: string;
    destination: string;
    duration: number;
    price: number;
    maxParticipants: number;
    imageUrl: string;
}

export default function PackagesPage() {
    const [packages, setPackages] = useState<Package[]>([]);
    const { toast } = useToast();

    useEffect(() => {
        fetchPackages();
    }, []);

    const fetchPackages = async () => {
        try {
            const response = await fetch('/api/packages'); // Endpoint for fetching all packages
            if (response.ok) {
                const data = await response.json();
                setPackages(data);
            } else {
                throw new Error('Failed to load packages');
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to load travel packages.",
            });
        }
    };

    const handleBookPackage = async (packageId: string) => {
        try {
            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ packageId }),
            });

            if (response.ok) {
                toast({
                    title: "Success",
                    description: "Package booked successfully!",
                });
            } else {
                throw new Error('Booking failed');
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to book the package. Please try again.",
            });
        }
    };

    return (
        <div className="container py-10">
            <h1 className="text-3xl font-bold mb-8">Available Travel Packages</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {packages.map((pkg) => (
                    <Card key={pkg.id} className="overflow-hidden">
                        <div className="aspect-video w-full overflow-hidden">
                            <img
                                src={pkg.imageUrl}
                                alt={pkg.title}
                                className="object-cover w-full h-full transition-transform hover:scale-105"
                            />
                        </div>
                        <CardHeader>
                            <CardTitle>{pkg.title}</CardTitle>
                            <CardDescription>{pkg.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    <span>{pkg.destination}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <span>{pkg.duration} days</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="h-4 w-4" />
                                    <span>Max {pkg.maxParticipants} people</span>
                                </div>
                                <div className="text-2xl font-bold mt-4">
                                    ${pkg.price.toLocaleString()}
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                className="w-full"
                                onClick={() => handleBookPackage(pkg.id)}
                            >
                                Book Now
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
