'use client';

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import InputField from "@/components/forms/InputField";
import SelectField from "@/components/forms/SelectField";
import { INVESTMENT_GOALS, PREFERRED_INDUSTRIES, RISK_TOLERANCE_OPTIONS } from "@/lib/constants";
import { CountrySelectField } from "@/components/forms/CountrySelectField";
import FooterLink from "@/components/forms/FooterLink";
import { signUpWithEmail } from "@/lib/actions/auth.actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const SignUp = () => {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<SignUpFormData>({
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            country: "US",
            investmentGoals: "Growth",
            riskTolerance: "Medium",
            preferredIndustry: "Technology",
        },
        mode: "onBlur",
    });

    useEffect(() => setMounted(true), []);

    const values = watch();
    const progress = useMemo(() => {
        const fields = [
            values.fullName?.trim(),
            values.email?.trim(),
            values.password?.trim(),
            values.country,
            values.investmentGoals,
            values.riskTolerance,
            values.preferredIndustry,
        ];
        const filled = fields.filter(Boolean).length;
        return Math.round((filled / fields.length) * 100);
    }, [values]);

    const onSubmit = async (data: SignUpFormData) => {
        try {
            const result = await signUpWithEmail(data);
            if (result.success) router.push("/");
        } catch (e) {
            console.error(e);
            toast.error("Sign up failed", {
                description: e instanceof Error ? e.message : "Failed to create an account.",
            });
        }
    };

    return (
        <div className="relative">
            {/* Background */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute -top-24 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-yellow-500/25 via-orange-500/20 to-red-500/15 blur-3xl" />
                <div className="absolute bottom-[-8rem] right-[-6rem] h-72 w-72 rounded-full bg-white/5 blur-2xl" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/30 to-black/60" />
            </div>

            {/* Card */}
            <div
                className={[
                    "mx-auto w-full max-w-xl rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-xl sm:p-8",
                    mounted ? "animate-in fade-in zoom-in-95 duration-500" : "opacity-0",
                ].join(" ")}
            >
                {/* Header */}
                <div className="mb-6">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs text-white/80 ring-1 ring-white/10">
                        <span className="h-2 w-2 rounded-full bg-yellow-400 shadow-[0_0_12px_rgba(250,204,21,0.55)]" />
                        Personalize your investing feed
                    </div>

                    <h1 className="mt-4 text-2xl font-semibold tracking-tight text-white">
                        Sign Up <span className="text-white/60">&</span>{" "}
                        <span className="bg-gradient-to-r from-yellow-300 via-orange-200 to-yellow-200 bg-clip-text text-transparent">
              Personalize
            </span>
                    </h1>

                    <p className="mt-2 text-sm text-white/60">
                        Create an account and we’ll tailor ideas to your goals, risk level, and industry preferences.
                    </p>

                    {/* Progress */}
                    <div className="mt-4">
                        <div className="flex items-center justify-between text-xs text-white/60">
                            <span>Profile setup</span>
                            <span className="tabular-nums">{progress}%</span>
                        </div>
                        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10 ring-1 ring-white/10">
                            <div
                                className="h-full rounded-full bg-gradient-to-r from-yellow-300 via-orange-200 to-yellow-200 transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Identity */}
                    <div className="space-y-5">
                        <div className="text-xs font-medium uppercase tracking-wider text-white/50">
                            Account
                        </div>

                        <InputField
                            name="fullName"
                            label="Full Name"
                            placeholder="John Doe"
                            register={register}
                            error={errors.fullName}
                            validation={{ required: "Full name is required", minLength: 2 }}
                        />

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
                            placeholder="Enter a strong password"
                            type="password"
                            register={register}
                            error={errors.password}
                            validation={{ required: "Password is required", minLength: 8 }}
                        />
                    </div>

                    {/* Preferences */}
                    <div className="mt-6 space-y-5">
                        <div className="text-xs font-medium uppercase tracking-wider text-white/50">
                            Preferences
                        </div>

                        <CountrySelectField
                            name="country"
                            label="Country"
                            control={control}
                            error={errors.country}
                            required
                        />

                        <SelectField
                            name="investmentGoals"
                            label="Investment Goals"
                            placeholder="Select your investment goal"
                            options={INVESTMENT_GOALS}
                            control={control}
                            error={errors.investmentGoals}
                            required
                        />

                        <SelectField
                            name="riskTolerance"
                            label="Risk Tolerance"
                            placeholder="Select your risk level"
                            options={RISK_TOLERANCE_OPTIONS}
                            control={control}
                            error={errors.riskTolerance}
                            required
                        />

                        <SelectField
                            name="preferredIndustry"
                            label="Preferred Industry"
                            placeholder="Select your preferred industry"
                            options={PREFERRED_INDUSTRIES}
                            control={control}
                            error={errors.preferredIndustry}
                            required
                        />
                    </div>

                    {/* Submit */}
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className={[
                            "mt-6 w-full rounded-xl bg-gradient-to-r from-yellow-300 via-orange-200 to-yellow-200 text-black",
                            "shadow-[0_10px_30px_rgba(250,204,21,0.15)] transition-transform",
                            "hover:scale-[1.01] active:scale-[0.99]",
                            isSubmitting ? "animate-pulse" : "",
                        ].join(" ")}
                    >
                        {isSubmitting ? "Creating your account..." : "Start Your Investing Journey"}
                    </Button>

                    <div className="pt-1">
                        <FooterLink text="Already have an account?" linkText="Sign in" href="/sign-in" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;


