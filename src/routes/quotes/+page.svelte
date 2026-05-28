<script lang="ts">
    import { enhance } from '$app/forms'
    import type { PageData } from './$types'
    import AdminLayout from '$lib/components/layout/AdminLayout.svelte'

    let { data }: { data: PageData } = $props()

    const statusColors: Record<string, string> = {
        draft:    'gray',
        sent:     'blue',
        viewed:   'purple',
        accepted: 'green',
        declined: 'red',
        expired:  'orange',
    }
</script>

<AdminLayout>
    <div>
        <div style="display:flex;justify-content:space-between;align-items:center">
            <h1>Quotes</h1>
            <a href="/quotes/create">+ New Quote</a>
        </div>

        <table>
            <thead>
                <tr>
                    <th>Number</th>
                    <th>Customer</th>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Issue Date</th>
                    <th>Expires</th>
                    <th>Total</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {#each data.quotes as quote}
                    <tr>
                        <td>{quote.quote_number}</td>
                        <td>{quote.customer.name}</td>
                        <td>{quote.title ?? '-'}</td>
                        <td>
                            <span style="color:{statusColors[quote.status]}">
                                {quote.status}
                            </span>
                        </td>
                        <td>{quote.issue_date}</td>
                        <td>{quote.expires_at}</td>
                        <td>R {quote.total}</td>
                        <td style="display:flex;gap:0.5rem;align-items:center">
                            <!-- View -->
                            <a href="/quotes/{quote.id}">View</a>

                            <a                        
                                href="/quotes/{quote.id}/pdf"
                                target="_blank"
                            >
                                PDF
                            </a>

                            <!-- Delete (only drafts) -->
                            {#if !quote.is_locked}
                                <form method="POST" action="?/delete" use:enhance>
                                    <input type="hidden" name="id" value={quote.id} />
                                    <button type="submit">Delete</button>
                                </form>
                            {/if}
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</AdminLayout>