<script lang="ts">
    import { enhance } from '$app/forms'
    import type { ActionData } from './$types'
    import AdminLayout from '$lib/components/layout/AdminLayout.svelte'

    let { form }: { form: ActionData } = $props()

    let customerType = $derived(form?.customer_type ?? 'individual')
</script>

<AdminLayout>
    <a href="/customers">Back</a>

    <form method="POST" use:enhance>
        {#if form?.error}
            <p>{form.error}</p>
        {/if}

        <select name="customer_type" bind:value={customerType}>
            <option value="individual">Individual</option>
            <option value="business">Business</option>
        </select>

        {#if customerType === 'business'}
            <input
                type="text"
                name="company_name"
                value={form?.company_name ?? ''}
                placeholder="Company Name"
            />
            <input
                type="text"
                name="company_reg_number"
                value={form?.company_reg_number ?? ''}
                placeholder="Registration Number"
            />
            <input
                type="text"
                name="vat_number"
                value={form?.vat_number ?? ''}
                placeholder="VAT Number"
            />
        {/if}

        <input
            type="text"
            name="first_name"
            value={form?.first_name ?? ''}
            placeholder="First Name"
            required
        />
        <input
            type="text"
            name="last_name"
            value={form?.last_name ?? ''}
            placeholder="Last Name"
            required
        />
        <input
            type="email"
            name="email"
            value={form?.email ?? ''}
            placeholder="Email"
            required
        />
        <input
            type="text"
            name="phone"
            value={form?.phone ?? ''}
            placeholder="Phone"
        />
        <input
            type="text"
            name="street_address"
            value={form?.street_address ?? ''}
            placeholder="Street Address"
        />
        <input
            type="text"
            name="suburb"
            value={form?.suburb ?? ''}
            placeholder="Suburb"
        />
        <input
            type="text"
            name="city"
            value={form?.city ?? ''}
            placeholder="City"
        />
        <input
            type="text"
            name="province"
            value={form?.province ?? ''}
            placeholder="Province"
        />
        <input
            type="text"
            name="postal_code"
            value={form?.postal_code ?? ''}
            placeholder="Postal Code"
        />
        <textarea name="notes">{form?.notes ?? ''}</textarea>

        <button type="submit">Create Customer</button>
    </form>
</AdminLayout>