<!-- src/routes/profile/+page.svelte -->
<script lang="ts">
	import type { PageData } from '../$types';

	export let data: PageData;

	$: ({ supabase, session } = data);

	let loadedData: any = [];

	async function loadData() {
		// const { data } = await supabase.from('test').select('*').limit(20);
		// loadedData = data;
	}

	$: if (session) {
		loadData();
	}
</script>

<div class="w-screen p-4 pt-40 lg:px-16">
	{#if session}
		<p>client-side data fetching with RLS</p>
		<pre>{JSON.stringify(loadedData, null, 2)}</pre>
	{/if}
</div>
