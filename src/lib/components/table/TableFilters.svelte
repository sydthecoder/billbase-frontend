<script lang="ts">
    import type { Snippet } from 'svelte'

    interface Tab {
        label: string
        value: string
    }

    interface TableFiltersProps {
        tabs?: Tab[]
        activeTab?: string
        onTabChange?: (value: string) => void
        hasFilters?: boolean
        filterSnippet?: Snippet
    }

    let {
        tabs = [],
        activeTab = $bindable('all'),
        onTabChange,
        hasFilters = false,
        filterSnippet,
    }: TableFiltersProps = $props()

    let showFilter = $state(false)
</script>

<div class="flex flex-col justify-end gap-4 sm:flex-row flex-1 sm:items-center lg:gap-4">
    {#if tabs.length > 0}
        <div class="w-full md:w-fit inline-flex h-11 gap-0.5 overflow-x-auto rounded-lg bg-gray-100 p-0.5 sm:w-auto lg:min-w-fit dark:bg-gray-900">
            {#each tabs as tab}
                <button
                    onclick={() => {
                        activeTab = tab.value
                        onTabChange?.(tab.value)
                    }}
                    class={`h-10 flex-1 rounded-md px-2 py-2 text-xs font-medium sm:px-3 sm:text-sm lg:flex-initial ${
                        activeTab === tab.value
                            ? 'shadow-theme-xs text-gray-900 dark:text-white bg-white dark:bg-gray-800'
                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                >
                    {tab.label}
                </button>
            {/each}
        </div>
    {/if}

    {#if hasFilters && filterSnippet}
        <div class="relative">
            <button
                onclick={() => showFilter = !showFilter}
                class="shadow-theme-xs flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 sm:w-auto sm:min-w-[100px] dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
                type="button"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M14.6537 5.90414C14.6537 4.48433 13.5027 3.33331 12.0829 3.33331C10.6631 3.33331 9.51206 4.48433 9.51204 5.90415M14.6537 5.90414C14.6537 7.32398 13.5027 8.47498 12.0829 8.47498C10.663 8.47498 9.51204 7.32398 9.51204 5.90415M14.6537 5.90414L17.7087 5.90411M9.51204 5.90415L2.29199 5.90411M5.34694 14.0958C5.34694 12.676 6.49794 11.525 7.91777 11.525C9.33761 11.525 10.4886 12.676 10.4886 14.0958M5.34694 14.0958C5.34694 15.5156 6.49794 16.6666 7.91778 16.6666C9.33761 16.6666 10.4886 15.5156 10.4886 14.0958M5.34694 14.0958L2.29199 14.0958M10.4886 14.0958L17.7087 14.0958" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
                Filter
            </button>

            {#if showFilter}
                <div class="absolute right-0 z-10 mt-2 w-64 rounded-lg border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                    {@render filterSnippet()}
                </div>
            {/if}
        </div>
    {/if}
</div>