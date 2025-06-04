import React from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import SamplePreviewCard from '@/components/SamplePreviewCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, ArrowRight } from 'lucide-react';

const placeholderSamples = [
  { id: '1', title: 'React Custom Hook for API Calls', description: 'A flexible custom hook for fetching data with loading and error states.', tags: ['React', 'Hooks', 'API'], author: 'DevUser1', views: 1200, rating: 4.8, commentsCount: 15 },
  { id: '2', title: 'Animated Sidebar Component with Framer Motion', description: 'Smoothly animated sidebar for navigation, built with Tailwind CSS and Framer Motion.', tags: ['React', 'Animation', 'UI'], author: 'CreativeCoder', views: 850, rating: 4.5, commentsCount: 9 },
  { id: '3', title: 'Efficient Data Table with Sorting and Pagination', description: 'A reusable data table component featuring client-side sorting and pagination for large datasets.', tags: ['React', 'Table', 'Performance'], author: 'DataGuru', views: 950, rating: 4.7, commentsCount: 12 },
];

const Homepage: React.FC = () => {
  console.log('Homepage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <NavigationMenu />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Discover & Share <span className="text-primary">React Code Samples</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Your go-to platform for high-quality, reusable React components and snippets.
              Find inspiration, solve problems, and contribute to the community.
            </p>
            <div className="max-w-xl mx-auto flex items-center space-x-2">
              <Input
                type="search"
                placeholder="Search for samples (e.g., 'custom hook', 'modal component')..."
                className="flex-grow text-base py-3 px-4 h-12"
                aria-label="Search samples"
              />
              <Button size="lg" className="h-12">
                <Search className="h-5 w-5 mr-2" /> Search
              </Button>
            </div>
          </div>
        </section>

        {/* Featured/Recent Samples Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold text-center mb-4">Trending Samples</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
              Explore some of the most popular and highly-rated code samples contributed by our community.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {placeholderSamples.map(sample => (
                <SamplePreviewCard key={sample.id} {...sample} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Button variant="outline" size="lg" asChild>
                <a href="/browse">
                  Browse All Samples <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-semibold mb-6">Ready to Contribute?</h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-8">
              Share your knowledge and help fellow developers. Submit your own React code samples today!
            </p>
            <Button size="lg" asChild>
              <a href="/submit">
                Submit Your Sample <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Homepage;