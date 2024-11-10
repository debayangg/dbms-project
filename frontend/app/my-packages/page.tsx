'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { Calendar, MapPin, Users } from 'lucide-react';

interface Booking {
    id: string;
    packageId: string;
    package: {
        title: string;
        description: string;
        destination: string;
        duration: number;
        price: number;
        maxParticipants: number;
        imageUrl: string;
    };
    bookingDate: string;
    status: 'confirmed' | 'pending' | 'cancelled';
}

export default function MyPackagesPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const { toast } = useToast();

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await fetch('/api/bookings/my');
            if (response.ok) {
                const data = await response.json();
                setBookings(data);
            } else {
                throw new Error('Failed to load bookings');
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to load your bookings. Please try again later.",
            });
        }
    };

    const handleCancelBooking = async (bookingId: string) => {
        try {
            const response = await fetch(`/api/bookings/${bookingId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                toast({
                    title: "Success",
                    description: "Booking cancelled successfully.",
                });
                fetchBookings();
            } else {
                throw new Error('Cancellation failed');
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to cancel the booking. Please try again.",
            });
        }
    };

    return (
        <div className="container py-10">
            <h1 className="text-3xl font-bold mb-8">My Travel Packages</h1>
            {bookings.length === 0 ? (
                <div className="text-center py-10">
                    <p className="text-muted-foreground">You haven't booked any packages yet.</p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {bookings.map((booking) => (
                        <Card key={booking.id}>
                            <div className="aspect-video w-full overflow-hidden">
                                <img
                                    src={booking.package.imageUrl}
                                    alt={booking.package.title}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle>{booking.package.title}</CardTitle>
                                        <CardDescription>{booking.package.description}</CardDescription>
                                    </div>
                                    <div className={`px-2 py-1 rounded-full text-sm ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                            booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'
                                        }`}>
                                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4" />
                                        <span>{booking.package.destination}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        <span>{booking.package.duration} days</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Users className="h-4 w-4" />
                                        <span>Max {booking.package.maxParticipants} people</span>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-sm text-muted-foreground">
                                            Booked on: {new Date(booking.bookingDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                    {booking.status !== 'cancelled' && (
                                        <Button
                                            variant="destructive"
                                            className="w-full mt-4"
                                            onClick={() => handleCancelBooking(booking.id)}
                                        >
                                            Cancel Booking
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
