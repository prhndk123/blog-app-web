import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import { axiosInstance2 } from "~/lib/axios";
import { useAuth } from "~/stores/useAuth";

export function useUpdateProfile() {
  const { user, updateUser } = useAuth();

  return useMutation({
    mutationFn: async (photo: File) => {
      const formData = new FormData();
      formData.append("photo", photo);

      await axiosInstance2.post("/users/photo", formData);
      const response = await axiosInstance2.get(`/users/${user?.id}`);
      return response.data;
    },
    onSuccess: (data) => {
      updateUser(data);
      toast.success("Profile photo updated successfully!");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(
        error.response?.data.message || "Failed to update profile photo",
      );
    },
  });
}
