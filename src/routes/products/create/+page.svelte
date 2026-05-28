<script lang="ts">
    import { enhance } from '$app/forms'
    import type { PageData, ActionData } from './$types'
    import AdminLayout from '$lib/components/layout/AdminLayout.svelte'

    let { data, form }: { data: PageData; form: ActionData } = $props()
</script>

<AdminLayout>
    <a href="/products">Back</a>

    <form method="POST" use:enhance>
        {#if form?.error}
            <p>{form.error}</p>
        {/if}

        <input
            type="text"
            name="name"
            value={form?.name ?? ''}
            placeholder="Product Name"
            required
        />

        <textarea name="description">{form?.description ?? ''}</textarea>

        <input
            type="number"
            name="price"
            value={form?.price ?? ''}
            placeholder="Price"
            step="0.01"
            min="0"
            required
        />

        <input
            type="text"
            name="sku"
            value={form?.sku ?? ''}
            placeholder="SKU"
        />

        <input
            type="text"
            name="unit"
            value={form?.unit ?? ''}
            placeholder="Unit (e.g. hr, kg)"
        />

        <select name="product_category_id">
            <option value="">No Category</option>
            {#each data.categories as category}
                <option value={category.id}>{category.name}</option>
            {/each}
        </select>

        <select name="is_taxable">
            <option value="true">Taxable</option>
            <option value="false">Not Taxable</option>
        </select>

        <button type="submit">Create Product</button>
    </form>
</AdminLayout>