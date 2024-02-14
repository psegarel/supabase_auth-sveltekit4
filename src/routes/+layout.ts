// src/routes/+layout.ts
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';

import type { SupabaseClient } from '@supabase/supabase-js';
import { browser } from '$app/environment';
import { createBrowserClient, isBrowser, parse } from '@supabase/ssr';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ fetch, depends, data }) => {
	depends('supabase:auth');
	let supabase: SupabaseClient;

	if (browser) {
		supabase = createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
			global: {
				fetch
			},
			cookies: {
				get(key) {
					if (!isBrowser()) {
						return JSON.stringify(data.session);
					}

					const cookie = parse(document.cookie);
					return cookie[key];
				}
			}
		});

		const {
			data: { session }
		} = await supabase.auth.getSession();

		return { supabase, session };
	}
	return { supabase: null, session: null };
};
