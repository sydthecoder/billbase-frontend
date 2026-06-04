<script lang="ts">
    import { enhance } from '$app/forms'
    import type { PageData, ActionData } from './$types'
    import { enhanceWithToast } from '$lib/utils/formEnhance'
    import AdminLayout from '$lib/components/layout/AdminLayout.svelte'
    import FormCard from '$lib/components/ui/FormCard.svelte'
    import Label from '$lib/components/ui/forms/Label.svelte'
    import TextInput from '$lib/components/ui/forms/TextInput.svelte'
    import Select from '$lib/components/ui/forms/Select.svelte'
    import ChevronRightIcon from '@lucide/svelte/icons/chevron-right'
    import PlusIcon from '@lucide/svelte/icons/plus'
    import Trash2Icon from '@lucide/svelte/icons/trash-2'
    import Alert from '$lib/components/ui/Alert.svelte'
    import ButtonLoader from '$lib/components/ui/forms/ButtonLoader.svelte'

    let { data, form }: { data: PageData; form: ActionData } = $props()
    let loading = $state(false)

    // Line items state
    let items = $state([
        { product_id: '', description: '', quantity: 1, unit: '', unit_price: 0, is_taxable: true, discount_amount: '' }
    ])

    function addItem() {
        items.push({ product_id: '', description: '', quantity: 1, unit: '', unit_price: 0, is_taxable: true, discount_amount: '' })
    }

    function removeItem(index: number) {
        if (items.length === 1) return
        items.splice(index, 1)
    }

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

    // Build product options once
    let productOptions = $derived(data.products.map(p => ({ value: p.id, label: p.name })))

    // Build customer options once
    let customerOptions = $derived(data.customers.map(c => ({
        value: c.id,
        label: c.company_name ? `${c.full_name} (${c.company_name})` : c.full_name
    })))
</script>

