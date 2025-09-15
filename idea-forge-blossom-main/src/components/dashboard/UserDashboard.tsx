import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Edit3, Star as StarIcon } from "lucide-react";
import { mockStores, mockRatings } from "@/lib/mock-data";
import { StarRating } from "@/components/ui/star-rating";
import { User } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

interface UserDashboardProps {
  user: User;
}

export const UserDashboard = ({ user }: UserDashboardProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [userRatings, setUserRatings] = useState(mockRatings);
  const { toast } = useToast();

  const filteredStores = mockStores.filter(store =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getUserRatingForStore = (storeId: string) => {
    return userRatings.find(rating => rating.storeId === storeId && rating.userId === user.id);
  };

  const handleRatingSubmit = (storeId: string, rating: number) => {
    const existingRating = getUserRatingForStore(storeId);
    
    if (existingRating) {
      // Update existing rating
      setUserRatings(prev => 
        prev.map(r => 
          r.id === existingRating.id 
            ? { ...r, rating, createdAt: new Date().toISOString().split('T')[0] }
            : r
        )
      );
      toast({
        title: "Rating Updated",
        description: "Your rating has been successfully updated."
      });
    } else {
      // Add new rating
      const newRating = {
        id: Math.random().toString(36),
        userId: user.id,
        storeId,
        rating,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setUserRatings(prev => [...prev, newRating]);
      toast({
        title: "Rating Submitted", 
        description: "Thank you for your feedback!"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Store Directory</h1>
          <p className="text-muted-foreground">Discover and rate stores in your area</p>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search stores by name or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Store Listings */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredStores.map((store) => {
          const userRating = getUserRatingForStore(store.id);
          return (
            <Card key={store.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{store.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      {store.address}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Overall Rating */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <StarRating rating={store.averageRating} readonly size="sm" />
                      <span className="text-sm text-muted-foreground">
                        {store.averageRating.toFixed(1)} ({store.totalRatings} reviews)
                      </span>
                    </div>
                  </div>

                  {/* User's Rating */}
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Your Rating:</span>
                      {userRating && (
                        <Badge variant="outline" className="text-xs">
                          <Edit3 className="h-3 w-3 mr-1" />
                          Rated on {new Date(userRating.createdAt).toLocaleDateString()}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <StarRating
                        rating={userRating?.rating || 0}
                        onRatingChange={(rating) => handleRatingSubmit(store.id, rating)}
                        size="md"
                      />
                      {userRating && (
                        <span className="text-sm text-muted-foreground">
                          You rated: {userRating.rating}/5
                        </span>
                      )}
                    </div>
                    {!userRating && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Click stars to rate this store
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredStores.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No stores found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or browse all stores
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};