import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { axiosInstance2 } from "~/lib/axios";

interface CreateBlogPayload {
  title: string;
  description: string;
  category: string;
  content: string;
  thumbnail: File;
}

export function useCreateBlog() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: CreateBlogPayload) => {
      const formData = new FormData();
      formData.append("thumbnail", data.thumbnail);
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("content", data.content);

      const response = await axiosInstance2.post("/blogs", formData);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Blog created successfully!");
      navigate("/");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message || "Failed to create blog");
    },
  });
}
