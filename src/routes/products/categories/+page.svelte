<script lang="ts">
    import { enhance } from '$app/forms'
    import AdminLayout from '$lib/components/layout/AdminLayout.svelte'
    import BaseTable from '$lib/components/table/BaseTable.svelte'
    import TableCell from '$lib/components/table/TableCell.svelte'
    import RowActions from '$lib/components/table/RowActions.svelte'
    import DeleteModal from '$lib/components/ui/DeleteModal.svelte'
    import FormCard from '$lib/components/ui/FormCard.svelte'
    import Label from '$lib/components/ui/forms/Label.svelte'
    import TextInput from '$lib/components/ui/forms/TextInput.svelte'
    import { fade, scale } from 'svelte/transition'
    import XIcon from '@lucide/svelte/icons/x'
    import SquarePenIcon from '@lucide/svelte/icons/square-pen'
    import Trash2Icon from '@lucide/svelte/icons/trash-2'
    import type { PageData } from './$types'
    import type { ProductCategory } from '$lib/types'

    let { data }: { data: PageData } = $props()

    // ── Quick add modal ───────────────────────────────────────
    let showModal = $state(false)

    // ── Delete ────────────────────────────────────────────────
    let deleteTarget = $state<ProductCategory | null>(null)
    let deleteLoading = $state(false)
    let deleteFormEl: HTMLFormElement | null = null

    const columns = [
        { label: 'Name',        key: 'name',        sortable: true },
        { label: 'Description', key: 'description', sortable: false },
        { label: 'Created',     key: 'created_at',  sortable: true },
        { label: 'Actions',     sortable: false },
    ]

    const searchKeys = ['name', 'description']
</script>

<!-- Delete form -->
<form
    method="POST"
    action="?/deleteCategory"
    bind:this={deleteFormEl}
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
    onConfirm={() => deleteFormEl?.requestSubmit()}
    onCancel={() => deleteTarget = null}
/>

<!-- Quick Add Modal -->
{#if showModal}
    <div
        transition:fade={{ duration: 150 }}
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/70"
        onclick={() => showModal = false}
    >
        <div
            transition:scale={{ duration: 150, start: 0.95 }}
            onclick={(e) => e.stopPropagation()}
            class="relative w-full max-w-md mx-4"
        >
            <FormCard title="Quick Add Category" desc="Add a new product category">
                <button
                    type="button"
                    onclick={() => showModal = false}
                    class="absolute right-4 top-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                    <XIcon size={20} />
                </button>

                <form
                    method="POST"
                    action="?/createCategory"
                    use:enhance={() => {
                        return async ({ result, update }) => {
                            await update()
                            if (result.type === 'success') showModal = false
                        }
                    }}
                >
                    <div class="space-y-4">
                        <div>
                            <Label for="name" text="Name" required />
                            <TextInput id="name" name="name" placeholder="Category name" required />
                        </div>
                        <div>
                            <Label for="description" text="Description" />
                            <TextInput id="description" name="description" placeholder="Optional description" />
                        </div>
                        <div class="flex gap-3 pt-2">
                            <button
                                type="button"
                                onclick={() => showModal = false}
                                class="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                class="flex-1 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600"
                            >
                                Add Category
                            </button>
                        </div>
                    </div>
                </form>

                <div class="mt-4 border-t border-gray-100 pt-4 dark:border-gray-800">
                    <a
                        href="/products/categories"
                        class="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                    >
                        Manage all categories →
                    </a>
                </div>
            </FormCard>
        </div>
    </div>
{/if}

<AdminLayout>
    <BaseTable
        {columns}
        {searchKeys}
        rows={data.categories}
        searchPlaceholder="Search categories..."
        emptyMessage="No categories found."
    >
        {#snippet cells(category)}
            <TableCell variant="primary">{category.name}</TableCell>
            <TableCell>{category.description ?? '-'}</TableCell>
            <TableCell>{category.created_at}</TableCell>
            <TableCell variant="action">
                <RowActions actions={[
                    { label: 'Edit',   icon: SquarePenIcon, href: `/products/categories/${category.id}/edit` },
                    { label: 'Delete', icon: Trash2Icon,    variant: 'danger', onclick: () => deleteTarget = category },
                ]} />
            </TableCell>
        {/snippet}
    </BaseTable>
</AdminLayout>