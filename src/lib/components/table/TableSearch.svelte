<script lang="ts">
    import SearchIcon from '@lucide/svelte/icons/search'

    interface TableSearchProps {
        value?: string
        placeholder?: string
        onSearch?: (value: string) => void
    }

    let {
        value = $bindable(''),
        placeholder = 'Search...',
        onSearch,
    }: TableSearchProps = $props()
</script>

<div class="max-w-sm">
    <div class="relative">
        <button class="absolute -translate-y-1/2 left-4 top-1/2 text-gray-500 dark:text-gray-400">
            <SearchIcon size={18} />
        </button>

        <input
            type="text"
            {placeholder}
            bind:value
            oninput={(e) => onSearch?.((e.target as HTMLInputElement).value)}
            class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800  dark:bg-white/3 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
        />
    </div>
</div>