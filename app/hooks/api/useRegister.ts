import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { axiosInstance2 } from "~/lib/axios";

interface RegisterPayload {
  name: string;
  email: string;
  password?: string;
}

export function useRegister() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      const response = await axiosInstance2.post("/auth/register", payload);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Registration successful! Please login.");
      navigate("/login");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message || "Registration failed");
    },
  });
}
