<script lang="ts">
    import type { PageData } from './$types'
    import AdminLayout from '$lib/components/layout/AdminLayout.svelte'

    let { data }: { data: PageData } = $props()
</script>

<AdminLayout>
    <h1>Hey, {data.user!.first_name}! 👋</h1>
    <p>Welcome to BillBase.</p>
</AdminLayout>