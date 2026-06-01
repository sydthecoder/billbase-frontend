<script lang="ts">
    export interface TableColumn {
        label: string
        sortable?: boolean
        key?: string
    }

    interface TableHeaderProps {
        columns: TableColumn[]
        allSelected?: boolean
        onSelectAll?: (checked: boolean) => void
        onSort?: (key: string) => void
        sortKey?: string
        sortDir?: 'asc' | 'desc'
    }

    let {
        columns,
        allSelected = $bindable(false),
        onSelectAll,
        onSort,
        sortKey = '',
        sortDir = 'asc',
    }: TableHeaderProps = $props()
</script>

<thead>
    <tr class="border-b border-gray-200 dark:divide-gray-800 dark:border-gray-800">
        <th class="px-4 py-4 w-3">
            <div class="flex w-full cursor-pointer items-center justify-between">
                <label class="flex cursor-pointer items-center text-sm font-medium text-gray-700 select-none dark:text-gray-400">
                    <span class="relative">
                        <input
                            type="checkbox"
                            class="sr-only"
                            bind:checked={allSelected}
                            onchange={(e) => onSelectAll?.((e.target as HTMLInputElement).checked)}
                        />
                        <span class={`flex h-4 w-4 items-center justify-center rounded-sm border-[1.25px] ${
                            allSelected
                                ? 'bg-brand-500 border-brand-500'
                                : 'bg-transparent border-gray-300 dark:border-gray-700'
                        }`}>
                            <span class={allSelected ? 'opacity-100' : 'opacity-0'}>
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <path d="M10 3L4.5 8.5L2 6" stroke="white" stroke-width="1.6666" stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                            </span>
                        </span>
                    </span>
                </label>
            </div>
        </th>

        {#each columns as column}
            <th
                class={`p-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 ${column.sortable ? 'cursor-pointer' : ''}`}
                onclick={() => column.sortable && column.key && onSort?.(column.key)}
            >
                <div class="flex items-center gap-3">
                    <p class="text-theme-xs font-medium uppercase">{column.label}</p>
                    {#if column.sortable}
                        <span class="flex flex-col gap-0.5">
                            <svg class={sortKey === column.key && sortDir === 'asc' ? 'text-brand-500' : 'text-gray-300'} width="8" height="5">
                                <path d="M4.40962 0.585167C4.21057 0.300808 3.78943 0.300807 3.59038 0.585166L1.05071 4.21327C0.81874 4.54466 1.05582 5 1.46033 5H6.53967C6.94418 5 7.18126 4.54466 6.94929 4.21327L4.40962 0.585167Z" fill="currentColor"></path>
                            </svg>
                            <svg class={sortKey === column.key && sortDir === 'desc' ? 'text-brand-500' : 'text-gray-300'} width="8" height="5">
                                <path d="M4.40962 4.41483C4.21057 4.69919 3.78943 4.69919 3.59038 4.41483L1.05071 0.786732C0.81874 0.455343 1.05582 0 1.46033 0H6.53967C6.94418 0 7.18126 0.455342 6.94929 0.786731L4.40962 4.41483Z" fill="currentColor"></path>
                            </svg>
                        </span>
                    {/if}
                </div>
            </th>
        {/each}
    </tr>
</thead>