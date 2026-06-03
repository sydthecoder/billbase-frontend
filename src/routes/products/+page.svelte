<script lang="ts">
    import { enhance } from '$app/forms'
    import AdminLayout from '$lib/components/layout/AdminLayout.svelte'
    import BaseTable from '$lib/components/table/BaseTable.svelte'
    import TableCell from '$lib/components/table/TableCell.svelte'
    import RowActions from '$lib/components/table/RowActions.svelte'
    import DeleteModal from '$lib/components/ui/DeleteModal.svelte'
    import SquarePenIcon from '@lucide/svelte/icons/square-pen'
    import Trash2Icon from '@lucide/svelte/icons/trash-2'
    import type { PageData } from './$types'
    import type { Product } from '$lib/types'

    let { data }: { data: PageData } = $props()

    let deleteTarget = $state<Product | null>(null)
    let deleteLoading = $state(false)
    let formEl: HTMLFormElement | null = null

    const columns = [
        { label: 'Name',     key: 'name',     sortable: true },
        { label: 'Category', key: 'category', sortable: false },
        { label: 'Price',    key: 'price',    sortable: true },
        { label: 'Unit',     key: 'unit',     sortable: false },
        { label: 'SKU',      key: 'sku',      sortable: false },
        { label: 'Taxable',  key: 'taxable',  sortable: false },
        { label: 'Status',   key: 'status',   sortable: true },
        { label: 'Actions',  sortable: false },
    ]

    const tabs = [
        { label: 'All',      value: 'all' },
        { label: 'Active',   value: 'active' },
        { label: 'Inactive', value: 'inactive' },
    ]

    const searchKeys = ['name', 'sku']
</script>

<form
    method="POST"
    action="?/deleteProduct"
    bind:this={formEl}
    onsubmit={() => { deleteLoading = true }}
    use:enhance={() => {
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
    item={deleteTarget?.name ?? ''}
    loading={deleteLoading}
    onConfirm={() => formEl?.requestSubmit()}
    onCancel={() => deleteTarget = null}
/>

<AdminLayout>
    <BaseTable
        {columns}
        {tabs}
        {searchKeys}
        rows={data.products}
        searchPlaceholder="Search products..."
        emptyMessage="No products found."
        createUrl="/products/create"
    >
        {#snippet cells(product)}
            <TableCell variant="primary">{product.name}</TableCell>
            <TableCell>{product.category?.name ?? '-'}</TableCell>
            <TableCell>R {product.price}</TableCell>
            <TableCell>{product.unit_label ?? '-'}</TableCell>
            <TableCell variant="code">{product.sku ?? '-'}</TableCell>
            <TableCell>{product.is_taxable ? 'Yes' : 'No'}</TableCell>
            <TableCell variant="badge" status={product.status}>
                <span class="first-letter:uppercase">{product.status}</span>
            </TableCell>
            <TableCell variant="action">
                <RowActions actions={[
                    { label: 'Edit',   icon: SquarePenIcon, href: `/products/${product.id}/edit` },
                    { label: 'Delete', icon: Trash2Icon,    variant: 'danger', onclick: () => deleteTarget = product },
                ]} />
            </TableCell>
        {/snippet}

        {#snippet bulkActions(selectedIds)}
            <button class="text-sm font-medium text-error-500 hover:text-error-600">
                Delete {selectedIds.size} products
            </button>
        {/snippet}
    </BaseTable>
</AdminLayout>