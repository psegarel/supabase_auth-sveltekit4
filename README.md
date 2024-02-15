# Supabase Auth / SvelteKit 4 Starter ( Typescript )

Email Auth with PKCE flow for SSR
Email authentication in your server-side rendering (SSR) application to work with the PKCE flow, with API endpoint for verifying the token_hash along with the type to exchange token_hash for the user's session, which is set as a cookie for future requests made to Supabase.

# Check the docs...
But I worked on this starter because I found many things were unclear or even wrong, the logic remains though.

# https://supabase.com/docs/guides/auth/server-side/email-based-auth-with-pkce-flow-for-ssr?framework=sveltekit


# Update email templates with URL for API endpoint

## Confirm sign up

```bash 
<h2>Confirm your signup!</h2>

<p>Follow this link to confirm your user:</p>
<p>
  <a href="{{ .SiteURL }}/api/auth/callback?token_hash={{ .TokenHash }}&type=email"
    >Confirm your email</a
  >
</p>
```
Here the api endpoint is /api/auth/callback, but this is up to you.

## Reset Password

```bash 
<h2>Reset Password</h2>

<p>Follow this link to reset the password for your user:</p>
<p>
  <a
    href="{{ .SiteURL }}/api/auth/callback?token_hash={{ .TokenHash }}&type=recovery&next=/update-password"
    >Reset Password</a
  >
</p>
```
Check the other email templates, depending on your application needs

# TailwindCSS & Daisy UI
A personal choice...