<script lang="ts">
    import AdminLayout from '$lib/components/layout/AdminLayout.svelte'
    import FormCard from '$lib/components/ui/FormCard.svelte'
    import Label from '$lib/components/ui/forms/Label.svelte'
    import TextInput from '$lib/components/ui/forms/TextInput.svelte'
    import Select from '$lib/components/ui/forms/Select.svelte'
    import ChevronRightIcon from '@lucide/svelte/icons/chevron-right'
    import Building2Icon from '@lucide/svelte/icons/building-2'
    import PaletteIcon from '@lucide/svelte/icons/palette'
    import ReceiptIcon from '@lucide/svelte/icons/receipt'
    import CloudUploadIcon from '@lucide/svelte/icons/cloud-upload'

    let activeTab = $state('general')

    const tabs = [
        { id: 'general', label: 'General', icon: Building2Icon },
        { id: 'branding', label: 'Branding', icon: PaletteIcon },
        { id: 'tax', label: 'Tax Settings', icon: ReceiptIcon },
    ]

    // Form states (static demo)
    let generalForm = $state({
        orgName: 'Skyline Enterprises',
        email: 'billing@skyline.co.za',
        phone: '+27 21 555 0199',
        website: 'https://skyline.co.za',
        address: '42 Kloof Street',
        city: 'Cape Town',
        province: 'Western Cape',
        postalCode: '8001'
    })

    let brandingForm = $state({
        brandColor: '#4f46e5',
        pdfFont: 'inter',
    })

    let taxForm = $state({
        taxId: 'VAT-481923485',
        defaultTaxRate: '15',
        isTaxInclusive: 'false'
    })

</script>

