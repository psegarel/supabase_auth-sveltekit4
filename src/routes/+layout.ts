// src/routes/+layout.ts
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';
import type { Database } from '../app';
import type { Session, SupabaseClient } from '@supabase/supabase-js';
import { browser } from '$app/environment';

export const load = async ({ fetch, depends, data }) => {
	depends('supabase:auth');
	let supabase: SupabaseClient;

	if (browser) {
		supabase = createSupabaseLoadClient<Database>({
			supabaseUrl: PUBLIC_SUPABASE_URL,
			supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
			event: { fetch },
			serverSession: data.session as unknown as Session | null
		});

		const {
			data: { session }
		} = await supabase.auth.getSession();

		return { supabase, session };
	}
	return {};
};
