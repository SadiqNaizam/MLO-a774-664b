import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const sampleFormSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters long.").max(150, "Title cannot exceed 150 characters."),
  description: z.string().min(50, "Description must be at least 50 characters long.").max(2000, "Description cannot exceed 2000 characters."),
  code: z.string().min(20, "Code snippet must be at least 20 characters long."),
  tags: z.string().refine(value => value.split(',').every(tag => tag.trim().length > 0 && tag.trim().length <= 20), {
    message: "Tags must be comma-separated, each tag 1-20 characters.",
  }).optional(),
  repositoryUrl: z.string().url("Must be a valid URL.").optional().or(z.literal('')),
  demoUrl: z.string().url("Must be a valid URL.").optional().or(z.literal('')),
});

type SampleFormValues = z.infer<typeof sampleFormSchema>;

const SubmitSamplePage: React.FC = () => {
  console.log('SubmitSamplePage loaded');
  const [submissionStatus, setSubmissionStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
  const [submissionMessage, setSubmissionMessage] = React.useState('');

  const form = useForm<SampleFormValues>({
    resolver: zodResolver(sampleFormSchema),
    defaultValues: {
      title: '',
      description: '',
      code: '',
      tags: '',
      repositoryUrl: '',
      demoUrl: '',
    },
  });

  const onSubmit = async (data: SampleFormValues) => {
    console.log('Submitting sample:', data);
    // Simulate API call
    setSubmissionStatus('idle'); // Reset for new submission attempt
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate success/error
    if (Math.random() > 0.2) { // 80% success rate
        setSubmissionStatus('success');
        setSubmissionMessage('Your sample has been submitted successfully! It will be reviewed shortly.');
        form.reset();
    } else {
        setSubmissionStatus('error');
        setSubmissionMessage('There was an error submitting your sample. Please try again.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/30">
      <NavigationMenu />
      <main className="container mx-auto px-4 py-10 flex-grow">
        <Card className="max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle className="text-3xl">Submit New Code Sample</CardTitle>
                <CardDescription>Share your React wisdom with the community. Fill out the form below to submit your code snippet or component.</CardDescription>
            </CardHeader>
            <CardContent>
                {submissionStatus === 'success' && (
                <Alert variant="default" className="mb-6 bg-green-50 border-green-300 text-green-700">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <AlertTitle>Success!</AlertTitle>
                    <AlertDescription>{submissionMessage}</AlertDescription>
                </Alert>
                )}
                {submissionStatus === 'error' && (
                <Alert variant="destructive" className="mb-6">
                    <AlertTriangle className="h-5 w-5" />
                    <AlertTitle>Submission Failed</AlertTitle>
                    <AlertDescription>{submissionMessage}</AlertDescription>
                </Alert>
                )}

                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Sample Title</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., Custom Hook for Theme Toggling" {...field} />
                        </FormControl>
                        <FormDescription>A clear and concise title for your sample.</FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                    />

                    <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Detailed Description</FormLabel>
                        <FormControl>
                            <Textarea
                            placeholder="Explain what your code does, how to use it, and any notable features. Markdown is supported."
                            className="min-h-[150px]"
                            {...field}
                            />
                        </FormControl>
                        <FormDescription>Provide a thorough explanation. Good descriptions help others understand and use your sample.</FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                    />

                    <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Code Snippet</FormLabel>
                        <FormControl>
                            <Textarea
                            placeholder="// Paste your React code here (JSX, TSX, JS)"
                            className="min-h-[250px] font-mono text-sm"
                            {...field}
                            />
                        </FormControl>
                        <FormDescription>The actual code for your sample. Ensure it's well-formatted.</FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                    />

                    <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Tags</FormLabel>
                        <FormControl>
                            <Input placeholder="e.g., hooks, ui, animation, typescript" {...field} />
                        </FormControl>
                        <FormDescription>Comma-separated list of relevant tags (e.g., React, Hooks, UI, API).</FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    
                    <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                        control={form.control}
                        name="repositoryUrl"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Repository URL (Optional)</FormLabel>
                            <FormControl>
                                <Input placeholder="https://github.com/your-repo" {...field} />
                            </FormControl>
                            <FormDescription>Link to a GitHub repo if applicable.</FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                        />

                        <FormField
                        control={form.control}
                        name="demoUrl"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Live Demo URL (Optional)</FormLabel>
                            <FormControl>
                                <Input placeholder="https://your-live-demo.com" {...field} />
                            </FormControl>
                            <FormDescription>Link to a live demo if available.</FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>

                    <Button type="submit" size="lg" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Submitting..." : "Submit Sample"}
                    </Button>
                </form>
                </Form>
            </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default SubmitSamplePage;