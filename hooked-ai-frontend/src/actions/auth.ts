"use server"

import { hashPassword } from "~/lib/auth";
import { signUpSchema, type SignUpFormValues } from "~/schemas/auth";
import { db } from "~/server/db";
import Stripe from "stripe";

type SignUpResult = {
    success: boolean;
    error?: string;
}

export async function signUp(data: SignUpFormValues): Promise<SignUpResult> {
    const validationResult = signUpSchema.safeParse(data);
    if (!validationResult.success) {
        return {
            success: false,
            error: validationResult.error.issues[0]?.message || "Invalid input",
        };
    }

    const { email, password } = validationResult.data;

    try {
        const existingUser = await db.user.findUnique({
            where: { email },
        })
        if (existingUser) {
            return {
                success: false,
                error: "Email already exists. Please use a different email.",
            };
        }

        const hashedPassword = await hashPassword(password);
        // const stripe = new Stripe("TODO: STRIPE_SECRET_KEY")

        // const stripeCustomer = await stripe.customers.create({
        //     email: email.toLowerCase(),
        // })

        await db.user.create({
            data: {
                email: email.toLowerCase(),
                password: hashedPassword,
                // stripeCustomerId: stripeCustomer.id,
            }
        })

        return { success: true }

    } catch (error) {
        return {
            success: false,
            error: "ACTIONS: An error occurred while signing up. Please try again later.",
        }
    }
}