import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { Listing } from '../types/auth';
import ListingCard from '../components/ListingCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

// Mock function to fetch user listings - replace with actual API call
const fetchUserListings = async (userId: string): Promise<Listing[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          title: 'Sample Listing',
          description: 'This is a sample listing',
          price: 100,
          category: 'electronics',
          subcategory: 'phones',
          condition: 'new',
          images: ['/placeholder.jpg'],
          location: {
            address: 'Kingstown, St. Vincent',
          },
          userId,
          createdAt: new Date(),
          updatedAt: new Date(),
          status: 'active',
          featured: false,
          views: 0,
          favorites: 0,
        },
      ]);
    }, 1000);
  });
};

export default function Profile() {
  const { user, isAuthenticated, login } = useAuth();
  const [activeTab, setActiveTab] = useState('active');

  const { data: listings, isLoading } = useQuery({
    queryKey: ['userListings', user?.id],
    queryFn: () => fetchUserListings(user?.id!),
    enabled: !!user?.id,
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Sign in to view your profile</h1>
        <button
          onClick={() => login()}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center space-x-4">
          {user?.picture ? (
            <img
              src={user.picture}
              alt={user.name || 'Profile'}
              className="w-20 h-20 rounded-full"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-500">
                {user?.name?.[0] || user?.email?.[0]}
              </span>
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold">{user?.name || 'User'}</h1>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Listings Tabs */}
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="active">Active Listings</TabsTrigger>
          <TabsTrigger value="sold">Sold</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-6">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : listings?.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No active listings</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings?.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="sold">
          <div className="text-center py-8">
            <p className="text-gray-600">No sold listings</p>
          </div>
        </TabsContent>

        <TabsContent value="expired">
          <div className="text-center py-8">
            <p className="text-gray-600">No expired listings</p>
          </div>
        </TabsContent>

        <TabsContent value="draft">
          <div className="text-center py-8">
            <p className="text-gray-600">No draft listings</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
