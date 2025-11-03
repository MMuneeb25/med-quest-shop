import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface Blog {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
}

const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockBlogs: Blog[] = [
      {
        id: '1',
        title: 'The Importance of Vitamin D for Immune Health',
        excerpt: 'Discover how vitamin D plays a crucial role in supporting your immune system and overall health.',
        image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600',
        author: 'Dr. Sarah Johnson',
        date: '2024-01-15',
      },
      {
        id: '2',
        title: 'Understanding Common Cold Remedies',
        excerpt: 'Learn about effective over-the-counter remedies and natural solutions for cold symptoms.',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600',
        author: 'Dr. Michael Chen',
        date: '2024-01-10',
      },
      {
        id: '3',
        title: 'Building a Complete First Aid Kit',
        excerpt: 'Essential items every household should have in their first aid kit for emergency situations.',
        image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=600',
        author: 'Nurse Emily Davis',
        date: '2024-01-05',
      },
    ];

    setTimeout(() => {
      setBlogs(mockBlogs);
      setLoading(false);
    }, 800);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Health & Wellness Blog</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Expert advice, tips, and information to help you make informed healthcare decisions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <Card key={i}>
                  <Skeleton className="aspect-video" />
                  <CardContent className="p-6 space-y-3">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                </Card>
              ))
            : blogs.map((blog) => (
                <Link key={blog.id} to={`/blogs/${blog.id}`}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-smooth">
                        {blog.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                        {blog.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <User className="h-3 w-3 mr-1" />
                          {blog.author}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(blog.date).toLocaleDateString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blogs;
