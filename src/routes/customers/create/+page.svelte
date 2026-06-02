<script lang="ts">
    import { enhance } from '$app/forms'
    import type { ActionData } from './$types'
    import { enhanceWithToast } from '$lib/utils/formEnhance'
    import AdminLayout from '$lib/components/layout/AdminLayout.svelte'
    import FormCard from '$lib/components/ui/FormCard.svelte';
    import Label from '$lib/components/ui/forms/Label.svelte';
    import TextInput from '$lib/components/ui/forms/TextInput.svelte';
    import Select from '$lib/components/ui/forms/Select.svelte';
    import ChevronRightIcon from '@lucide/svelte/icons/chevron-right'
    import Alert from '$lib/components/ui/Alert.svelte'
    import ButtonLoader from '$lib/components/ui/forms/ButtonLoader.svelte';

    let loading = $state(false)
    let { form }: { form: ActionData } = $props()
</script>

<AdminLayout>
    <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-white/90">
            Create Customer
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
                        href="/customers"
                    >
                        Customers
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
            successMessage: 'Customer created successfully',
            errorMessage: form?.error ?? 'Failed to create customer',
            onSuccess: () => loading = false,
            onError: () => loading = false,
        })}
        class="space-y-6"
        onsubmit={() => { loading = true }}
    >
        {#if form?.error}
            <Alert variant="error" title="Error" message={form.error} />
        {/if}

        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div class="space-y-6">
                <div class="space-y-6">
                    <FormCard>
                        <div class="grid grid-cols-1 gap-5 lg:grid-cols-2">
                            <div>
                                <Label for="fName" text="First Name" required />
                                <TextInput id="fName" name="first_name" placeholder="First Name" />
                            </div>

                            <div>
                                <Label for="lName" text="Last Name" required />
                                <TextInput id="lName" name="last_name" placeholder="Last Name" />
                            </div>

                            <div>
                                <Label for="email" text="Email" required />
                                <TextInput id="email" name="email" type="email" placeholder="Email" />
                            </div>

                            <div>
                                <Label for="phone" text="Phone Number" />
                                <TextInput id="phone" name="phone" type="tel" placeholder="Phone Number" />
                            </div>
                        </div>
                    </FormCard>
                </div>

                <div class="space-y-6">
                    <FormCard>
                        <div class="grid grid-cols-1 gap-5 lg:grid-cols-2">
                            <div>
                                <Label for="cname" text="Company Name" />
                                <TextInput id="cname" name="company_name" placeholder="Company Name" />
                            </div>

                            <div>
                                <Label for="regNum" text="Registration Number" />
                                <TextInput id="regNum" name="company_reg_number" placeholder="Registration Number" />
                            </div>

                            <div>
                                <Label for="vatNum" text="VAT Number" />
                                <TextInput id="vatNum" name="vat_number" placeholder="VAT Number" />
                            </div>
                        </div>
                    </FormCard>
                </div>
            
            </div>

            <div class="space-y-6">
                <FormCard>
                    <div class="grid grid-cols-1 gap-5 lg:grid-cols-2">
                        <div>
                            <Label for="streetAddress" text="Street Address" />
                            <TextInput id="streetAddress" name="street_address" placeholder="Street Address" />
                        </div>

                        <div>
                            <Label for="suburb" text="Suburb" />
                            <TextInput id="suburb" name="suburb" placeholder="Suburb" />
                        </div>

                        <div>
                            <Label for="city" text="City" />
                            <TextInput id="city" name="city" placeholder="City" />
                        </div>

                        <div>
                            <Label for="postalCode" text="Postal Code" />
                            <TextInput id="postalCode" name="postal_code" placeholder="Postal Code" />
                        </div>

                        <div>
                            <Label for="province" text="Province" />
                            <Select
                                id="province"
                                name="province"
                                placeholder="Select Province"
                                options={[
                                    { value: 'EC', label: 'Eastern Cape' },
                                    { value: 'FS', label: 'Free State' },
                                    { value: 'GP', label: 'Gauteng' },
                                    { value: 'KZN', label: 'KwaZulu-Natal' },
                                    { value: 'LP', label: 'Limpopo' },
                                    { value: 'MP', label: 'Mpumalanga' },
                                    { value: 'NC', label: 'Northern Cape' },
                                    { value: 'NW', label: 'North West' },
                                    { value: 'WC', label: 'Western Cape' },
                                ]}
                            />
                        </div>
                    </div>
                </FormCard>
            </div>
        </div>

        <div class="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <a
                href="/customers"
                class="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
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
                    Create Customer
                {/if}
            </button>
        </div>
    </form>
</AdminLayout>