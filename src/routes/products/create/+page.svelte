<script lang="ts">
    import { enhance } from '$app/forms'
    import type { ActionData } from './$types'
    import { enhanceWithToast } from '$lib/utils/formEnhance'
    import AdminLayout from '$lib/components/layout/AdminLayout.svelte'
    import BaseModal from '$lib/components/ui/BaseModal.svelte'
    import FormCard from '$lib/components/ui/FormCard.svelte'
    import Label from '$lib/components/ui/forms/Label.svelte'
    import TextInput from '$lib/components/ui/forms/TextInput.svelte'
    import Select from '$lib/components/ui/forms/Select.svelte'
    import Alert from '$lib/components/ui/Alert.svelte'
    import ButtonLoader from '$lib/components/ui/forms/ButtonLoader.svelte'
    import ChevronRightIcon from '@lucide/svelte/icons/chevron-right'
    import PlusIcon from '@lucide/svelte/icons/plus'

    let { data, form }: { data: PageData; form: ActionData } = $props()

    let showModal = $state(false)
    let loading = $state(false)
</script>

<AdminLayout>
    <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-white/90">
            Create Product
        </h2>

        <nav>
            <ol class="flex items-center gap-1.5">
                <li>
                    <a
                        href="/"
                        class="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
                    >
                        Home
                        <ChevronRightIcon size={18} />
                    </a>
                </li>
                <li>
                    <a
                        href="/products"
                        class="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
                    >
                        Products
                        <ChevronRightIcon size={18} />
                    </a>
                </li>
                <li class="text-sm text-gray-800 dark:text-white/90">
                    Create
                </li>
            </ol>
        </nav>
    </div>

    <BaseModal open={showModal} title="Add Category" onClose={() => showModal = false}>
        {#snippet children()}
            <form
                id="categoryForm"
                method="POST"
                action="?/createCategory"
                use:enhance={enhanceWithToast({
                    successMessage: 'Category created successfully',
                    errorMessage: 'Failed to create category',
                    onSuccess: () => showModal = false,
                })}
            >
                <div class="space-y-4">
                    <div>
                        <Label for="name" text="Name" required />
                        <TextInput id="name" name="name" placeholder="Category name" required />
                    </div>
                    <div>
                        <Label for="description" text="Description" />
                        <TextInput id="description" name="description" placeholder="Optional" />
                    </div>
                </div>
            </form>
        {/snippet}

        {#snippet footer()}
            <button
                type="button"
                onclick={() => showModal = false}
                class="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-transparent dark:text-gray-300"
            >
                Cancel
            </button>
            <button
                type="submit"
                form="categoryForm"
                class="flex-1 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600"
            >
                Add Category
            </button>
        {/snippet}
    </BaseModal>

    <form
        method="POST"
        use:enhance={enhanceWithToast({
            successMessage: 'Product created successfully',
            errorMessage: form?.error ?? 'Failed to create product',
            onSuccess: () => loading = false,
            onError: () => loading = false,
        })}
        class="space-y-6"
        onsubmit={() => { loading = true }}
        action="?/createProduct"
    >
        {#if form?.error}
            <Alert variant="error" title="Error" message={form.error} />
        {/if}

        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">

            <!-- Left column -->
            <div class="space-y-6">
                <FormCard title="Product Details" desc="Basic product information">
                    <div class="grid grid-cols-1 gap-5 lg:grid-cols-2">
                        <div class="lg:col-span-2">
                            <Label for="name" text="Product Name" required />
                            <TextInput
                                id="name"
                                name="name"
                                placeholder="Product Name"
                                value={form?.name ?? ''}
                                required
                            />
                        </div>

                        <div>
                            <Label for="price" text="Price" required />
                            <TextInput
                                id="price"
                                name="price"
                                type="number"
                                placeholder="0.00"
                                value={form?.price ?? ''}
                                required
                            />
                        </div>

                        <div>
                            <Label for="sku" text="SKU" />
                            <TextInput
                                id="sku"
                                name="sku"
                                placeholder="SKU"
                                value={form?.sku ?? ''}
                            />
                        </div>

                        <div>
                            <Label for="unit" text="Unit" />
                            <TextInput
                                id="unit"
                                name="unit"
                                placeholder="e.g. hr, kg, item"
                                value={form?.unit ?? ''}
                            />
                        </div>

                        <div>
                            <Label for="category" text="Category" />
                            <div class="flex justify-between gap-2">
                                <div class="w-full">
                                    <Select
                                        id="category"
                                        name="product_category_id"
                                        placeholder="No Category"
                                        options={data.categories.map(c => ({
                                            value: String(c.id),
                                            label: c.name,
                                        }))}
                                    />
                                </div>
                                <button 
                                    type="button"
                                    onclick={() => showModal = true}
                                    class="cursor-pointer flex h-10 w-12 items-center justify-center rounded-lg bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 transition-colors"
                                >
                                    <PlusIcon size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </FormCard>

                <!-- Tax -->
                <FormCard title="Tax Settings" desc="Configure tax for this product">
                    <div>
                        <Label for="is_taxable" text="Tax" />
                        <Select
                            id="is_taxable"
                            name="is_taxable"
                            placeholder="Select"
                            options={[
                                { value: 'true',  label: 'Taxable' },
                                { value: 'false', label: 'Not Taxable' },
                            ]}
                        />
                    </div>
                </FormCard>
            </div>

            <!-- Right column -->
            <div class="space-y-6">
                <!-- Description -->
                <FormCard title="Description" desc="Optional product description">
                    <div>
                        <Label for="description" text="Description" />
                        <textarea
                            id="description"
                            name="description"
                            rows={6}
                            placeholder="Enter product description..."
                            class="dark:bg-dark-900 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                        >{form?.description ?? ''}</textarea>
                    </div>
                </FormCard>

                <!-- Status -->
                <FormCard title="Status" desc="Set the product status">
                    <div>
                        <Label for="status" text="Status" />
                        <Select
                            id="status"
                            name="status"
                            placeholder="Select Status"
                            options={[
                                { value: 'active',   label: 'Active' },
                                { value: 'inactive', label: 'Inactive' },
                            ]}
                        />
                    </div>
                </FormCard>
            </div>
        </div>

        <div class="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <a
                href="/products"
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
                    Create Product
                {/if}
            </button>
        </div>
    </form>
</AdminLayout>