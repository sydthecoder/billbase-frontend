<script lang="ts">
    import { enhance } from '$app/forms'
    import type { PageData, ActionData } from './$types'
    import AdminLayout from '$lib/components/layout/AdminLayout.svelte'

    let { data, form }: { data: PageData; form: ActionData } = $props()

    let showModal = $state(false)
</script>

<AdminLayout>
    <!-- Quick Add Category Modal -->
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

                <hr />

                <a href="/products/categories">Manage all categories →</a>
            </div>
        </div>
    {/if}

    <!-- Page -->
    <div>
        <div style="display:flex;justify-content:space-between;align-items:center">
            <h1>Products</h1>
            <div>
                <button onclick={() => showModal = true}>+ Add Category</button>
                <a href="/products/create">+ Add Product</a>
            </div>
        </div>

        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Unit</th>
                    <th>SKU</th>
                    <th>Taxable</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {#each data.products as product}
                    <tr>
                        <td>{product.name}</td>
                        <td>{product.category?.name ?? '-'}</td>
                        <td>R {product.price}</td>
                        <td>{product.unit_label ?? '-'}</td>
                        <td>{product.sku ?? '-'}</td>
                        <td>{product.is_taxable ? 'Yes' : 'No'}</td>
                        <td>{product.status}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</AdminLayout>