import { useQuery } from "@tanstack/react-query";
import type { Blog } from "types/blog";
import type { PaginationResponse } from "types/pagination";
import { axiosInstance2 } from "~/lib/axios";

interface GetBlogsParams {
  page: number;
  search: string;
  take?: number;
}

export function useGetBlogs(params: GetBlogsParams) {
  return useQuery({
    queryKey: ["blogs", params],
    queryFn: async () => {
      const { data } = await axiosInstance2.get<PaginationResponse<Blog>>(
        "/blogs",
        {
          params,
        },
      );
      return data;
    },
  });
}
