<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import PasswordInput from '$lib/components/PasswordInput.svelte';
	import BarsRotateIcon from '$lib/icons/BarsRotateIcon.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let isSigningUp = false;
	let passwordVisible = false;

	const email = 'patrick@insense.vn';
	const pwd = 'x2MNprs5';

	function onClick() {
		isSigningUp = true;
	}
</script>

<div class="flex h-full w-full flex-col items-center justify-start p-4">
	<form
		use:enhance={() => {
			return async ({ result }) => {
				if (result.status == 303 && result.type == 'redirect') {
					goto('/email-confirm');
					isSigningUp = false;
				}
			};
		}}
		class="flex w-full flex-col gap-4 lg:w-1/4"
		method="POST"
	>
		<div>
			<label class="flex flex-col gap-2 text-xs" for="name">
				<span>Email</span>
				<input
					class="rounded bg-zinc-100 px-2 py-4 text-sm focus:outline-none"
					type="text"
					name="email"
					value={email}
				/>
			</label>
		</div>
		<PasswordInput value={pwd} />
		<div class="my-4"></div>
		<button
			on:click={onClick}
			class="btn relative bg-zinc-600 px-4 py-2 text-xs uppercase text-white active:bg-zinc-400"
		>
			<div class="absolute flex w-full flex-col items-center">
				{#if isSigningUp}
					<BarsRotateIcon size={16} />
				{:else}
					Signup
				{/if}
			</div>
		</button>
		<span class="text-sm font-semibold tracking-tight"
			>Already a user? <a class="text-green-600 hover:underline" href="/login">Login</a></span
		>
	</form>
</div>
