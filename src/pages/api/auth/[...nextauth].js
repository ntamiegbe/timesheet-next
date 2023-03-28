import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const options = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    // session: {
    //     jwt: true
    // },
    // jwt: {
    //     secret: 'SUPER_SECRET_JWT_SECRET'
    // },
    callbacks: {
        async signIn({ account, profile }) {
            if (account.provider === "google") {
                return profile.email_verified && profile.email.endsWith("@gmail.com")
            }
            return true // Do different verification for other providers that don't have `email_verified`
        },
    }
    // pages: {
    //     signIn: '/sign-in'
    // }
}

export default (req, res) => NextAuth(req, res, options)