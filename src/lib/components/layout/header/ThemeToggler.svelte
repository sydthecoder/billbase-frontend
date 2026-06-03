<script lang="ts">
    import { onMount } from 'svelte'
    import { initTheme, toggleTheme } from '$lib/stores/theme'
    import SunIcon from '@lucide/svelte/icons/sun'
    import MoonIcon from '@lucide/svelte/icons/moon'

    onMount(() => {
        initTheme()
    })

    const handleToggle = (event: MouseEvent) => {
        event.preventDefault()
        toggleTheme()
    }
</script>

<button
    class="relative flex items-center justify-center text-gray-500 transition-colors bg-white border border-gray-200 rounded-full hover:text-dark-900 h-11 w-11 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
    onclick={handleToggle}
>
    <SunIcon strokeWidth={1.5} class="hidden dark:block" />
    <MoonIcon strokeWidth={1.5} class="dark:hidden" />
</button>