<AdminLayout>
    <div class="flex flex-wrap items-center justify-between gap-3 mb-6 lg:mb-8">
        <div>
            <h2 class="text-xl font-semibold text-gray-800 dark:text-white/90">
                Settings
            </h2>
        </div>

        <nav>
            <ol class="flex items-center gap-1.5">
                <li>
                    <a href="/" class="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                        Home
                        <ChevronRightIcon size={18} />
                    </a>
                </li>
                <li class="text-sm text-gray-800 dark:text-white/90">
                    Settings
                </li>
            </ol>
        </nav>
    </div>

    <!-- Layout: Sidebar Menu + Content -->
    <div class="flex flex-col gap-6 lg:flex-row lg:items-start">
        <!-- Sidebar Tabs -->
        <div class="flex flex-row lg:flex-col gap-1 w-full lg:w-56 xl:w-64 shrink-0 overflow-x-auto no-scrollbar">
            {#each tabs as tab}
                {@const Icon = tab.icon}
                <button
                    type="button"
                    onclick={() => activeTab = tab.id}
                    class={`flex shrink-0 lg:shrink items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                        activeTab === tab.id
                            ? 'bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-800/50 dark:hover:text-gray-200'
                    }`}
                >
                    <Icon size={18} />
                    {tab.label}
                </button>
            {/each}
        </div>

        <div class="flex-1 w-full">
            <form onsubmit={(e) => e.preventDefault()} class="space-y-6">
                <!-- GENERAL TAB -->
                {#if activeTab === 'general'}
                    <div class="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div>
                            <h3 class="text-base font-semibold text-gray-800 dark:text-white/90 mb-4">Organization Profile</h3>
                            
                            <FormCard>
                                <div class="grid grid-cols-1 gap-5 lg:grid-cols-2">
                                    <div>
                                        <Label for="orgName" text="Organization Name" required />
                                        <TextInput id="orgName" name="orgName" bind:value={generalForm.orgName} />
                                    </div>

                                    <div>
                                        <Label for="website" text="Website" />
                                        <TextInput id="website" name="website" type="url" bind:value={generalForm.website} />
                                    </div>

                                    <div>
                                        <Label for="email" text="Contact Email" required />
                                        <TextInput id="email" name="email" type="email" bind:value={generalForm.email} />
                                    </div>

                                    <div>
                                        <Label for="phone" text="Phone Number" />
                                        <TextInput id="phone" name="phone" type="tel" bind:value={generalForm.phone} />
                                    </div>
                                </div>
                            </FormCard>
                        </div>

                        <div>
                            <h3 class="text-base font-semibold text-gray-800 dark:text-white/90 mb-4">Registered Address</h3>
                            
                            <FormCard>
                                <div class="grid grid-cols-1 gap-5 lg:grid-cols-2">
                                    <div class="col-span-1 lg:col-span-2">
                                        <Label for="address" text="Street Address" />
                                        <TextInput id="address" name="address" bind:value={generalForm.address} />
                                    </div>

                                    <div>
                                        <Label for="city" text="City" />
                                        <TextInput id="city" name="city" bind:value={generalForm.city} />
                                    </div>

                                    <div>
                                        <Label for="province" text="Province / State" />
                                        <Select
                                            id="province"
                                            name="province"
                                            bind:value={generalForm.province}
                                            options={[
                                                { value: 'Eastern Cape', label: 'Eastern Cape' },
                                                { value: 'Free State', label: 'Free State' },
                                                { value: 'Gauteng', label: 'Gauteng' },
                                                { value: 'KwaZulu-Natal', label: 'KwaZulu-Natal' },
                                                { value: 'Western Cape', label: 'Western Cape' },
                                            ]}
                                        />
                                    </div>

                                    <div>
                                        <Label for="postalCode" text="Postal Code" />
                                        <TextInput id="postalCode" name="postalCode" bind:value={generalForm.postalCode} />
                                    </div>
                                </div>
                            </FormCard>
                        </div>
                    </div>
                {/if}

                <!-- BRANDING TAB -->
                {#if activeTab === 'branding'}
                    <div class="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div>
                            <h3 class="text-base font-semibold text-gray-800 dark:text-white/90">Visual Identity</h3>
                            <p class="text-sm text-gray-500 dark:text-gray-400 mb-4 mt-1">Customize how your brand is presented to customers.</p>
                            
                            <FormCard>
                                <div class="space-y-6">
                                    <div>
                                        <Label for="logo" text="Company Logo" />
                                        <div class="mt-2 flex items-center justify-center rounded-xl border border-dashed border-gray-300 px-6 py-8 dark:border-gray-700 dark:bg-white/[0.02]">
                                            <div class="text-center">
                                                <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
                                                    <CloudUploadIcon size={24} />
                                                </div>
                                                <div class="mt-4 flex text-sm text-gray-600 dark:text-gray-400 leading-6">
                                                    <label for="file-upload" class="relative cursor-pointer rounded-md bg-transparent font-medium text-brand-600 hover:text-brand-500 focus-within:outline-none dark:text-brand-400 dark:hover:text-brand-300">
                                                        <span>Upload a file</span>
                                                        <input id="file-upload" name="file-upload" type="file" class="sr-only" accept="image/png, image/jpeg, image/svg+xml">
                                                    </label>
                                                    <p class="pl-1">or drag and drop</p>
                                                </div>
                                                <p class="text-xs text-gray-500 dark:text-gray-500">PNG, JPG, SVG up to 2MB</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="grid grid-cols-1 gap-5 lg:grid-cols-2 pt-2">
                                        <div>
                                            <Label for="brandColor" text="Primary Brand Color" />
                                            <div class="mt-1 flex items-center gap-3">
                                                <input 
                                                    type="color" 
                                                    id="brandColor" 
                                                    name="brandColor" 
                                                    bind:value={brandingForm.brandColor}
                                                    class="h-11 w-14 cursor-pointer rounded-lg border border-gray-300 bg-white p-1 dark:border-gray-700 dark:bg-gray-900"
                                                />
                                                <TextInput id="brandColorHex" name="brandColorHex" bind:value={brandingForm.brandColorHex} placeholder="#000000" />
                                            </div>
                                        </div>

                                        <div>
                                            <Label for="pdfFont" text="Document Typography" />
                                            <Select
                                                id="pdfFont"
                                                name="pdfFont"
                                                bind:value={brandingForm.pdfFont}
                                                options={[
                                                    { value: 'inter', label: 'Inter (Sans Serif)' },
                                                    { value: 'roboto', label: 'Roboto (Sans Serif)' },
                                                    { value: 'merriweather', label: 'Merriweather (Serif)' },
                                                    { value: 'ibm-plex', label: 'IBM Plex (Serif)' },
                                                ]}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </FormCard>
                        </div>
                    </div>
                {/if}

                <!-- TAX SETTINGS TAB -->
                {#if activeTab === 'tax'}
                    <div class="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div>
                            <h3 class="text-base font-semibold text-gray-800 dark:text-white/90">Tax & Compliance</h3>
                            <p class="text-sm text-gray-500 dark:text-gray-400 mb-4 mt-1">Configure your default tax rates and registration rules.</p>
                            
                            <FormCard>
                                <div class="grid grid-cols-1 gap-5 lg:grid-cols-2">
                                    <div>
                                        <Label for="taxId" text="Tax ID / VAT Number" />
                                        <TextInput id="taxId" name="taxId" bind:value={taxForm.taxId} placeholder="e.g. VAT123456789" />
                                        <p class="mt-1.5 text-xs text-gray-500 dark:text-gray-400">Displayed on documents if provided.</p>
                                    </div>

                                    <div>
                                        <Label for="defaultTaxRate" text="Default Tax Rate (%)" />
                                        <div class="relative">
                                            <TextInput id="defaultTaxRate" name="defaultTaxRate" type="number" bind:value={taxForm.defaultTaxRate} />
                                            <div class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-500 dark:text-gray-400 text-sm">
                                                %
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-span-1 lg:col-span-2 pt-2">
                                        <Label for="isTaxInclusive" text="Item Pricing Model" />
                                        <Select
                                            id="isTaxInclusive"
                                            name="isTaxInclusive"
                                            bind:value={taxForm.isTaxInclusive}
                                            options={[
                                                { value: 'false', label: 'Exclusive of Tax (Tax added to total)' },
                                                { value: 'true', label: 'Inclusive of Tax (Tax included in item price)' }
                                            ]}
                                        />
                                    </div>
                                </div>
                            </FormCard>
                        </div>
                    </div>
                {/if}

                <!-- Save Action -->
                <div class="flex items-center justify-end gap-3 border-t border-gray-200 dark:border-gray-800 pt-6">
                    <button
                        type="button"
                        class="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/3"
                    >
                        Discard Changes
                    </button>
                    <button
                        type="button"
                        class="flex items-center justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600"
                    >
                        Save Settings
                    </button>
                </div>
            </form>
        </div>
    </div>
</AdminLayout>