import { Link } from "react-router";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import type { Blog } from "types/blog";

interface BlogCardProps {
  blog: Blog;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Link to={`/blogs/${blog.slug}`}>
      <Card className="h-full overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
        <div className="aspect-video overflow-hidden">
          <img
            src={blog.thumbnail}
            alt={blog.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <CardContent className="p-4">
          <Badge variant="secondary" className="mb-2">
            {blog.category}
          </Badge>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-foreground">
            {blog.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {blog.description}
          </p>
        </CardContent>
        <CardFooter className="px-4 pb-4 pt-0">
          <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
            <span className="capitalize">{blog.user.name}</span>
            <span>{formatDate(blog.createdAt)}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default BlogCard;
