<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import '../app.pcss';
	import { invalidate } from '$app/navigation';
	import { onDestroy, onMount } from 'svelte';
	import type { LayoutData } from './$types';
	import type { Subscription } from '@supabase/supabase-js';

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
			const user = await supabase.auth.getUser();
			console.log(user);
		}
	});

	onDestroy(() => {
		if (typeof subscription !== 'undefined') {
			subscription.unsubscribe();
		}
	});
</script>

<div class="flex h-20 w-screen flex-row items-center justify-between gap-4 p-4 px-16 shadow-md">
	<a class="font-semibold tracking-tighter" href="/">Supabase Auth</a>
	<div>
		<ul class="flex flex-row gap-4">
			<li><a class="text-xs font-light uppercase" href="/profile">Profile</a></li>
			<li><a class="text-xs font-light uppercase" href="/login">Login</a></li>
			<li><a class="text-xs font-light uppercase" href="/signup">Signup</a></li>
			<li><a class="text-xs font-light uppercase" href="/logout">Logout</a></li>
			<li><a class="text-xs font-light uppercase" href="/protected-routes">Protected</a></li>
		</ul>
	</div>
</div>
<slot />
