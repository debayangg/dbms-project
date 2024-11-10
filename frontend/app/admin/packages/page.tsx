'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminPackagesPage() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        destination: '',
        duration: '',
        price: '',
        maxParticipants: '',
        imageUrl: '',
    });
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Send POST request to the API endpoint
            const response = await fetch('/api/admin/packages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Success: Show toast and reset form
                toast({
                    title: "Success",
                    description: "Package created successfully!",
                });

                // Reset form after successful submission
                setFormData({
                    title: '',
                    description: '',
                    destination: '',
                    duration: '',
                    price: '',
                    maxParticipants: '',
                    imageUrl: '',
                });
            } else {
                throw new Error('Failed to create package');
            }
        } catch (error) {
            // Error: Show error toast
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to create the package. Please try again.",
            });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="container py-10">
            <h1 className="text-3xl font-bold mb-8">Create New Travel Package</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Package Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="destination">Destination</Label>
                                <Input
                                    id="destination"
                                    name="destination"
                                    value={formData.destination}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="duration">Duration (days)</Label>
                                <Input
                                    id="duration"
                                    name="duration"
                                    type="number"
                                    value={formData.duration}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="price">Price ($)</Label>
                                <Input
                                    id="price"
                                    name="price"
                                    type="number"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="maxParticipants">Max Participants</Label>
                                <Input
                                    id="maxParticipants"
                                    name="maxParticipants"
                                    type="number"
                                    value={formData.maxParticipants}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="imageUrl">Image URL</Label>
                            <Input
                                id="imageUrl"
                                name="imageUrl"
                                type="url"
                                value={formData.imageUrl}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            Create Package
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
