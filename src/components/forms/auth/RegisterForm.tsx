import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";

import {
  AuthInput,
  PasswordInput,
  PasswordStrength,
} from "../../auth";

import { LoadingButton } from "../../ui";
import { authService } from "../../../services";

type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "admin" | "teacher" | "student";
};

export function RegisterForm() {
  const navigate = useNavigate();

  const [formError, setFormError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "student",
    },
  });

  const password = watch("password");

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      setFormError("");

      await authService.register({
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
      });

      navigate("/login");
    } catch {
      setFormError("Unable to create account.");
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <AuthInput
        label="Name"
        placeholder="Your Name"
        {...register("name", {
          required: "Name is required",
        })}
        error={errors.name?.message}
      />

      <AuthInput
        type="email"
        label="Email"
        placeholder="you@example.com"
        {...register("email", {
          required: "Email is required",
        })}
        error={errors.email?.message}
      />

      <div>
        <label className="mb-2 block text-sm text-white">
          Account Type
        </label>

        <select
          {...register("role")}
          className="w-full rounded-xl border border-slate-700 bg-slate-900 p-3 text-white"
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <PasswordInput
        label="Password"
        placeholder="Password"
        {...register("password", {
          required: "Password required",
          minLength: 8,
        })}
        error={errors.password?.message}
      />

      <PasswordStrength password={password} />

      <PasswordInput
        label="Confirm Password"
        placeholder="Confirm Password"
        {...register("confirmPassword", {
          validate: (value) =>
            value === password || "Passwords do not match",
        })}
        error={errors.confirmPassword?.message}
      />

      {formError && (
        <p className="text-red-400">
          {formError}
        </p>
      )}

      <LoadingButton
        isLoading={isSubmitting}
        type="submit"
      >
        Create Account
      </LoadingButton>
    </form>
  );
}