import type { PageServerLoad } from './$types';

export const load = (async ({ locals: { getSession } }) => {
	return {};
}) satisfies PageServerLoad;
