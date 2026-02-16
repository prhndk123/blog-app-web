import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import BlogCard from "~/components/blog-card";
import Footer from "~/components/footer";
import Navbar from "~/components/navbar";
import { Input } from "~/components/ui/input";
import { axiosInstance, axiosInstance2 } from "~/lib/axios";
import type { Route } from "./+types/home";
import type { Blog } from "types/blog";
import { useQuery } from "@tanstack/react-query";
import type { PaginationResponse } from "types/pagination";
import PaginationSection from "~/components/pagination-section";
import { useDebounceValue } from "usehooks-ts";
import { parseAsInteger, useQueryState } from "nuqs";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search, setSearch] = useQueryState("search", {
    defaultValue: "",
  });
  const [debouncedValue] = useDebounceValue(search, 500);
  const queryParams = {
    page,
    take: 1,
    search: debouncedValue,
  };
  const { data: Blogs, isPending } = useQuery({
    queryKey: ["blogs", queryParams],
    queryFn: async () => {
      const { data } = await axiosInstance2<PaginationResponse<Blog>>(
        "/blogs",
        {
          params: queryParams,
        },
      );
      return data;
    },
  });

  const [logs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getBlogs = async () => {
    try {
      const { data } = await axiosInstance("/api/data/Blogs");
      setBlogs(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div>
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Welcome to BlogApp
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover amazing stories, insights, and ideas from writers around
            the world.
          </p>
        </div>

        {/* Search Input */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search blogs..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Blog Grid */}
        {isPending && (
          <div className="flex justify-center items-center h-[40vh]">
            <p>Loading...</p>
          </div>
        )}

        {!isPending && !Blogs?.data.length && (
          <div className="flex justify-center items-center h-[40vh]">
            <p>No blogs found</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {Blogs?.data.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
        {!!Blogs?.meta && (
          <PaginationSection
            meta={Blogs.meta}
            onPageChange={(page) => setPage(page)}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}
