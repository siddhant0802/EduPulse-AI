import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";

import { AuthInput, PasswordInput } from "../../auth";
import { LoadingButton } from "../../ui";

import { authService } from "../../../services";
import { useAuth } from "../../../Context/AuthContext";

import type { LoginPayload } from "../../../types/auth";

type LoginFormValues = LoginPayload & {
  remember: boolean;
};

export function LoginForm() {
  const [formError, setFormError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
      remember: true,
    },
  });

  const onSubmit = async ({ email, password }: LoginFormValues) => {
    try {
      setFormError("");

      const data = await authService.login({
        email,
        password,
      });

      login({
  id: data.user.id,
  name: data.user.name,
  email: data.user.email,
  role: data.user.role,
});

if (data.user.role === "student") {
  navigate("/student");
} else if (data.user.role === "teacher") {
  navigate("/teacher");
} else {
  if (data.user.role === "admin") {
  navigate("/dashboard");
} else if (data.user.role === "teacher") {
  navigate("/teacher");
} else {
  navigate("/student");
}
}
    } catch (error: any) {
  console.error("LOGIN ERROR:", error);
  console.error("STATUS:", error?.response?.status);
  console.error("DATA:", error?.response?.data);

  setFormError(
    error?.response?.data?.message ??
    error?.message ??
    "Unable to login."
  );
}
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <AuthInput
        autoComplete="email"
        error={errors.email?.message}
        label="Email"
        placeholder="you@example.com"
        type="email"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: "Enter a valid email address",
          },
        })}
      />

      <PasswordInput
        autoComplete="current-password"
        error={errors.password?.message}
        label="Password"
        placeholder="Enter your password"
        {...register("password", {
          required: "Password is required",
        })}
      />

      <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
        <label className="inline-flex items-center gap-2 text-slate-200">
          <input
            className="h-4 w-4 rounded border-white/20 bg-white/10 text-cyan-300 focus:ring-cyan-200"
            type="checkbox"
            {...register("remember")}
          />
          Remember me
        </label>

        <Link
          className="font-medium text-cyan-200 hover:text-cyan-100"
          to="/forgot-password"
        >
          Forgot password?
        </Link>
      </div>

      {formError ? (
        <p className="text-sm text-rose-200">{formError}</p>
      ) : null}

      <LoadingButton isLoading={isSubmitting} type="submit">
        Login
      </LoadingButton>
    </form>
  );
}