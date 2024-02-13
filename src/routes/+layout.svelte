<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import '../app.pcss';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	$: ({ supabase, session } = data);

	onMount(() => {
		if (supabase) {
			const {
				data: { subscription }
			} = supabase.auth.onAuthStateChange((event, _session) => {
				if (_session?.expires_at !== session?.expires_at) {
					invalidate('supabase:auth');
				}
			});

			return () => subscription.unsubscribe();
		}
	});
</script>

<div class="flex h-20 w-screen flex-row items-center justify-between gap-4 p-4 px-16 shadow-md">
	<a class="font-semibold tracking-tighter" href="/">Supabase Auth</a>
	<ul class="flex flex-row gap-4">
		<li><a class="text-xs font-light uppercase" href="/login">Login</a></li>
		<li><a class="text-xs font-light uppercase" href="/signup">Signup</a></li>
	</ul>
</div>
<slot />
