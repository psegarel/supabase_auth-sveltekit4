import { AuthApiError } from '@supabase/supabase-js';
import type { RequestHandler } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url, locals: { supabase } }) => {
	const code = url.searchParams.get('code');

	if (code) {
		try {
			const exchange = await supabase.auth.exchangeCodeForSession(code);
			console.log('Exchange', exchange);
		} catch (error) {
			console.log('Error', error);
			if (error instanceof AuthApiError) {
				// deal with the error
			}
		}
	}

	redirect(303, '/');
};
