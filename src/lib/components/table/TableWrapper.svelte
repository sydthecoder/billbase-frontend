<script lang="ts">
    import type { Snippet } from 'svelte'

    interface TableWrapperProps {
        children: Snippet
    }

    let { children }: TableWrapperProps = $props()
</script>

<div class="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
    {@render children()}
</div>