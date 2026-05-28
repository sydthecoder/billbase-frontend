<script lang="ts">
    import { enhance } from '$app/forms'
    import type { PageData, ActionData } from './$types'
    import AdminLayout from '$lib/components/layout/AdminLayout.svelte'

    let { data, form }: { data: PageData; form: ActionData } = $props()

    // Line items state
    let items = $state([
        { product_id: '', description: '', quantity: 1, unit: '', unit_price: 0, is_taxable: true, discount_amount: '' }
    ])

    function addItem() {
        items.push({ product_id: '', description: '', quantity: 1, unit: '', unit_price: 0, is_taxable: true, discount_amount: '' })
    }

    function removeItem(index: number) {
        if (items.length === 1) return // keep at least one
        items.splice(index, 1)
    }

    // Auto-fill item from selected product
    function onProductSelect(index: number, event: Event) {
        const productId = Number((event.target as HTMLSelectElement).value)
        const product = data.products.find(p => p.id === productId)
        if (product) {
            items[index].description = product.name
            items[index].unit_price  = product.price
            items[index].unit        = product.unit ?? ''
            items[index].is_taxable  = product.is_taxable
        }
    }
</script>

<AdminLayout>
    <a href="/quotes">← Back</a>
    <h1>New Quote</h1>

    <form method="POST" use:enhance>
        {#if form?.error}
            <p style="color:red">{form.error}</p>
        {/if}

        <!-- Quote Details -->
        <select name="customer_id" required>
            <option value="">Select Customer</option>
            {#each data.customers as customer}
                <option value={customer.id}>{customer.full_name} {customer.company_name ? `(${customer.company_name})` : ''}</option>
            {/each}
        </select>

        <input type="text" name="title" placeholder="Quote Title (optional)" />

        <input type="date" name="issue_date" required />
        <input type="date" name="expires_at" required />

        <!-- Line Items -->
        <h3>Line Items</h3>

        {#each items as item, index}
            <div style="border:1px solid #ccc;padding:1rem;margin-bottom:1rem">
                <select
                    name="items[{index}][product_id]"
                    onchange={(e) => onProductSelect(index, e)}
                >
                    <option value="">Select Product (optional)</option>
                    {#each data.products as product}
                        <option value={product.id}>{product.name}</option>
                    {/each}
                </select>

                <input
                    type="text"
                    name="items[{index}][description]"
                    bind:value={item.description}
                    placeholder="Description"
                    required
                />

                <input
                    type="number"
                    name="items[{index}][quantity]"
                    bind:value={item.quantity}
                    placeholder="Qty"
                    min="0.01"
                    step="0.01"
                    required
                />

                <input
                    type="text"
                    name="items[{index}][unit]"
                    bind:value={item.unit}
                    placeholder="Unit (hr, kg...)"
                />

                <input
                    type="number"
                    name="items[{index}][unit_price]"
                    bind:value={item.unit_price}
                    placeholder="Unit Price"
                    min="0"
                    step="0.01"
                    required
                />

                <select name="items[{index}][is_taxable]" bind:value={item.is_taxable}>
                    <option value="true">Taxable</option>
                    <option value="false">Not Taxable</option>
                </select>

                <input
                    type="number"
                    name="items[{index}][discount_amount]"
                    bind:value={item.discount_amount}
                    placeholder="Item Discount"
                    min="0"
                    step="0.01"
                />

                <button type="button" onclick={() => removeItem(index)}>Remove</button>
            </div>
        {/each}

        <button type="button" onclick={addItem}>+ Add Line Item</button>

        <!-- Totals & Discounts -->
        <h3>Discounts & Notes</h3>

        <input type="number" name="discount_amount"  placeholder="Discount Amount"  min="0" step="0.01" />
        <input type="number" name="discount_percent" placeholder="Discount Percent" min="0" max="100" step="0.01" />

        <textarea name="notes"  placeholder="Notes"></textarea>
        <textarea name="footer" placeholder="Footer"></textarea>

        <button type="submit">Create Quote</button>
    </form>
</AdminLayout>