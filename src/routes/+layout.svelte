<script lang="ts">
    import '$lib/assets/app.css'
    import { Toaster } from 'svelte-hot-french-toast'

    let { children } = $props()
</script>

<Toaster />
{@render children()}