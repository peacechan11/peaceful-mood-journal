
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from '@/components/ui/table';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

type BlogPost = Tables<'blog_posts'>;

const BlogTable = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsLoading(true);
    
    try {
      const text = await file.text();
      const rows = text.split('\n');
      const headers = rows[0].split(',');
      
      // Validate expected headers
      const requiredHeaders = ['title', 'content', 'excerpt', 'tags'];
      const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));
      
      if (missingHeaders.length > 0) {
        toast.error(`Missing required headers: ${missingHeaders.join(', ')}`);
        return;
      }
      
      const parsedPosts = [];
      for (let i = 1; i < rows.length; i++) {
        if (!rows[i].trim()) continue;
        
        const values = rows[i].split(',');
        const post: Record<string, any> = {};
        
        headers.forEach((header, index) => {
          let value = values[index] || '';
          
          // Handle special fields
          if (header === 'tags' && value) {
            try {
              post[header] = value.startsWith('[') ? JSON.parse(value) : [value];
            } catch (e) {
              post[header] = [value];
            }
          } else {
            post[header] = value;
          }
        });
        
        // Add required fields
        post.author_id = user?.id || '';
        post.status = 'published';
        
        parsedPosts.push(post);
      }
      
      if (parsedPosts.length === 0) {
        toast.error('No valid posts found in CSV');
        return;
      }
      
      // Insert posts into database
      for (const post of parsedPosts) {
        const { error } = await supabase
          .from('blog_posts')
          .insert(post);
          
        if (error) {
          console.error('Error inserting post:', error);
          toast.error(`Error adding post: ${post.title}`);
        }
      }
      
      toast.success(`Successfully imported ${parsedPosts.length} posts`);
      loadBlogPosts();
    } catch (error) {
      console.error('Error parsing CSV:', error);
      toast.error('Error parsing CSV file');
    } finally {
      setIsLoading(false);
      // Reset the file input
      e.target.value = '';
    }
  };
  
  const loadBlogPosts = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) {
        throw error;
      }
      
      setBlogPosts(data || []);
    } catch (error) {
      console.error('Error loading blog posts:', error);
      toast.error('Failed to load blog posts');
    } finally {
      setIsLoading(false);
    }
  };
  
  const downloadCSV = () => {
    if (blogPosts.length === 0) {
      toast.error('No blog posts to export');
      return;
    }
    
    // Define columns to export
    const columns = ['title', 'content', 'excerpt', 'tags', 'status', 'created_at'];
    
    // Create CSV header row
    const header = columns.join(',');
    
    // Create CSV content
    const csvContent = blogPosts.map(post => {
      return columns.map(column => {
        const value = post[column as keyof BlogPost];
        
        // Handle special types like arrays
        if (Array.isArray(value)) {
          return JSON.stringify(value);
        }
        
        // Escape quotes and commas in string values
        if (typeof value === 'string') {
          return `"${value.replace(/"/g, '""')}"`;
        }
        
        return value || '';
      }).join(',');
    });
    
    // Combine header and rows
    const csv = [header, ...csvContent].join('\n');
    
    // Create download link
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'blog_posts.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('CSV file downloaded successfully');
  };

  // Load blog posts when component mounts
  useState(() => {
    loadBlogPosts();
  });
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Blog Posts</h2>
        <div className="flex space-x-2">
          <Button 
            variant="outline"
            onClick={downloadCSV}
            disabled={isLoading || blogPosts.length === 0}
          >
            Export to CSV
          </Button>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button disabled={isLoading}>
                Import data from CSV
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Import Blog Posts from CSV</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <p className="text-sm text-muted-foreground">
                  Upload a CSV file with the following columns: title, content, excerpt, tags
                </p>
                <input 
                  type="file" 
                  accept=".csv" 
                  onChange={handleFileChange}
                  className="w-full" 
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      {blogPosts.length === 0 ? (
        <div className="text-center py-10 border rounded-lg bg-gray-50 dark:bg-gray-900">
          <p className="text-xl font-medium text-gray-600 dark:text-gray-400">This table is empty</p>
          <p className="mt-2 text-muted-foreground">Add rows to your table to get started.</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Excerpt</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogPosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium">{post.title}</TableCell>
                <TableCell className="max-w-xs truncate">{post.excerpt}</TableCell>
                <TableCell>{post.status}</TableCell>
                <TableCell>
                  {post.created_at 
                    ? new Date(post.created_at).toLocaleDateString() 
                    : 'N/A'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default BlogTable;
