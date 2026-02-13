import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { axiosInstance2 } from "~/lib/axios";
import { type ForgotPassword } from "~/schema/forgot.password.schema";

export function useForgotPassword() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (payload: ForgotPassword) => {
      const { data } = await axiosInstance2.post("/auth/forgot-password", {
        email: payload.email,
      });
      return data;
    },
    onSuccess: () => {
      toast.success("Check your email for reset password link");
      navigate("/login");
    },
    onError: () => {
      toast.error("Error forgot password");
    },
  });
}
