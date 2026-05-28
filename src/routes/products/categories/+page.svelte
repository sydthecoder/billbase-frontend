<script lang="ts">
    import { enhance } from '$app/forms'
    import type { PageData, ActionData } from './$types'
    import AdminLayout from '$lib/components/layout/AdminLayout.svelte'

    let { data, form }: { data: PageData; form: ActionData } = $props()

    let showModal = $state(false)
</script>

<AdminLayout>
    <!-- Quick Add Modal -->
    {#if showModal}
        <div style="position:fixed;inset:0;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:50">
            <div style="background:white;padding:2rem;border-radius:8px;min-width:400px">
                <h2>Quick Add Category</h2>

                {#if form?.categoryError}
                    <p style="color:red">{form.categoryError}</p>
                {/if}

                <form method="POST" action="?/createCategory" use:enhance={() => {
                    return ({ result }) => {
                        if (result.type === 'success') showModal = false
                    }
                }}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Category name"
                        required
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Description (optional)"
                    />
                    <button type="submit">Add</button>
                    <button type="button" onclick={() => showModal = false}>Cancel</button>
                </form>
            </div>
        </div>
    {/if}

    <!-- Page -->
    <div>
        <div style="display:flex;justify-content:space-between;align-items:center">
            <div>
                <a href="/products">← Back to Products</a>
                <h1>Product Categories</h1>
            </div>
            <button onclick={() => showModal = true}>+ Add Category</button>
        </div>

        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Created</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {#each data.categories as category}
                    <tr>
                        <td>{category.name}</td>
                        <td>{category.description ?? '-'}</td>
                        <td>{category.created_at}</td>
                        <td>
                            <form method="POST" action="?/deleteCategory" use:enhance>
                                <input type="hidden" name="id" value={category.id} />
                                <button type="submit">Delete</button>
                            </form>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</AdminLayout>