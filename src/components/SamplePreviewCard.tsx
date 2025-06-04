import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Star, MessageSquare } from 'lucide-react'; // Example icons

interface SamplePreviewCardProps {
  id: string | number;
  title: string;
  description: string;
  tags?: string[];
  author?: string;
  views?: number;
  rating?: number; // e.g. 4.5
  commentsCount?: number;
  // Potentially an image or icon representing the sample type
  // imageUrl?: string;
}

const SamplePreviewCard: React.FC<SamplePreviewCardProps> = ({
  id,
  title,
  description,
  tags,
  author,
  views,
  rating,
  commentsCount,
}) => {
  console.log("Rendering SamplePreviewCard:", title);

  return (
    <Card className="w-full hover:shadow-md transition-shadow duration-200 flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg">
          <Link to={`/sample/${id}`} className="hover:underline">
            {title}
          </Link>
        </CardTitle>
        {author && <CardDescription>By {author}</CardDescription>}
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">{description}</p>
        {tags && tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {tags.slice(0, 3).map((tag) => ( // Show up to 3 tags
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
            {tags.length > 3 && <Badge variant="outline">+{tags.length - 3} more</Badge>}
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground flex justify-between items-center pt-4">
        <div className="flex items-center space-x-3">
          {typeof views === 'number' && (
            <span className="flex items-center"><Eye className="w-3.5 h-3.5 mr-1" /> {views}</span>
          )}
          {typeof rating === 'number' && (
            <span className="flex items-center"><Star className="w-3.5 h-3.5 mr-1 text-yellow-500 fill-yellow-500" /> {rating.toFixed(1)}</span>
          )}
          {typeof commentsCount === 'number' && (
             <span className="flex items-center"><MessageSquare className="w-3.5 h-3.5 mr-1" /> {commentsCount}</span>
          )}
        </div>
        <Link to={`/sample/${id}`}>
          <Button variant="outline" size="sm">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default SamplePreviewCard;