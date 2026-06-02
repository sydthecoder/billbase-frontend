<script lang="ts">
    import { enhance } from '$app/forms'
    import AdminLayout from '$lib/components/layout/AdminLayout.svelte'
    import BaseTable from '$lib/components/table/BaseTable.svelte'
    import TableCell from '$lib/components/table/TableCell.svelte'
    import RowActions from '$lib/components/table/RowActions.svelte'
    import DeleteModal from '$lib/components/ui/DeleteModal.svelte'
    import ArrowUpRightIcon from '@lucide/svelte/icons/arrow-up-right'
    import SquarePenIcon from '@lucide/svelte/icons/square-pen'
    import Trash2Icon from '@lucide/svelte/icons/trash-2'
    import type { PageData } from './$types'
    import type { Customer } from '$lib/types'

    let { data }: { data: PageData } = $props()

    let deleteTarget = $state<Customer | null>(null)
    let deleteLoading = $state(false)
    let formEl: HTMLFormElement | null = null

    const columns = [
        { label: 'Name',          key: 'full_name',      sortable: true },
        { label: 'Customer Code', key: 'customer_code',  sortable: true },
        { label: 'Email',         key: 'email',          sortable: false },
        { label: 'Phone',         key: 'phone',          sortable: false },
        { label: 'Status',        key: 'status',         sortable: true },
        { label: 'Actions',       sortable: false },
    ]

    const tabs = [
        { label: 'All',      value: 'all' },
        { label: 'Active',   value: 'active' },
        { label: 'Inactive', value: 'inactive' },
    ]

    const searchKeys = ['full_name', 'email', 'customer_code']
</script>

<form
    method="POST"
    action="?/delete"
    bind:this={formEl}
    use:enhance={() => {
        deleteLoading = true
        return async ({ update }) => {
            await update()
            deleteLoading = false
            deleteTarget = null
        }
    }}
>
    <input type="hidden" name="id" value={deleteTarget?.id ?? ''} />
</form>

<DeleteModal
    open={!!deleteTarget}
    item={deleteTarget?.full_name ?? ''}
    loading={deleteLoading}
    onConfirm={() => formEl?.requestSubmit()}
    onCancel={() => deleteTarget = null}
/>

<AdminLayout>
    <BaseTable
        {columns}
        {tabs}
        {searchKeys}
        rows={data.customers}
        searchPlaceholder="Search customers..."
        emptyMessage="No customers found."
        createUrl="/customers/create"
    >
        {#snippet cells(customer)}
            <TableCell variant="primary">{customer.full_name}</TableCell>
            <TableCell variant="code">{customer.customer_code}</TableCell>
            <TableCell>{customer.email}</TableCell>
            <TableCell>{customer.phone ?? '-'}</TableCell>
            <TableCell variant="badge" status={customer.status}>
                <span class="first-letter:uppercase">{customer.status}</span>
            </TableCell>
            <TableCell variant="action">
                <RowActions actions={[
                    { label: 'View',   icon: ArrowUpRightIcon, href: `/customers/${customer.id}` },
                    { label: 'Edit',   icon: SquarePenIcon,          href: `/customers/${customer.id}/edit` },
                    { label: 'Delete', icon: Trash2Icon,        variant: 'danger', onclick: () => deleteTarget = customer },
                ]} />
            </TableCell>
        {/snippet}

        {#snippet bulkActions(selectedIds)}
            <button class="text-sm font-medium text-error-500 hover:text-error-600">
                Delete {selectedIds.size} customers
            </button>
        {/snippet}
    </BaseTable>
</AdminLayout>