import * as z from "zod";

export const forgotPasswordSchema = z.object({
  email: z.email({ error: "Invalid email address." }),
});

export type ForgotPassword = z.infer<typeof forgotPasswordSchema>;
