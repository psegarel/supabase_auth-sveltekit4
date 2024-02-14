// src/routes/+layout.server.ts
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { getSession } }) => {
	const user = (await getSession())?.user;
	console.log(user);
	return {
		session: getSession(),
		user
	};
};
