<script lang="ts">
    import { enhance } from '$app/forms'
    import { enhanceWithToast } from '$lib/utils/formEnhance'
    import AdminLayout from '$lib/components/layout/AdminLayout.svelte'
    import BaseTable from '$lib/components/table/BaseTable.svelte'
    import TableCell from '$lib/components/table/TableCell.svelte'
    import RowActions from '$lib/components/table/RowActions.svelte'
    import DeleteModal from '$lib/components/ui/DeleteModal.svelte'
    import ArrowUpRightIcon from '@lucide/svelte/icons/arrow-up-right'
    import FileTextIcon from '@lucide/svelte/icons/file-text'
    import Trash2Icon from '@lucide/svelte/icons/trash-2'
    import type { PageData } from './$types'
    import type { Quote } from '$lib/types'

    let { data }: { data: PageData } = $props()

    let deleteTarget = $state<Quote | null>(null)
    let deleteLoading = $state(false)
    let formEl: HTMLFormElement | null = null

    // Bulk state
    let bulkDeleteIds = $state<Set<number>>(new Set())
    let bulkDeleteLoading = $state(false)
    let bulkFormEl: HTMLFormElement | null = null

    let rows = $derived(data.quotes.map(q => ({
        ...q,
        customer_name: q.customer?.name ?? ''
    })))

    const columns = [
        { label: 'Number',      key: 'quote_number',    sortable: true },
        { label: 'Customer',    key: 'customer_name',   sortable: true },
        { label: 'Title',       key: 'title',           sortable: false },
        { label: 'Status',      key: 'status',          sortable: true },
        { label: 'Issue Date',  key: 'issue_date',      sortable: true },
        { label: 'Expires',     key: 'expires_at',      sortable: true },
        { label: 'Total',       key: 'total',           sortable: true },
        { label: 'Actions',     sortable: false },
    ]

    const tabs = [
        { label: 'All',      value: 'all' },
        { label: 'Draft',    value: 'draft' },
        { label: 'Sent',     value: 'sent' },
        { label: 'Accepted', value: 'accepted' },
        { label: 'Declined', value: 'declined' },
    ]

    const searchKeys = ['quote_number', 'customer_name', 'title']
</script>

<!-- Single delete form -->
<form
    method="POST"
    action="?/delete"
    bind:this={formEl}
    onsubmit={() => { deleteLoading = true }}
    use:enhance={enhanceWithToast({
        successMessage: 'Quote deleted successfully',
        errorMessage: 'Failed to delete quote',
        onSuccess: () => {
            deleteLoading = false
            deleteTarget = null
        },
        onError: () => {
            deleteLoading = false
            deleteTarget = null
        }
    })}
>
    <input type="hidden" name="id" value={deleteTarget?.id ?? ''} />
</form>

<!-- Bulk delete form -->
<form
    method="POST"
    action="?/bulkDelete"
    bind:this={bulkFormEl}
    onsubmit={() => { bulkDeleteLoading = true }}
    use:enhance={enhanceWithToast({
        successMessage: 'Quotes deleted successfully',
        errorMessage: 'Failed to delete quotes',
        onSuccess: () => {
            bulkDeleteLoading = false
            bulkDeleteIds = new Set()
        },
        onError: () => {
            bulkDeleteLoading = false
            bulkDeleteIds = new Set()
        }
    })}
>
    {#each [...bulkDeleteIds] as id}
        <input type="hidden" name="ids" value={id} />
    {/each}
</form>

<DeleteModal
    open={!!deleteTarget}
    item={deleteTarget?.quote_number ?? ''}
    loading={deleteLoading}
    onConfirm={() => formEl?.requestSubmit()}
    onCancel={() => deleteTarget = null}
/>

<DeleteModal
    open={bulkDeleteIds.size > 0}
    item={`${bulkDeleteIds.size} quote(s)`}
    loading={bulkDeleteLoading}
    onConfirm={() => bulkFormEl?.requestSubmit()}
    onCancel={() => bulkDeleteIds = new Set()}
/>

<AdminLayout>
    <BaseTable
        {columns}
        {tabs}
        {searchKeys}
        rows={rows}
        searchPlaceholder="Search quotes..."
        emptyMessage="No quotes found."
        createUrl="/quotes/create"
    >
        {#snippet cells(quote)}
            <TableCell variant="primary">{quote.quote_number}</TableCell>
            <TableCell>{quote.customer_name}</TableCell>
            <TableCell>{quote.title ?? '-'}</TableCell>
            <TableCell variant="badge" status={quote.status}>
                <span class="first-letter:uppercase">{quote.status}</span>
            </TableCell>
            <TableCell>{quote.issue_date}</TableCell>
            <TableCell>{quote.expires_at}</TableCell>
            <TableCell>R {quote.total}</TableCell>
            <TableCell variant="action">
                <RowActions actions={[
                    { label: 'View', icon: ArrowUpRightIcon, href: `/quotes/${quote.id}` },
                    { label: 'PDF', icon: FileTextIcon, onclick: () => window.open(`/quotes/${quote.id}/pdf`, '_blank') },
                    ...(!quote.is_locked
                        ? [{ label: 'Delete', icon: Trash2Icon, variant: 'danger' as const, onclick: () => deleteTarget = quote }]
                        : []),
                ]} />
            </TableCell>
        {/snippet}

        {#snippet bulkActions(selectedIds)}
            <button 
                class="text-sm font-medium text-error-500 hover:text-error-600"
                onclick={() => bulkDeleteIds = new Set(selectedIds)}
            >
                Delete {selectedIds.size} selected
            </button>
        {/snippet}
    </BaseTable>
</AdminLayout>