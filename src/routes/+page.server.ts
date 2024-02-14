import type { PageServerLoad } from './$types';

export const load = (async ({ locals: { getSession } }) => {
	const session = await getSession();
	return {
		user: session?.user
	};
}) satisfies PageServerLoad;
