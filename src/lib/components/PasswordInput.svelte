<script lang="ts">
	import { browser } from '$app/environment';
	import EyeClosedIcon from '$lib/icons/EyeClosedIcon.svelte';
	import EyeIcon from '$lib/icons/EyeIcon.svelte';

	export let value = '';
	export let name = 'password';
	let passwordVisible = false;

	let input: HTMLInputElement;

	function togglePasswordVisible() {
		if (browser) {
			if (input) {
				passwordVisible = !passwordVisible;
				const attributeValue = passwordVisible ? 'text' : 'password';
				input.setAttribute('type', attributeValue);
			}
		}
	}
</script>

<div class="flex w-full flex-col">
	<label class="relative flex flex-col gap-2 text-xs" for={name}>
		<span>Password</span>
		<input
			id={name}
			bind:this={input}
			class="rounded bg-zinc-100 px-2 py-4 text-sm focus:outline-none"
			type="password"
			{name}
			{value}
		/>
		{#if !passwordVisible}
			<button on:click={togglePasswordVisible} class="absolute bottom-4 right-10 z-50"
				><EyeClosedIcon /></button
			>
		{:else}
			<button on:click={togglePasswordVisible} class="absolute bottom-4 right-10 z-50"
				><EyeIcon /></button
			>
		{/if}
	</label>
</div>
