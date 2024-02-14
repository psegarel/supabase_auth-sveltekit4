<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import '../app.pcss';
	import { invalidate } from '$app/navigation';
	import { onDestroy, onMount } from 'svelte';
	import type { LayoutData } from './$types';
	import type { Subscription } from '@supabase/supabase-js';
	import Navbar from '$lib/components/Navbar.svelte';

	export let data: LayoutData;
	let subscription: Subscription;

	$: ({ supabase, session } = data);

	onMount(async () => {
		if (supabase) {
			const { data } = supabase.auth.onAuthStateChange((event, _session) => {
				if (_session?.expires_at !== session?.expires_at) {
					invalidate('supabase:auth');
				}
			});
			subscription = data.subscription;
			console.log(session);
		}
	});

	onDestroy(() => {
		if (typeof subscription !== 'undefined') {
			subscription.unsubscribe();
		}
	});
</script>

<Navbar {session} />
<slot />
