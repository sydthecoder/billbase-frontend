<script lang="ts">
    import ChevronLeftIcon from '@lucide/svelte/icons/chevron-left'
    import ChevronRightIcon from '@lucide/svelte/icons/chevron-right'

    interface TablePaginationProps {
        currentPage: number
        totalPages: number
        totalItems: number
        perPage: number
        onPageChange: (page: number) => void
    }

    let {
        currentPage,
        totalPages,
        totalItems,
        perPage,
        onPageChange,
    }: TablePaginationProps = $props()

    const from = $derived((currentPage - 1) * perPage + 1)
    const to = $derived(Math.min(currentPage * perPage, totalItems))

    const pages = $derived(
        Array.from({ length: totalPages }, (_, i) => i + 1)
    )
</script>

<div class="flex items-center flex-col sm:flex-row justify-between border-t border-gray-200 px-5 py-3 dark:border-gray-800">
    <div class="pb-3 sm:pb-0">
        <span class="block text-sm font-medium text-gray-500 dark:text-gray-400">
            Showing
            <span class="dark:text-white/90">{from}</span>
            to
            <span class="dark:text-white/90">{to}</span>
            of
            <span class="dark:text-white/90">{totalItems}</span>
        </span>
    </div>

    <div class="flex items-center bg-gray-50 dark:bg-white/3 dark:sm:bg-transparent sm:bg-transparent p-4 sm:p-0 w-full sm:w-auto rounded-lg justify-between gap-2 sm:justify-normal">
        <button
            onclick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            class="h-10 w-10 shadow-theme-xs flex items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-800 disabled:opacity-50 sm:p-2.5 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/3 dark:hover:text-gray-200"
        >
            <ChevronLeftIcon size={20} />
        </button>

        <span class="block text-sm font-medium text-gray-700 sm:hidden dark:text-gray-400">
            Page {currentPage} of {totalPages}
        </span>

        <ul class="hidden sm:flex items-center gap-0.5">
            {#each pages as page}
                <li>
                    <button
                        onclick={() => onPageChange(page)}
                        class={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium ${
                            page === currentPage
                                ? 'bg-brand-500 text-white'
                                : 'text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'
                        }`}
                    >
                        {page}
                    </button>
                </li>
            {/each}
        </ul>

        <button
            onclick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            class="h-10 w-10 shadow-theme-xs flex items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-800 disabled:opacity-50 sm:p-2.5 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/3 dark:hover:text-gray-200"
        >
            <ChevronRightIcon size={20} />
        </button>
    </div>
</div>