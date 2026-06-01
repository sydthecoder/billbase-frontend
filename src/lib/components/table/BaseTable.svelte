<script lang="ts">
    import TableWrapper from './TableWrapper.svelte'
    import TableSearch from './TableSearch.svelte'
    import TableFilters from './TableFilters.svelte'
    import TableHeader from './TableHeader.svelte'
    import TablePagination from './TablePagination.svelte'
    import EmptyState from './EmptyState.svelte'
    import PlusIcon from '@lucide/svelte/icons/plus'
    import type { TableColumn } from './TableHeader.svelte'
    import type { Snippet } from 'svelte'

    interface Tab {
        label: string
        value: string
    }

    interface BaseTableProps {
        columns: TableColumn[]
        rows: any[]
        tabs?: Tab[]
        searchPlaceholder?: string
        emptyMessage?: string
        perPage?: number
        searchKeys?: string[]
        createUrl?: string
        cells: Snippet<[any]>
        bulkActions?: Snippet<[Set<number>]>
    }

    let {
        columns,
        rows,
        tabs = [],
        searchPlaceholder = 'Search...',
        emptyMessage = 'No records found.',
        perPage = 10,
        searchKeys = [],
        createUrl,
        cells,
        bulkActions,
    }: BaseTableProps = $props()

    // ── Search ────────────────────────────────────────────────
    let search = $state('')
    let activeTab = $state('all')

    // ── Selection ─────────────────────────────────────────────
    let selectedIds = $state<Set<number>>(new Set())
    let allSelected = $state(false)

    // ── Sort ──────────────────────────────────────────────────
    let sortKey = $state('')
    let sortDir = $state<'asc' | 'desc'>('asc')

    // ── Pagination ────────────────────────────────────────────
    let currentPage = $state(1)

    // ── Derived ───────────────────────────────────────────────
    const filtered = $derived(() => {
        let list = rows

        if (activeTab !== 'all') {
            list = list.filter(r => r.status === activeTab)
        }

        if (search.trim() && searchKeys.length > 0) {
            const q = search.toLowerCase()
            list = list.filter(r =>
                searchKeys.some(key =>
                    String(r[key] ?? '').toLowerCase().includes(q)
                )
            )
        }

        if (sortKey) {
            list = [...list].sort((a, b) => {
                const aVal = a[sortKey] ?? ''
                const bVal = b[sortKey] ?? ''
                return sortDir === 'asc'
                    ? String(aVal).localeCompare(String(bVal))
                    : String(bVal).localeCompare(String(aVal))
            })
        }

        return list
    })

    const totalItems = $derived(filtered().length)
    const totalPages = $derived(Math.max(1, Math.ceil(totalItems / perPage)))
    const paginated = $derived(
        filtered().slice((currentPage - 1) * perPage, currentPage * perPage)
    )

    // ── Handlers ──────────────────────────────────────────────
    function handleSelectAll(checked: boolean) {
        allSelected = checked
        selectedIds = checked
            ? new Set(paginated.map(r => r.id))
            : new Set()
    }

    function handleSelectRow(id: number, checked: boolean) {
        const next = new Set(selectedIds)
        checked ? next.add(id) : next.delete(id)
        selectedIds = next
        allSelected = paginated.every(r => selectedIds.has(r.id))
    }

    function handleSort(key: string) {
        if (sortKey === key) {
            sortDir = sortDir === 'asc' ? 'desc' : 'asc'
        } else {
            sortKey = key
            sortDir = 'asc'
        }
        currentPage = 1
    }

    function handleTabChange(value: string) {
        activeTab = value
        currentPage = 1
        selectedIds = new Set()
        allSelected = false
    }
</script>

<TableWrapper>
    <div class="flex flex-col gap-4 border-b border-gray-200 px-4 py-4 sm:px-5 lg:flex-row lg:items-center lg:justify-between dark:border-gray-800">
        <TableSearch
            placeholder={searchPlaceholder}
            onSearch={(val) => { search = val; currentPage = 1 }}
        />

        <div class="flex items-center gap-3">
            <TableFilters
                {tabs}
                bind:activeTab
                onTabChange={handleTabChange}
            />

            {#if createUrl}
                <a
                    href={createUrl}
                    class="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 transition-colors shrink-0"
                    title="Create new"
                >
                    <PlusIcon size={20} />
                </a>
            {/if}
        </div>
    </div>

    <!-- Bulk Actions -->
    {#if selectedIds.size > 0 && bulkActions}
        <div class="flex items-center gap-3 border-b border-gray-200 bg-gray-50 px-5 py-3 dark:border-gray-800 dark:bg-white/2">
            <span class="text-sm text-gray-600 dark:text-gray-400">
                {selectedIds.size} selected
            </span>
            {@render bulkActions(selectedIds)}
        </div>
    {/if}

    <div class="custom-scrollbar overflow-x-auto">
        <table class="w-full table-auto">
            <TableHeader
                {columns}
                bind:allSelected
                onSelectAll={handleSelectAll}
                onSort={handleSort}
                {sortKey}
                {sortDir}
            />
            <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
                {#if paginated.length === 0}
                    <EmptyState message={emptyMessage} />
                {:else}
                    {#each paginated as row (row.id)}
                        <tr class="transition hover:bg-gray-50 dark:hover:bg-gray-900">
                            <td class="p-4 whitespace-nowrap">
                                <label class="flex cursor-pointer items-center select-none">
                                    <span class="relative">
                                        <input
                                            type="checkbox"
                                            class="sr-only"
                                            checked={selectedIds.has(row.id)}
                                            onchange={(e) => handleSelectRow(row.id, (e.target as HTMLInputElement).checked)}
                                        />
                                        <span class={`flex h-4 w-4 items-center justify-center rounded-sm border-[1.25px] ${
                                            selectedIds.has(row.id)
                                                ? 'bg-brand-500 border-brand-500'
                                                : 'bg-transparent border-gray-300 dark:border-gray-700'
                                        }`}>
                                            <span class={selectedIds.has(row.id) ? 'opacity-100' : 'opacity-0'}>
                                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                    <path d="M10 3L4.5 8.5L2 6" stroke="white" stroke-width="1.6666" stroke-linecap="round" stroke-linejoin="round"></path>
                                                </svg>
                                            </span>
                                        </span>
                                    </span>
                                </label>
                            </td>
                            {@render cells(row)}
                        </tr>
                    {/each}
                {/if}
            </tbody>
        </table>
    </div>

    <TablePagination
        {currentPage}
        {totalPages}
        {totalItems}
        {perPage}
        onPageChange={(page) => currentPage = page}
    />
</TableWrapper>