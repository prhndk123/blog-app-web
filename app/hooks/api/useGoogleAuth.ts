import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { axiosInstance2 } from "~/lib/axios";
import { useAuth } from "~/stores/useAuth";

interface GoogleLoginPayload {
  accessToken: string;
}

export function useGoogleAuth() {
  const navigate = useNavigate();
  const { login } = useAuth();

  return useMutation({
    mutationFn: async (payload: GoogleLoginPayload) => {
      const response = await axiosInstance2.post("/auth/google", payload);
      return response.data;
    },
    onSuccess: (data) => {
      login(data);
      toast.success("Google login successful!");
      navigate("/");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message || "Google login failed");
    },
  });
}
