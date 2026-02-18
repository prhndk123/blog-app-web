import { useQuery } from "@tanstack/react-query";
import type { Blog } from "types/blog";
import { axiosInstance2 } from "~/lib/axios";

export function useGetBlog(slug: string | undefined) {
  return useQuery({
    queryKey: ["blog", slug],
    queryFn: async () => {
      if (!slug) throw new Error("Slug is required");
      const { data } = await axiosInstance2.get<Blog>(`/blogs/${slug}`);
      return data;
    },
    enabled: !!slug,
  });
}
