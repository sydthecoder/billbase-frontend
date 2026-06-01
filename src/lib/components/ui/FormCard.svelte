<script lang="ts">
    import type { Snippet } from 'svelte'

    interface FormCardProps {
        className?: string
        children: Snippet
    }

    let { className = '', children }: FormCardProps = $props()
</script>

<div class={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3 ${className}`}>
    <!-- <div class="px-6 py-5">
        <h3 class="text-base font-medium text-gray-800 dark:text-white/90">
            {title}
        </h3>

        {#if desc}
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {desc}
            </p>
        {/if}
    </div> -->

    <div class="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
        <div class="space-y-5">
            {@render children()}
        </div>
    </div>
</div>