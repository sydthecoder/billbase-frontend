<script lang="ts">
    import type { PageData } from './$types'
    import AdminLayout from '$lib/components/layout/AdminLayout.svelte'

    let { data }: { data: PageData } = $props()
</script>

<AdminLayout>
    <a href="/customers/create">Add Customer</a>

    <table>
        <thead>
            <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Type</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            {#each data.customers as customer}
                <tr>
                    <td>{customer.customer_code}</td>
                    <td>{customer.full_name}</td>
                    <td>..</td>
                    <td>{customer.email}</td>
                    <td>{customer.phone ?? '-'}</td>
                    <td>{customer.status}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</AdminLayout>