import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { axiosInstance2 } from "~/lib/axios";
import { type ResetPasswordSchema } from "~/schema/reset.password.schema";

export function useResetPassword(token: string) {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (payload: ResetPasswordSchema) => {
      const { data } = await axiosInstance2.post(
        "/auth/reset-password",
        {
          password: payload.password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Password reset successfully");
      navigate("/login");
    },
    onError: () => {
      toast.error("Error reset password");
    },
  });
}
