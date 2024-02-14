import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	default: async ({ locals: { supabase }, request }) => {
		const requestData = await request.formData();

		const password = String(requestData.get('password'));
		const confirm = requestData.get('confirm-password');

		if (password && confirm && password == confirm) {
			await supabase.auth.updateUser({ password });
			redirect(303, '/');
		}
	}
} satisfies Actions;
