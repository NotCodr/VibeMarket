'use client';

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import InputField from "@/components/forms/InputField";
import FooterLink from "@/components/forms/FooterLink";
import { signInWithEmail } from "@/lib/actions/auth.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SignIn = () => {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignInFormData>({
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onBlur",
    });

    useEffect(() => setMounted(true), []);

    const onSubmit = async (data: SignInFormData) => {
        try {
            const result = await signInWithEmail(data);
            if (result.success) router.push("/");
        } catch (e) {
            console.error(e);
            toast.error("Sign in failed", {
                description: e instanceof Error ? e.message : "Failed to sign in.",
            });
        }
    };

    return (
        <div className="relative">
            {/* Background */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute -top-24 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-yellow-500/25 via-orange-500/20 to-red-500/15 blur-3xl" />
                <div className="absolute bottom-[-8rem] left-[-6rem] h-72 w-72 rounded-full bg-white/5 blur-2xl" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/30 to-black/60" />
            </div>

            {/* Card */}
            <div
                className={[
                    "mx-auto w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-xl sm:p-8",
                    mounted ? "animate-in fade-in zoom-in-95 duration-500" : "opacity-0",
                ].join(" ")}
            >
                {/* Header */}
                <div className="mb-6">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs text-white/80 ring-1 ring-white/10">
                        <span className="h-2 w-2 rounded-full bg-yellow-400 shadow-[0_0_12px_rgba(250,204,21,0.55)]" />
                        Welcome back
                    </div>

                    <h1 className="mt-4 text-2xl font-semibold tracking-tight text-white">
                        Sign in to{" "}
                        <span className="bg-gradient-to-r from-yellow-300 via-orange-200 to-yellow-200 bg-clip-text text-transparent">
              VibeMarket
            </span>
                    </h1>

                    <p className="mt-2 text-sm text-white/60">
                        Pick up where you left off — your watchlist and insights are waiting.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <InputField
                        name="email"
                        label="Email"
                        placeholder="you@example.com"
                        register={register}
                        error={errors.email}
                        validation={{
                            required: "Email is required",
                            pattern: {
                                value: /^\S+@\S+\.\S+$/,
                                message: "Enter a valid email address",
                            },
                        }}
                    />

                    <InputField
                        name="password"
                        label="Password"
                        placeholder="Enter your password"
                        type="password"
                        register={register}
                        error={errors.password}
                        validation={{ required: "Password is required", minLength: 8 }}
                    />

                    <div className="flex items-center justify-between pt-1">
                        {/* Optional: wire this later if you add a reset route */}
                        <span className="text-xs text-white/50">
              Ensure to use a strong password manager
            </span>

                        <a
                            href="/forgot-password"
                            className="text-xs text-white/70 underline-offset-4 hover:text-white hover:underline"
                        >
                            Forgot password?
                        </a>
                    </div>

                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className={[
                            "mt-2 w-full rounded-xl bg-gradient-to-r from-yellow-300 via-orange-200 to-yellow-200 text-black",
                            "shadow-[0_10px_30px_rgba(250,204,21,0.15)] transition-transform",
                            "hover:scale-[1.01] active:scale-[0.99]",
                            isSubmitting ? "animate-pulse" : "",
                        ].join(" ")}
                    >
                        {isSubmitting ? "Signing you in..." : "Sign In"}
                    </Button>

                    <div className="pt-1">
                        <FooterLink
                            text="Don't have an account?"
                            linkText="Create an account"
                            href="/sign-up"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignIn;


