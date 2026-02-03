import { Link, useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useAuth } from "~/stores/useAuth";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosInstance, axiosInstance2 } from "~/lib/axios";
import { Field, FieldError, FieldLabel } from "~/components/ui/field";

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.email({ error: "Invalid email address." }),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export default function Register() {
  // const { register } = useAuth();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await axiosInstance2.post("/auth/register", {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      // register({
      //   name: response.data.name,
      //   email: response.data.email,
      //   password: response.data.password,
      // });
      alert("Register Success");
      navigate("/login");
    } catch (error) {
      alert("Error Register");
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Link to="/" className="text-2xl font-bold text-foreground mb-2">
            BlogApp
          </Link>
          <CardTitle className="text-xl">Create an account</CardTitle>
          <CardDescription>Enter your details to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}

            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-register-name">Name</FieldLabel>
                  <Input
                    {...field}
                    id="form-register-input"
                    aria-invalid={fieldState.invalid}
                    placeholder="your name"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Email */}
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-register-email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="form-register-email"
                    aria-invalid={fieldState.invalid}
                    placeholder="you@example.com"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Password */}
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-register-password">
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-register-password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="••••••••"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              Register
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary hover:underline font-medium"
            >
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
