import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, TrendingUp, Users, Calendar } from "lucide-react";
import { mockStores, mockRatings, mockUsers } from "@/lib/mock-data";
import { StarRating } from "@/components/ui/star-rating";
import { User } from "@/lib/auth";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface StoreOwnerDashboardProps {
  user: User;
}

export const StoreOwnerDashboard = ({ user }: StoreOwnerDashboardProps) => {
  // Find the store owned by this user
  const ownedStore = mockStores.find(store => store.ownerId === user.id);
  
  // Get ratings for this store
  const storeRatings = mockRatings.filter(rating => rating.storeId === ownedStore?.id);
  
  // Get users who rated this store
  const ratingUsers = storeRatings.map(rating => {
    const ratingUser = mockUsers.find(u => u.id === rating.userId);
    return {
      ...rating,
      userName: ratingUser?.name || 'Anonymous User',
      userEmail: ratingUser?.email || 'N/A'
    };
  });

  if (!ownedStore) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="text-center py-12">
            <Star className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No Store Found</h3>
            <p className="text-muted-foreground">
              You don't have a registered store yet. Contact admin to register your store.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{ownedStore.name}</h1>
          <p className="text-muted-foreground">Store Owner Dashboard</p>
        </div>
        <Badge variant="secondary" className="text-sm">
          Store Owner
        </Badge>
      </div>

      {/* Store Overview Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl font-bold">{ownedStore.averageRating.toFixed(1)}</span>
              <StarRating rating={ownedStore.averageRating} readonly size="sm" />
            </div>
            <p className="text-xs text-muted-foreground">
              Out of 5.0 stars
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Ratings</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ownedStore.totalRatings}</div>
            <p className="text-xs text-muted-foreground">
              +{storeRatings.length} this month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Reviewers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ratingUsers.length}</div>
            <p className="text-xs text-muted-foreground">
              Customers who rated you
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Store Information */}
      <Card>
        <CardHeader>
          <CardTitle>Store Information</CardTitle>
          <CardDescription>Your registered store details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Store Name</label>
              <p className="text-sm">{ownedStore.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Email</label>
              <p className="text-sm">{ownedStore.email}</p>
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-muted-foreground">Address</label>
              <p className="text-sm">{ownedStore.address}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Ratings */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Ratings</CardTitle>
          <CardDescription>
            Recent ratings from customers ({ratingUsers.length} total)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {ratingUsers.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ratingUsers.map((rating) => (
                  <TableRow key={rating.id}>
                    <TableCell className="font-medium">{rating.userName}</TableCell>
                    <TableCell>{rating.userEmail}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <StarRating rating={rating.rating} readonly size="sm" />
                        <span className="text-sm text-muted-foreground">
                          {rating.rating}/5
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {new Date(rating.createdAt).toLocaleDateString()}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8">
              <Star className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No Ratings Yet</h3>
              <p className="text-muted-foreground">
                Your store hasn't received any ratings from customers yet.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};