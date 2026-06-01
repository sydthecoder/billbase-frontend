<script lang="ts">
    import AdminLayout from '$lib/components/layout/AdminLayout.svelte'
    import BaseTable from '$lib/components/table/BaseTable.svelte'
    import TableCell from '$lib/components/table/TableCell.svelte';
    import ArrowUpRightIcon from '@lucide/svelte/icons/arrow-up-right'
    import Trash2Icon from '@lucide/svelte/icons/trash-2'
    import SquarePenIcon from '@lucide/svelte/icons/square-pen'
    import RowActions from '$lib/components/table/RowActions.svelte'
    import type { PageData } from './$types'

    let { data }: { data: PageData } = $props()

    const columns = [
        { label: 'Name',    key: 'full_name',      sortable: true },
        { label: 'Customer Code',    key: 'customer_code', sortable: true },
        { label: 'Email',   key: 'email',          sortable: false },
        { label: 'Phone',   key: 'phone',          sortable: false },
        { label: 'Status',  key: 'status',         sortable: true },
        { label: 'Actions', sortable: false },
    ]

    const tabs = [
        { label: 'All',      value: 'all' },
        { label: 'Active',   value: 'active' },
        { label: 'Inactive', value: 'inactive' },
    ]

    const filters = [
        {
            key: 'company_name',
            label: 'Company',
            type: 'text' as const,
        },
        {
            key: 'status',
            label: 'Status',
            type: 'select' as const,
            options: [
                { label: 'Active',   value: 'active' },
                { label: 'Inactive', value: 'inactive' },
            ],
        },
    ]

    const searchKeys = ['full_name', 'email', 'customer_code']
</script>

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
            <TableCell variant="badge" status={customer.status}><span class="first-letter:uppercase">{customer.status}</span></TableCell>
            <TableCell variant="action">
        <RowActions actions={[
            { label: 'View',   icon: ArrowUpRightIcon, href: `/customers/${customer.id}` },
            { label: 'Edit',   icon: SquarePenIcon,          href: `/customers/${customer.id}/edit` },
            { label: 'Delete', icon: Trash2Icon,        variant: 'danger', onclick: () => console.log('delete', customer.id) },
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