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
import { loginSchema, type LoginFormValues } from "~/schemas/auth"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"




export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {

    const [error, setError] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    })

    const onSubmit = async (data: LoginFormValues) => {
        try {
            setIsSubmitting(true)
            setError(null)

            const signInResult = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
            })

            if (signInResult?.error) {
                setError("Invalid email or password. Please try again.")
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
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
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
                                    {isSubmitting ? "Logging in..." : "Login"}
                                </Button>
                                {/* <Button variant="outline" className="w-full">
                                    Sign up with Google
                                </Button> */}
                            </div>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Don't have an account?{" "}
                            <Link href="/signup" className="underline underline-offset-4">
                                Sign Up
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
