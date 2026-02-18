import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { axiosInstance2 } from "~/lib/axios";
import { useAuth } from "~/stores/useAuth";

interface LoginPayload {
  email: string;
  password?: string;
  accessToken?: string;
}

export function useLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();

  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const response = await axiosInstance2.post("/auth/login", payload);
      return response.data;
    },
    onSuccess: (data) => {
      login(data);
      toast.success("Login successful!");
      navigate("/");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message || "Login failed");
    },
  });
}
