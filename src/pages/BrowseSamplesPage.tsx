import React, { useState } from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import SamplePreviewCard from '@/components/SamplePreviewCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ListFilter, Search } from 'lucide-react';

const placeholderSamples = [
  { id: '101', title: 'Advanced Form Handling with Zod', description: 'Robust form validation and management using React Hook Form and Zod.', tags: ['React', 'Forms', 'Validation', 'Zod'], author: 'FormMaster', views: 750, rating: 4.9, commentsCount: 22 },
  { id: '102', title: 'Context API State Management Example', description: 'A clear example of using React Context API for global state management.', tags: ['React', 'State Management', 'Context API'], author: 'StateSavvy', views: 620, rating: 4.6, commentsCount: 18 },
  { id: '103', title: 'Responsive Navbar with Tailwind CSS', description: 'A fully responsive navigation bar component styled with Tailwind CSS.', tags: ['React', 'UI', 'TailwindCSS', 'Responsive'], author: 'TailwindFan', views: 900, rating: 4.7, commentsCount: 11 },
  { id: '104', title: 'Image Upload with Preview Component', description: 'React component for image uploading with client-side preview functionality.', tags: ['React', 'File Upload', 'UI'], author: 'MediaMogul', views: 500, rating: 4.4, commentsCount: 7 },
  { id: '105', title: 'Draggable Kanban Board', description: 'A simple Kanban board with draggable cards for task management.', tags: ['React', 'Drag & Drop', 'UI'], author: 'ProjectPro', views: 1100, rating: 4.8, commentsCount: 25 },
  { id: '106', title: 'Infinite Scroll Component', description: 'Implement infinite scrolling for lists of data with React.', tags: ['React', 'Performance', 'UI'], author: 'ScrollKing', views: 800, rating: 4.5, commentsCount: 14 },
];

const categories = [
  { id: 'hooks', label: 'Hooks' },
  { id: 'ui-components', label: 'UI Components' },
  { id: 'state-management', label: 'State Management' },
  { id: 'forms', label: 'Forms & Validation' },
  { id: 'animation', label: 'Animation' },
  { id: 'api-integration', label: 'API Integration' },
];

const sortOptions = [
  { value: 'popularity', label: 'Popularity' },
  { value: 'newest', label: 'Newest First' },
  { value: 'rating', label: 'Highest Rated' },
];

const BrowseSamplesPage: React.FC = () => {
  console.log('BrowseSamplesPage loaded');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('popularity');
  const [currentPage, setCurrentPage] = useState(1);
  const samplesPerPage = 6; // Or make this configurable

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };
  
  // Dummy filtered and sorted samples
  const filteredSamples = placeholderSamples.filter(sample => 
    sample.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    sample.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (selectedCategories.length > 0 ? sample.tags?.some(tag => selectedCategories.includes(tag.toLowerCase().replace(/\s+/g, '-'))) : true)
  );
  // Dummy sort
  const sortedSamples = [...filteredSamples].sort((a, b) => {
    if (sortBy === 'newest') return (b.id as any) - (a.id as any); // Assuming higher ID is newer
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    return (b.views || 0) - (a.views || 0); // Default popularity
  });

  const indexOfLastSample = currentPage * samplesPerPage;
  const indexOfFirstSample = indexOfLastSample - samplesPerPage;
  const currentSamples = sortedSamples.slice(indexOfFirstSample, indexOfLastSample);
  const totalPages = Math.ceil(sortedSamples.length / samplesPerPage);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <NavigationMenu />
      <div className="container mx-auto px-4 flex-grow py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <Sidebar>
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold mb-3 text-foreground">Search Filters</h4>
                <Input 
                  placeholder="Keyword in filters..." 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)} 
                  className="h-9"
                />
              </div>
              <Separator />
              <div>
                <h4 className="text-sm font-semibold mb-3 text-foreground">Categories</h4>
                <div className="space-y-2">
                  {categories.map(category => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={category.id} 
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={() => handleCategoryChange(category.id)}
                      />
                      <Label htmlFor={category.id} className="text-sm font-normal">{category.label}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <Separator />
              <div>
                <h4 className="text-sm font-semibold mb-3 text-foreground">Sort By</h4>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full h-9">
                    <SelectValue placeholder="Sort by..." />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
               <Separator />
               <div>
                <h4 className="text-sm font-semibold mb-3 text-foreground">Rating</h4>
                 <RadioGroup defaultValue="any" className="space-y-1">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="any" id="r-any" />
                        <Label htmlFor="r-any" className="font-normal">Any</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="4star" id="r-4star" />
                        <Label htmlFor="r-4star" className="font-normal">4 stars & up</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="3star" id="r-3star" />
                        <Label htmlFor="r-3star" className="font-normal">3 stars & up</Label>
                    </div>
                </RadioGroup>
               </div>
            </div>
          </Sidebar>

          <main className="flex-1">
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Code Samples ({sortedSamples.length})</h1>
                {/* Mobile filter trigger can be added here if Sidebar is collapsible */}
            </div>
            {currentSamples.length > 0 ? (
              <div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-6">
                {currentSamples.map(sample => (
                  <SamplePreviewCard key={sample.id} {...sample} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Samples Found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
              </div>
            )}
            
            {totalPages > 1 && (
              <Pagination className="mt-12">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.max(1, p - 1)); }} aria-disabled={currentPage === 1} />
                  </PaginationItem>
                  {[...Array(totalPages)].map((_, i) => (
                     <PaginationItem key={i}>
                        <PaginationLink href="#" isActive={currentPage === i + 1} onClick={(e) => {e.preventDefault(); setCurrentPage(i + 1)}}>
                            {i + 1}
                        </PaginationLink>
                    </PaginationItem>
                  ))}
                   {totalPages > 5 && currentPage < totalPages - 2 && <PaginationEllipsis />}
                  <PaginationItem>
                    <PaginationNext href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(p => Math.min(totalPages, p + 1)); }} aria-disabled={currentPage === totalPages} />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BrowseSamplesPage;