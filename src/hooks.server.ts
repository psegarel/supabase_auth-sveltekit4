// src/hooks.server.ts
import { type Handle, redirect, error } from '@sveltejs/kit';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import { sequence } from '@sveltejs/kit/hooks';

async function supabase(params: any) {
	const { event, resolve } = params;
	event.locals.supabase = createSupabaseServerClient({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event
	});

	/**
	 * a little helper that is written for convenience so that instead
	 * of calling `const { data: { session } } = await supabase.auth.getSession()`
	 * you just call this `await getSession()`
	 */
	event.locals.getSession = async () => {
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession();
		return session;
	};

	return resolve(event, {
		filterSerializedResponseHeaders(name: string) {
			return name === 'content-range';
		}
	});
}

async function authorization(params: any) {
	const { event, resolve } = params;
	// protect requests to all routes that start with /protected-routes
	if (event.url.pathname.startsWith('/protected-routes') && event.request.method === 'GET') {
		const session = await event.locals.getSession();
		if (!session) {
			// the user is not signed in
			redirect(303, '/');
		}
	}

	// protect POST requests to all routes that start with /protected-posts
	if (event.url.pathname.startsWith('/protected-posts') && event.request.method === 'POST') {
		const session = await event.locals.getSession();
		if (!session) {
			// the user is not signed in
			throw error(401, '/');
		}
	}

	return resolve(event);
}

export const handle: Handle = sequence(supabase, authorization);
