import React from 'react';
import { useParams } from 'react-router-dom';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import CodeSnippetViewer from '@/components/CodeSnippetViewer';
import RatingControl from '@/components/RatingControl';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, ThumbsUp, Bookmark, Edit3, Share2 } from 'lucide-react';

const sampleData = {
  id: '1',
  title: 'Advanced React Custom Hook for Data Fetching',
  description: 'This comprehensive custom hook simplifies data fetching in React applications. It handles loading states, error catching, and caching strategies. Includes examples for GET, POST, PUT, and DELETE requests. Built with TypeScript for type safety. Easily extensible for specific API needs like authentication headers.',
  longDescription: `
<p>The <code>useFetcher</code> hook is designed to abstract away the complexities of asynchronous data fetching operations. It provides a clean and reusable interface for components that need to interact with APIs.</p>
<h4 class="font-semibold mt-4 mb-2">Key Features:</h4>
<ul class="list-disc list-inside space-y-1 text-sm">
  <li>Handles loading, success, and error states automatically.</li>
  <li>Supports GET, POST, PUT, DELETE HTTP methods.</li>
  <li>Optional caching mechanism (in-memory, configurable duration).</li>
  <li>TypeScript support for robust type checking.</li>
  <li>Easy to integrate and customize.</li>
</ul>
<h4 class="font-semibold mt-4 mb-2">Usage Example:</h4>
<p>Import the hook and use it in your component like so:</p>
<pre><code class="language-javascript">
const { data, loading, error, fetchData } = useFetcher();

useEffect(() => {
  fetchData('/api/users');
}, [fetchData]);
</code></pre>
  `,
  code: \`
import { useState, useCallback, useEffect } from 'react';

interface FetcherOptions<TData> {
  initialUrl?: string;
  initialOptions?: RequestInit;
  manual?: boolean; // If true, won't fetch on mount
  cacheKey?: string;
  cacheDuration?: number; // in milliseconds
}

interface FetcherState<TData> {
  data: TData | null;
  loading: boolean;
  error: Error | null;
}

// Simple in-memory cache
const cache = new Map<string, { data: any; timestamp: number }>();

function useFetcher<TData = any>(options: FetcherOptions<TData> = {}) {
  const { initialUrl, initialOptions, manual = false, cacheKey, cacheDuration = 5 * 60 * 1000 } = options;

  const [state, setState] = useState<FetcherState<TData>>({
    data: null,
    loading: !manual && !!initialUrl,
    error: null,
  });

  const fetchData = useCallback(async (url?: string, fetchOptions?: RequestInit) => {
    const currentUrl = url || initialUrl;
    if (!currentUrl) {
      console.warn("useFetcher: No URL provided to fetch.");
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    // Check cache
    if (cacheKey) {
      const cachedItem = cache.get(cacheKey);
      if (cachedItem && (Date.now() - cachedItem.timestamp < cacheDuration)) {
        setState({ data: cachedItem.data as TData, loading: false, error: null });
        return;
      }
    }

    try {
      const response = await fetch(currentUrl, { ...initialOptions, ...fetchOptions });
      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }
      const result = await response.json();
      setState({ data: result as TData, loading: false, error: null });

      // Update cache
      if (cacheKey) {
        cache.set(cacheKey, { data: result, timestamp: Date.now() });
      }

    } catch (err) {
      setState({ data: null, loading: false, error: err as Error });
    }
  }, [initialUrl, initialOptions, cacheKey, cacheDuration]);

  useEffect(() => {
    if (!manual && initialUrl) {
      fetchData();
    }
  }, [manual, initialUrl, fetchData]);

  return { ...state, fetchData, revalidate: () => fetchData() };
}

export default useFetcher;
  \`,
  language: 'typescript',
  fileName: 'useFetcher.ts',
  author: { name: 'Jane Developer', avatarUrl: 'https://i.pravatar.cc/150?u=jane_dev', bio: 'Senior React Developer passionate about clean code and reusable components.' },
  tags: ['React', 'Hooks', 'API', 'TypeScript', 'Fetching', 'Custom Hook'],
  rating: 4.8,
  totalRatings: 125,
  views: 2300,
  commentsCount: 28,
  createdAt: '2023-10-26T10:00:00Z',
  updatedAt: '2023-11-05T14:30:00Z',
  relatedSamples: [
    { id: '201', title: 'useLocalStorage Hook', author: 'DevUser1' },
    { id: '202', title: 'Simple Modal Component', author: 'UIQueen' },
  ],
  faq: [
    { q: 'Can I use this with GraphQL?', a: 'While primarily designed for REST APIs, you could adapt the fetching logic for GraphQL queries with some modifications to how the request body and headers are handled.' },
    { q: 'How do I handle authentication?', a: 'You can pass authentication tokens in the \`fetchOptions\` (e.g., in headers). For more complex scenarios, consider wrapping this hook with an auth-aware layer.' },
  ],
  comments: [
    { id: 'c1', user: { name: 'CodeNinja', avatarUrl: 'https://i.pravatar.cc/150?u=codeninja' }, text: 'This is amazing! Saved me so much time. Thanks for sharing!', date: '2023-10-27T12:00:00Z', likes: 15 },
    { id: 'c2', user: { name: 'ReactFan', avatarUrl: 'https://i.pravatar.cc/150?u=reactfan' }, text: 'Great hook. One suggestion: add support for AbortController to cancel requests?', date: '2023-10-28T09:30:00Z', likes: 8 },
  ],
};


const SampleDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  console.log('SampleDetailPage loaded for ID:', id);
  // In a real app, you would fetch sampleData based on 'id'

  if (!sampleData) return <div>Loading sample or sample not found...</div>;

  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      <NavigationMenu />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink href="/browse">Browse Samples</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>{sampleData.title.substring(0,30)}...</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl">{sampleData.title}</CardTitle>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-2">
                   <div className="flex items-center space-x-2">
                     <Avatar className="h-8 w-8">
                       <AvatarImage src={sampleData.author.avatarUrl} alt={sampleData.author.name} />
                       <AvatarFallback>{sampleData.author.name.substring(0,2).toUpperCase()}</AvatarFallback>
                     </Avatar>
                     <span>By {sampleData.author.name}</span>
                   </div>
                   <span>|</span>
                   <span>{new Date(sampleData.createdAt).toLocaleDateString()}</span>
                   <span>|</span>
                   <span>{sampleData.views} views</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {sampleData.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-6" dangerouslySetInnerHTML={{ __html: sampleData.longDescription || sampleData.description }} />
                <div className="flex items-center justify-between">
                    <RatingControl initialRating={sampleData.rating} readOnly size="md" />
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm"><Bookmark className="h-4 w-4 mr-2" /> Bookmark</Button>
                        <Button variant="outline" size="sm"><Share2 className="h-4 w-4 mr-2" /> Share</Button>
                    </div>
                </div>
              </CardContent>
            </Card>

            <CodeSnippetViewer 
              code={sampleData.code} 
              language={sampleData.language} 
              fileName={sampleData.fileName}
              showLineNumbers
            />
            
            <Tabs defaultValue="comments" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-3">
                <TabsTrigger value="comments">Comments ({sampleData.commentsCount})</TabsTrigger>
                <TabsTrigger value="faq">FAQ ({sampleData.faq.length})</TabsTrigger>
                <TabsTrigger value="details">More Details</TabsTrigger>
              </TabsList>
              <TabsContent value="comments" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Community Discussion</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {sampleData.comments.map(comment => (
                      <div key={comment.id} className="flex space-x-3">
                        <Avatar>
                          <AvatarImage src={comment.user.avatarUrl} alt={comment.user.name} />
                          <AvatarFallback>{comment.user.name.substring(0,1)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold">{comment.user.name}</span>
                            <span className="text-xs text-muted-foreground">{new Date(comment.date).toLocaleDateString()}</span>
                          </div>
                          <p className="text-sm mt-1">{comment.text}</p>
                          <Button variant="ghost" size="sm" className="mt-1 text-muted-foreground px-1 h-auto">
                            <ThumbsUp className="h-3.5 w-3.5 mr-1" /> {comment.likes}
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Separator className="my-6" />
                    <div>
                      <Label htmlFor="new-comment" className="font-semibold mb-2 block">Add your comment</Label>
                      <Textarea id="new-comment" placeholder="Write your thoughts, questions, or feedback..." className="min-h-[100px]" />
                      <Button className="mt-3">Post Comment</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="faq" className="mt-6">
                <Card>
                  <CardHeader><CardTitle>Frequently Asked Questions</CardTitle></CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {sampleData.faq.map((item, index) => (
                        <AccordionItem value={`item-${index}`} key={index}>
                          <AccordionTrigger>{item.q}</AccordionTrigger>
                          <AccordionContent>{item.a}</AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>
               <TabsContent value="details" className="mt-6">
                 <Card>
                    <CardHeader><CardTitle>Additional Details</CardTitle></CardHeader>
                    <CardContent className="text-sm space-y-2">
                        <p><strong>Last Updated:</strong> {new Date(sampleData.updatedAt).toLocaleString()}</p>
                        <p><strong>License:</strong> MIT (example)</p>
                        <p><strong>Dependencies:</strong> react, typescript (example)</p>
                        <Button variant="link" className="p-0 h-auto"><a href="#">Report this sample</a></Button>
                    </CardContent>
                 </Card>
               </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar Area */}
          <aside className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">About the Author</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center text-center">
                <Avatar className="h-20 w-20 mb-3">
                  <AvatarImage src={sampleData.author.avatarUrl} alt={sampleData.author.name} />
                  <AvatarFallback>{sampleData.author.name.substring(0,2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <h3 className="font-semibold">{sampleData.author.name}</h3>
                <p className="text-xs text-muted-foreground mb-2">Joined {new Date(sampleData.createdAt).getFullYear()}</p>
                <p className="text-sm text-muted-foreground">{sampleData.author.bio}</p>
                <Button variant="secondary" className="mt-4 w-full" asChild><a href={`/profile/${sampleData.author.name.toLowerCase().replace(' ','-')}`}>View Profile</a></Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Related Samples</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {sampleData.relatedSamples.map(sample => (
                    <li key={sample.id} className="text-sm">
                      <a href={`/sample/${sample.id}`} className="text-primary hover:underline">{sample.title}</a>
                      <p className="text-xs text-muted-foreground">by {sample.author}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SampleDetailPage;