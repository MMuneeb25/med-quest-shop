import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Skeleton } from '@/components/ui/skeleton';

interface BlogDetail {
  id: string;
  title: string;
  content: string;
  image: string;
  author: string;
  date: string;
}

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<BlogDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockBlog: BlogDetail = {
      id: id || '1',
      title: 'The Importance of Vitamin D for Immune Health',
      content: `
        <p>Vitamin D is one of the most important nutrients for maintaining a healthy immune system. Recent research has shown that adequate vitamin D levels can help protect against various infections and diseases.</p>
        
        <h2>Why Vitamin D Matters</h2>
        <p>Your body produces vitamin D when your skin is exposed to sunlight. However, many people don't get enough sun exposure, especially during winter months or if they live in northern climates.</p>
        
        <h2>Benefits for Immune Health</h2>
        <p>Studies have demonstrated that vitamin D plays several crucial roles in immune function:</p>
        <ul>
          <li>Helps activate immune cells</li>
          <li>Reduces inflammation</li>
          <li>Supports respiratory health</li>
          <li>May reduce the risk of certain infections</li>
        </ul>
        
        <h2>How to Get Enough Vitamin D</h2>
        <p>There are three main ways to ensure adequate vitamin D levels:</p>
        <ol>
          <li>Sun exposure (15-20 minutes daily)</li>
          <li>Dietary sources (fatty fish, fortified foods)</li>
          <li>Supplements (consult with your healthcare provider)</li>
        </ol>
        
        <p>If you're concerned about your vitamin D levels, talk to your healthcare provider about getting tested and whether supplementation is right for you.</p>
      `,
      image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1200',
      author: 'Dr. Sarah Johnson',
      date: '2024-01-15',
    };

    setTimeout(() => {
      setBlog(mockBlog);
      setLoading(false);
    }, 800);
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {loading ? (
          <div className="container mx-auto px-4 py-8">
            <Skeleton className="h-8 w-32 mb-6" />
            <Skeleton className="aspect-[21/9] w-full mb-8" />
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-96 w-full" />
          </div>
        ) : blog ? (
          <>
            <article className="bg-background-alt py-8">
              <div className="container mx-auto px-4">
                <Link to="/blogs" className="inline-flex items-center text-primary hover:underline mb-6">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Blogs
                </Link>
                <div className="aspect-[21/9] w-full overflow-hidden rounded-lg mb-8">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="max-w-3xl">
                  <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
                  <div className="flex items-center gap-6 text-muted-foreground mb-8">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      {blog.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(blog.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </article>
            <div className="container mx-auto px-4 py-12">
              <div className="max-w-3xl prose prose-lg" dangerouslySetInnerHTML={{ __html: blog.content }} />
            </div>
          </>
        ) : (
          <div className="container mx-auto px-4 py-12 text-center">
            <p className="text-muted-foreground">Blog post not found</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default BlogDetail;
