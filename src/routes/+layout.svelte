<script lang="ts">
    import '$lib/assets/app.css'
    import { ModeWatcher } from 'mode-watcher'
    import { Toaster } from 'svelte-hot-french-toast'

    let { children } = $props()
</script>

<ModeWatcher />
<Toaster />
{@render children()}