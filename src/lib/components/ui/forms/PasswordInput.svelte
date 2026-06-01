<script lang="ts">
    import EyeIcon from '@lucide/svelte/icons/eye'
    import EyeOffIcon from '@lucide/svelte/icons/eye-off'

    interface PasswordInputProps {
        id: string
        name: string
        placeholder?: string
        value?: string
        required?: boolean
        disabled?: boolean
    }

    let {
        id,
        name,
        placeholder = 'Enter your password',
        value = $bindable(''),
        required = false,
        disabled = false,
    }: PasswordInputProps = $props()

    let showPassword = $state(false)
</script>

<div class="relative">
    <input
        {id}
        {name}
        {required}
        {disabled}
        bind:value
        type={showPassword ? 'text' : 'password'}
        {placeholder}
        class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
    />

    <button
        type="button"
        onclick={() => showPassword = !showPassword}
        class="absolute z-30 text-gray-400 -translate-y-1/2 cursor-pointer right-4 top-1/2 dark:text-gray-400"
    >
        {#if showPassword}
            <EyeOffIcon strokeWidth={1.5} />
        {:else}
            <EyeIcon strokeWidth={1.5} />
        {/if}
    </button>
</div>