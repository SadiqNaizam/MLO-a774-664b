import React from 'react';
import { useParams } from 'react-router-dom'; // Assuming profile might be viewable by username
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import SamplePreviewCard from '@/components/SamplePreviewCard';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Link as LinkIcon, Edit, Settings, Mail } from 'lucide-react';

// Mock user data - in a real app, this would come from auth context or API
const userProfileData = {
  username: 'DevExtraordinaire',
  name: 'Alex Johnson',
  avatarUrl: 'https://picsum.photos/seed/alexj/200', // Using picsum for random but consistent avatar
  bio: 'Full-stack developer with a passion for React, Node.js, and building scalable web applications. Always learning and exploring new technologies. Cat person.',
  email: 'alex.johnson.dev@example.com',
  joinedDate: '2022-05-15T00:00:00Z',
  socialLinks: {
    github: 'https://github.com/alexj-dev',
    linkedin: 'https://linkedin.com/in/alexj-dev',
    website: 'https://alexj-dev.com'
  },
  submittedSamples: [
    { id: '301', title: 'Reusable Modal Component with Portals', description: 'A fully accessible and customizable modal component using React Portals.', tags: ['React', 'UI', 'Modal', 'Accessibility'], author: 'Alex Johnson', views: 1500, rating: 4.9, commentsCount: 25 },
    { id: '302', title: 'useDebounce Hook for Input Fields', description: 'Optimize performance by debouncing input changes with this simple custom hook.', tags: ['React', 'Hooks', 'Performance'], author: 'Alex Johnson', views: 980, rating: 4.7, commentsCount: 12 },
  ],
  bookmarkedSamples: [
    { id: '1', title: 'React Custom Hook for API Calls', description: 'A flexible custom hook for fetching data with loading and error states.', tags: ['React', 'Hooks', 'API'], author: 'DevUser1', views: 1200, rating: 4.8, commentsCount: 15 },
    { id: '104', title: 'Image Upload with Preview Component', description: 'React component for image uploading with client-side preview functionality.', tags: ['React', 'File Upload', 'UI'], author: 'MediaMogul', views: 500, rating: 4.4, commentsCount: 7 },
  ],
};


const UserProfilePage: React.FC = () => {
  // const { username } = useParams<{ username: string }>(); // If viewing other profiles
  console.log('UserProfilePage loaded for user:', userProfileData.username);
  // For this example, we'll assume it's the logged-in user's profile.

  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      <NavigationMenu />
      <main className="container mx-auto px-4 py-10 flex-grow">
        <Card className="mb-8">
          <CardHeader className="pb-4">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-primary">
                <AvatarImage src={userProfileData.avatarUrl} alt={userProfileData.name} />
                <AvatarFallback>{userProfileData.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle className="text-3xl md:text-4xl">{userProfileData.name}</CardTitle>
                <p className="text-muted-foreground">@{userProfileData.username}</p>
                <p className="text-sm text-muted-foreground mt-1">Joined: {new Date(userProfileData.joinedDate).toLocaleDateString()}</p>
                <div className="mt-3 flex items-center space-x-3">
                    {userProfileData.socialLinks.github && <a href={userProfileData.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><Github className="h-5 w-5" /></a>}
                    {userProfileData.socialLinks.linkedin && <a href={userProfileData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><Linkedin className="h-5 w-5" /></a>}
                    {userProfileData.socialLinks.website && <a href={userProfileData.socialLinks.website} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><LinkIcon className="h-5 w-5" /></a>}
                    <a href={`mailto:${userProfileData.email}`} className="text-muted-foreground hover:text-primary"><Mail className="h-5 w-5" /></a>
                </div>
              </div>
              <Button variant="outline"><Edit className="h-4 w-4 mr-2" /> Edit Profile</Button>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{userProfileData.bio}</p>
          </CardContent>
        </Card>

        <Tabs defaultValue="submitted" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 mb-6">
            <TabsTrigger value="submitted">My Submissions ({userProfileData.submittedSamples.length})</TabsTrigger>
            <TabsTrigger value="bookmarked">My Bookmarks ({userProfileData.bookmarkedSamples.length})</TabsTrigger>
            <TabsTrigger value="settings">Profile Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="submitted">
            {userProfileData.submittedSamples.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userProfileData.submittedSamples.map(sample => (
                  <SamplePreviewCard key={sample.id} {...sample} />
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">You haven't submitted any samples yet.</p>
            )}
          </TabsContent>

          <TabsContent value="bookmarked">
             {userProfileData.bookmarkedSamples.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userProfileData.bookmarkedSamples.map(sample => (
                    <SamplePreviewCard key={sample.id} {...sample} />
                    ))}
                </div>
                ) : (
                <p className="text-center text-muted-foreground py-8">You haven't bookmarked any samples yet.</p>
             )}
          </TabsContent>

          <TabsContent value="settings">
            <Card>
                <CardHeader>
                    <CardTitle>Profile Settings</CardTitle>
                    <CardDescription>Manage your account information and preferences.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Placeholder for settings form */}
                    <div>
                        <h4 className="font-medium mb-2">Account Information</h4>
                        <p className="text-sm text-muted-foreground">Update your name, email, or password.</p>
                        <Button variant="secondary" className="mt-2"><Settings className="h-4 w-4 mr-2" /> Manage Account</Button>
                    </div>
                     <div>
                        <h4 className="font-medium mb-2">Notification Preferences</h4>
                        <p className="text-sm text-muted-foreground">Control how you receive notifications from SamplePlatform.</p>
                        <Button variant="secondary" className="mt-2"><Settings className="h-4 w-4 mr-2" /> Notification Settings</Button>
                    </div>
                     <div>
                        <h4 className="font-medium mb-2">Privacy Settings</h4>
                        <p className="text-sm text-muted-foreground">Manage your profile visibility and data sharing options.</p>
                        <Button variant="secondary" className="mt-2"><Settings className="h-4 w-4 mr-2" /> Privacy Options</Button>
                    </div>
                </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default UserProfilePage;