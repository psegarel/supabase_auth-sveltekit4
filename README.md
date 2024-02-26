# Supabase Auth / SvelteKit 4 Starter ( Typescript )

Email Auth with PKCE flow for SSR
Email authentication in your server-side rendering (SSR) application using the new @supabase/ssr package. 
API endpoint for verifying the token_hash along with the type to exchange token_hash for the user's session, which is set as a cookie for future requests made to Supabase.

### Check the docs...

```bash
https://supabase.com/docs/guides/auth/server-side/email-based-auth-with-pkce-flow-for-ssr?framework=sveltekit
https://supabase.com/docs/guides/auth/auth-helpers/sveltekit
```

You can also check this article:
[Securing Your SvelteKit App with Supabase Authentication](https://www.patrick-segarel.com/blog/securing-your-sveltekit-app-with-supabase-authentication).

But I worked on this starter because I found many things to be unclear or even wrong, the logic remains though.
Make sure to check how to set up a project with an .env file:

```bash 
# Values to be found on your Supabase project dashboard
#https://supabase.com/dashboard/project/[YOUR_PROJECT_ID]/settings/api
PUBLIC_SUPABASE_URL=
PUBLIC_SUPABASE_ANON_KEY=
```



### Update email templates with URL for API endpoint

#### Confirm sign up

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

#### Reset Password

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

### TailwindCSS & Daisy UI
A personal choice...

### You can a