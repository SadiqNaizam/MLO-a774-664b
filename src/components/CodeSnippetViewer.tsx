import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast'; // Assuming useToast hook exists

interface CodeSnippetViewerProps {
  code: string;
  language?: string; // e.g., 'javascript', 'python', 'tsx'
  fileName?: string;
  showLineNumbers?: boolean;
}

const CodeSnippetViewer: React.FC<CodeSnippetViewerProps> = ({
  code,
  language,
  fileName,
  showLineNumbers = true,
}) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  console.log("Rendering CodeSnippetViewer for language:", language);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast({ title: "Copied!", description: "Code snippet copied to clipboard." });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      toast({ title: "Error", description: "Failed to copy code.", variant: "destructive" });
    }
  };

  const lines = code.split('\\n');

  return (
    <div className="rounded-md border bg-muted/30 relative group">
      {fileName && (
        <div className="px-4 py-2 text-xs text-muted-foreground border-b">
          {fileName}
        </div>
      )}
      <Button
        variant="ghost"
        size="icon"
        onClick={handleCopy}
        className="absolute top-2 right-2 z-10 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Copy code"
      >
        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
      </Button>
      <ScrollArea className="max-h-[400px] p-4"> {/* Adjust max-h as needed */}
        <pre className="text-sm overflow-x-auto">
          <code className={`language-${language || 'plaintext'}`}>
            {showLineNumbers ? (
              <div className="flex">
                <div className="text-right select-none text-muted-foreground/50 pr-4">
                  {lines.map((_, index) => (
                    <div key={index}>{index + 1}</div>
                  ))}
                </div>
                <div>
                  {lines.map((line, index) => (
                    <div key={index}>{line}</div>
                  ))}
                </div>
              </div>
            ) : (
              code
            )}
          </code>
        </pre>
      </ScrollArea>
      {language && (
        <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-background/50 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
          {language}
        </div>
      )}
    </div>
  );
};

export default CodeSnippetViewer;