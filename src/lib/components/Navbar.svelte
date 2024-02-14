<script lang="ts">
	import type { Session } from '@supabase/supabase-js';

	export let session: Session | null;
</script>

<div class="flex h-20 w-screen flex-row items-center justify-between gap-4 p-4 px-16 shadow-md">
	<a class="font-semibold tracking-tighter" href="/">Supabase Auth</a>
	<div class="flex flex-row items-center gap-8">
		{#if session && session.user}
			<p class="rounded-full bg-zinc-600 px-4 py-1 text-xs text-white">{session.user.email}</p>
		{/if}
		<ul class="flex flex-row gap-4">
			{#if !session}
				<li><a class="text-xs font-light uppercase" href="/login">Login</a></li>
				<li><a class="text-xs font-light uppercase" href="/signup">Signup</a></li>
			{/if}
			{#if session && session.user}
				<li><a class="text-xs font-light uppercase" href="/profile">Profile</a></li>
				<li><a class="text-xs font-light uppercase" href="/logout">Logout</a></li>
				<li><a class="text-xs font-light uppercase" href="/protected-routes">Protected</a></li>
			{/if}
		</ul>
	</div>
</div>
