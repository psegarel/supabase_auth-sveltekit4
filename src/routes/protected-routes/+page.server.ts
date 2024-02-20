import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals: { getSession } }) => {
	const session = await getSession();
	if (!session) {
		redirect(303, '/');
	}
	return {};
}) satisfies PageServerLoad;
