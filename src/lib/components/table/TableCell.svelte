<script lang="ts">
    import type { Snippet } from 'svelte'

    interface TableCellProps {
        variant?: 'default' | 'primary' | 'badge' | 'action' | 'code'
        status?: 'active' | 'inactive' | 'pending' | 'draft' | 'sent' | 'accepted' | 'declined' | 'expired'
        children: Snippet
    }

    let { variant = 'default', status, children }: TableCellProps = $props()

    const badgeClass: Record<string, string> = {
        active:   'bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-500',
        inactive: 'bg-error-50 text-error-700 dark:bg-error-500/15 dark:text-error-500',
        pending:  'bg-warning-50 text-warning-700 dark:bg-warning-500/15 dark:text-warning-400',
        draft:    'bg-gray-100 text-gray-600 dark:bg-gray-500/15 dark:text-gray-400',
        sent:     'bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400',
        accepted: 'bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-500',
        declined: 'bg-error-50 text-error-700 dark:bg-error-500/15 dark:text-error-500',
        expired:  'bg-warning-50 text-warning-700 dark:bg-warning-500/15 dark:text-warning-400',
    }
</script>

<td class="px-4 py-3 whitespace-nowrap">
    {#if variant === 'default'}
        <p class="text-gray-600 text-theme-sm dark:text-gray-200">
            {@render children()}
        </p>

    {:else if variant === 'primary'}
        <p class="font-medium text-gray-600 text-theme-sm dark:text-white/95">
            {@render children()}
        </p>

    {:else if variant === 'code'}
        <span class="text-theme-xs font-medium uppercase text-gray-600 dark:text-gray-200">
            {@render children()}
        </span>

    {:else if variant === 'badge' && status}
        <span class={`rounded-full shadow-sm px-4 py-1 text-theme-xs font-medium ${badgeClass[status]}`}>
            {@render children()}
        </span>

    {:else if variant === 'action'}
        <div class="flex items-center gap-3">
            {@render children()}
        </div>
    {/if}
</td>