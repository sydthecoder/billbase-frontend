<script lang="ts">
    import AdminLayout from '$lib/components/layout/AdminLayout.svelte'
    import FormCard from '$lib/components/ui/FormCard.svelte'
    import ChevronRightIcon from '@lucide/svelte/icons/chevron-right'
    import SquarePenIcon from '@lucide/svelte/icons/square-pen'
    import CheckIcon from '@lucide/svelte/icons/check'
    import MailIcon from '@lucide/svelte/icons/mail'
    import PhoneIcon from '@lucide/svelte/icons/phone'

    const customer = {
        id: 1,
        full_name: 'Lerato Mokoena',
        customer_code: 'CUS10234',
        customer_type: 'business',
        status: 'active',
        email: 'lerato@skyline.co.za',
        phone: '+27 71 234 5678',
        company_name: 'Skyline Interiors',
        company_reg_number: '2019/458721/07',
        vat_number: '4570123456',
        street_address: '142 Long Street',
        suburb: 'City Bowl',
        city: 'Cape Town',
        province: 'Western Cape',
        postal_code: '8001',
        notes: 'Prefers email updates. Net 15 terms approved on 2024-10-03.',
        created_at: '2024-10-03',
        updated_at: '2025-02-14',
    }

    const statusClass =
        customer.status === 'active'
            ? 'bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-500'
            : 'bg-error-50 text-error-700 dark:bg-error-500/15 dark:text-error-500'
</script>

<AdminLayout>
    <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
            <h2 class="text-xl font-semibold text-gray-800 dark:text-white/90">
                Customer Details
            </h2>
        </div>

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
                        href="/customers"
                    >
                        Customers
                        <ChevronRightIcon size={18} />
                    </a>
                </li>
                <li class="text-sm text-gray-800 dark:text-white/90">
                    {customer.customer_code}
                </li>
            </ol>
        </nav>
    </div>

    <div class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3 lg:p-6">
        <div class="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div class="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div class="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-500 text-lg font-semibold text-white">
                    {customer.full_name.split(' ').map(n => n[0]).join('')}
                    <div class="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-success-500 text-white dark:border-gray-800">
                        <CheckIcon size={12} strokeWidth={3} />
                    </div>
                </div>

                <div>
                    <div class="flex flex-wrap items-center gap-3">
                        <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">
                            {customer.full_name}
                        </h3>
                    </div>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                        {customer.customer_code}
                    </p>
                </div>
            </div>

            <div class="flex flex-wrap gap-3">
                <button
                    type="button"
                    class="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-white/3"
                >
                    <SquarePenIcon size={16} />
                    Edit
                </button>
                <a
                    href="/customers/create"
                    class="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600"
                >
                    Create Invoice
                </a>
            </div>
        </div>
    </div>

    <div class="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div class="lg:col-span-2 space-y-6">
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormCard>
                    <p class="text-sm font-medium text-gray-700 dark:text-gray-300">Contact Person</p>
                    <dl class="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                        <div class="flex justify-between gap-3">
                            <dt class="text-gray-500 dark:text-gray-400">Email</dt>
                            <dd class="text-right">{customer.email}</dd>
                        </div>
                        <div class="flex justify-between gap-3">
                            <dt class="text-gray-500 dark:text-gray-400">Phone</dt>
                            <dd class="text-right">{customer.phone}</dd>
                        </div>
                        <div class="flex justify-between gap-3">
                            <dt class="text-gray-500 dark:text-gray-400">Customer Type</dt>
                            <dd class="text-right capitalize">{customer.customer_type}</dd>
                        </div>
                    </dl>
                </FormCard>

                {#if customer.customer_type === 'business' || customer.company_name}
                    <FormCard>
                        <p class="text-sm font-medium text-gray-700 dark:text-gray-300">Company Details</p>
                        <dl class="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                            <div class="flex justify-between gap-3">
                                <dt class="text-gray-500 dark:text-gray-400">Company Name</dt>
                                <dd class="text-right">{customer.company_name}</dd>
                            </div>
                            <div class="flex justify-between gap-3">
                                <dt class="text-gray-500 dark:text-gray-400">Reg Number</dt>
                                <dd class="text-right">{customer.company_reg_number}</dd>
                            </div>
                            <div class="flex justify-between gap-3">
                                <dt class="text-gray-500 dark:text-gray-400">VAT Number</dt>
                                <dd class="text-right">{customer.vat_number}</dd>
                            </div>
                        </dl>
                    </FormCard>
                {/if}
            </div>

            <FormCard>
                <p class="text-sm font-medium text-gray-700 dark:text-gray-300">Address</p>
                <div class="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 text-sm text-gray-600 dark:text-gray-300">
                    <div>
                        <p class="text-gray-500 dark:text-gray-400">Street Address</p>
                        <p class="mt-1">{customer.street_address}</p>
                    </div>
                    <div>
                        <p class="text-gray-500 dark:text-gray-400">Suburb</p>
                        <p class="mt-1">{customer.suburb}</p>
                    </div>
                    <div>
                        <p class="text-gray-500 dark:text-gray-400">City</p>
                        <p class="mt-1">{customer.city}</p>
                    </div>
                    <div>
                        <p class="text-gray-500 dark:text-gray-400">Province</p>
                        <p class="mt-1">{customer.province}</p>
                    </div>
                    <div>
                        <p class="text-gray-500 dark:text-gray-400">Postal Code</p>
                        <p class="mt-1">{customer.postal_code}</p>
                    </div>
                </div>
            </FormCard>

            <FormCard>
                <p class="text-sm font-medium text-gray-700 dark:text-gray-300">Notes</p>
                <p class="mt-3 text-sm text-gray-600 dark:text-gray-300">
                    {customer.notes}
                </p>
            </FormCard>
        </div>

        <div class="space-y-6">
            <FormCard>
                <p class="text-sm font-medium text-gray-700 dark:text-gray-300">Account</p>
                <dl class="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div class="flex justify-between gap-3">
                        <dt class="text-gray-500 dark:text-gray-400">Created</dt>
                        <dd>{customer.created_at}</dd>
                    </div>
                    <div class="flex justify-between gap-3">
                        <dt class="text-gray-500 dark:text-gray-400">Last Updated</dt>
                        <dd>{customer.updated_at}</dd>
                    </div>
                    <div class="flex justify-between gap-3">
                        <dt class="text-gray-500 dark:text-gray-400">Status</dt>
                        <dd class="capitalize">{customer.status}</dd>
                    </div>
                </dl>
            </FormCard>

        </div>
    </div>
</AdminLayout>
