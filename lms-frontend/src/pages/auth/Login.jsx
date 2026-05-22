import { Link } from "react-router-dom";

import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";

function Login() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div
        className="
          w-full max-w-md
          rounded-2xl
          border
          bg-card
          p-8
          shadow-card
        "
      >
        {/* Header */}

        <div className="mb-8 space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>

          <p className="text-sm text-muted-foreground">
            Login to continue your learning journey
          </p>
        </div>

        {/* Form */}

        <form className="space-y-5">
          {/* Email */}

          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>

            <Input type="email" placeholder="Enter your email" />
          </div>

          {/* Password */}

          <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>

            <Input type="password" placeholder="Enter your password" />
          </div>

          {/* Forgot Password */}

          <div className="flex justify-end">
            <button
              type="button"
              className="
                text-sm
                text-primary
                transition-default
                hover:opacity-80
              "
            >
              Forgot password?
            </button>
          </div>

          {/* Submit */}

          <Button className="w-full">Login</Button>
        </form>

        {/* Footer */}

        <div className="mt-6 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="
              font-medium
              text-primary
              transition-default
              hover:opacity-80
            "
          >
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
