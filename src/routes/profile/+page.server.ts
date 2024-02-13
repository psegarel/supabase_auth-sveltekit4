import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();
	if (!session) {
		throw redirect(303, '/');
	}
	//const { data: tableData } = await supabase.from('test').select('*');
	return {
		user: session.user
		//tableData
	};
}) satisfies PageServerLoad;
