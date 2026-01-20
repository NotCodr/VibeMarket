'use server';


import {inngest} from "@/lib/inngest/client";
import {headers} from "next/headers";




export const signInWithEmail = async ({ email, password }: SignInFormData) => {
    try {



    } catch (e) {
        console.log('Sign in failed', e)
        return { success: false, error: 'Sign in failed' }
    }
}

export const signOut = async () => {

}
