"use client"

import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import Link from "next/link"
import { signUpSchema, type SignUpFormValues } from "~/schemas/auth"
import { signUp } from "~/actions/auth"
import { signIn } from "next-auth/react"
import { redirect, useRouter } from "next/navigation"




export function SignUpForm({
    className,
    ...props
}: React.ComponentProps<"div">) {

    const [error, setError] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormValues>({
        resolver: zodResolver(signUpSchema),
    })

    const onSubmit = async (data: SignUpFormValues) => {
        try {
            setIsSubmitting(true)
            setError(null)

            const result = await signUp(data);
            if (!result.success) {
                setError(result.error || "An error occurred. Please try again later.")
                return
            }

            const signUpResult = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
            })

            if (signUpResult?.error) {
                setError("Account created, but failed to sign in. Please try logging in manually.")
                return
            } else {
                router.push("/dashboard")
            }

        } catch (error) {
            setError("An error occurred while signing up. Please try again later.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Sign up to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to Sign up to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                    {...register("email")}
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>
                            <div className="grid gap-3">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>

                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    {...register("password")}
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-sm">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

                            {
                                error && (
                                    <p className="text-red-500 text-sm p-3 bg-red-50 rounded-md">
                                        {error || "An error occurred. Please try again later."}
                                    </p>
                                )
                            }

                            <div className="flex flex-col gap-3">
                                <Button type="submit" className="w-full" disabled={isSubmitting}>
                                    {isSubmitting ? "Signing up..." : "Sign up"}
                                </Button>
                                {/* <Button variant="outline" className="w-full">
                                    Sign up with Google
                                </Button> */}
                            </div>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <Link href="/login" className="underline underline-offset-4">
                                Login
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