<AdminLayout>
    <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-white/90">
            Create Quote
        </h2>

        <nav>
            <ol class="flex items-center gap-1.5">
                <li>
                    <a
                        class="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
                        href="/"
                    >
                        Home
                        <ChevronRightIcon size={18} />
                    </a>
                </li>
                <li>
                    <a
                        class="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
                        href="/quotes"
                    >
                        Quotes
                        <ChevronRightIcon size={18} />
                    </a>
                </li>
                <li class="text-sm text-gray-800 dark:text-white/90">
                    Create
                </li>
            </ol>
        </nav>
    </div>

    <form 
        method="POST"
        use:enhance={enhanceWithToast({
            successMessage: 'Quote created successfully',
            errorMessage: 'Failed to create quote',
            onSuccess: () => loading = false,
            onError: () => loading = false,
        })}
        class="space-y-6"
        onsubmit={() => { loading = true }}
    >
        {#if form?.error}
            <Alert variant="error" title="Error" message={form.error} />
        {/if}

        <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div class="space-y-6">
                <FormCard>
                    <div class="grid grid-cols-1 gap-5">
                        <div>
                            <Label for="customer" text="Customer" required />
                            <Select
                                id="customer"
                                name="customer_id"
                                placeholder="Select Customer"
                                options={customerOptions}
                                required
                            />
                        </div>

                        <div>
                            <Label for="title" text="Title" />
                            <TextInput id="title" name="title" placeholder="Quote Title (optional)" />
                        </div>
                    </div>
                </FormCard>

                <FormCard>
                    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div>
                            <Label for="issueDate" text="Issue Date" required />
                            <TextInput id="issueDate" name="issue_date" type="date" required />
                        </div>

                        <div>
                            <Label for="expiresAt" text="Expires At" required />
                            <TextInput id="expiresAt" name="expires_at" type="date" required />
                        </div>
                    </div>
                </FormCard>
            </div>

            <div class="space-y-6">
                <FormCard>
                    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div>
                            <Label for="discountAmount" text="Discount Amount" />
                            <TextInput
                                id="discountAmount"
                                name="discount_amount"
                                type="number"
                                placeholder="0.00"
                                min="0"
                                step="0.01"
                            />
                        </div>

                        <div>
                            <Label for="discountPercent" text="Discount Percent" />
                            <TextInput
                                id="discountPercent"
                                name="discount_percent"
                                type="number"
                                placeholder="0"
                                min="0"
                                max="100"
                                step="0.01"
                            />
                        </div>
                    </div>
                </FormCard>

                <FormCard>
                    <div class="grid grid-cols-1 gap-5">
                        <div>
                            <Label for="notes" text="Notes" />
                            <textarea
                                id="notes"
                                name="notes"
                                rows="3"
                                placeholder="Notes"
                                class="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:placeholder-gray-500"
                            ></textarea>
                        </div>

                        <div>
                            <Label for="footer" text="Footer" />
                            <textarea
                                id="footer"
                                name="footer"
                                rows="3"
                                placeholder="Footer"
                                class="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:placeholder-gray-500"
                            ></textarea>
                        </div>
                    </div>
                </FormCard>
            </div>
        </div>

        <div class="space-y-4">
            <div class="flex items-center justify-between">
                <h3 class="text-lg font-medium text-gray-800 dark:text-white/90">Line Items</h3>
            </div>

            {#each items as item, index}
                <FormCard>
                    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div>
                            <Label for="itemProduct{index}" text="Product" />
                            <Select
                                id="itemProduct{index}"
                                name="items[{index}][product_id]"
                                placeholder="Select Product (optional)"
                                options={productOptions}
                                onchange={(e) => onProductSelect(index, e)}
                            />
                        </div>

                        <div class="lg:col-span-2">
                            <Label for="itemDesc{index}" text="Description" required />
                            <TextInput
                                id="itemDesc{index}"
                                name="items[{index}][description]"
                                bind:value={items[index].description}
                                placeholder="Description"
                                required
                            />
                        </div>

                        <div>
                            <Label for="itemQty{index}" text="Quantity" required />
                            <TextInput
                                id="itemQty{index}"
                                name="items[{index}][quantity]"
                                bind:value={item.quantity}
                                type="number"
                                placeholder="0"
                                min="0.01"
                                step="0.01"
                                required
                            />
                        </div>

                        <div>
                            <Label for="itemUnit{index}" text="Unit" />
                            <TextInput
                                id="itemUnit{index}"
                                name="items[{index}][unit]"
                                bind:value={item.unit}
                                placeholder="hr, kg..."
                            />
                        </div>

                        <div>
                            <Label for="itemPrice{index}" text="Unit Price" required />
                            <TextInput
                                id="itemPrice{index}"
                                name="items[{index}][unit_price]"
                                bind:value={item.unit_price}
                                type="number"
                                placeholder="0.00"
                                min="0"
                                step="0.01"
                                required
                            />
                        </div>

                        <div>
                            <Label for="itemTaxable{index}" text="Tax" />
                            <Select
                                id="itemTaxable{index}"
                                name="items[{index}][is_taxable]"
                                bind:value={item.is_taxable}
                                options={[
                                    { value: true, label: 'Taxable' },
                                    { value: false, label: 'Not Taxable' },
                                ]}
                            />
                        </div>

                        <div>
                            <Label for="itemDiscount{index}" text="Item Discount" />
                            <TextInput
                                id="itemDiscount{index}"
                                name="items[{index}][discount_amount]"
                                bind:value={item.discount_amount}
                                type="number"
                                placeholder="0.00"
                                min="0"
                                step="0.01"
                            />
                        </div>

                        <div class="flex items-end">
                            <button
                                type="button"
                                onclick={() => removeItem(index)}
                                disabled={items.length === 1}
                                class="flex w-full items-center justify-center gap-1.5 rounded-lg border border-error-300 bg-white px-4 py-2.5 text-sm font-medium text-error-600 hover:bg-error-50 disabled:opacity-50 disabled:cursor-not-allowed dark:border-error-800 dark:bg-gray-800 dark:text-error-400 dark:hover:bg-error-950 sm:w-auto"
                            >
                                <Trash2Icon size={16} />
                                Remove
                            </button>
                        </div>
                    </div>
                </FormCard>
            {/each}

            <button
                type="button"
                onclick={addItem}
                class="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 hover:border-brand-500 hover:text-brand-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-brand-400 dark:hover:text-brand-400 sm:w-auto"
            >
                <PlusIcon size={16} />
                Add Line Item
            </button>
        </div>

        <div class="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <a
                href="/quotes"
                class="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/3 sm:w-auto"
            >
                Cancel
            </a>

            <button
                type="submit"
                disabled={loading}
                class="flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 disabled:opacity-60 sm:w-auto"
            >
                {#if loading}
                    <ButtonLoader />
                {:else}
                    Create Quote
                {/if}
            </button>
        </div>
    </form>
</AdminLayout>