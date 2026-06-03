<script lang="ts">
    import type { Snippet } from 'svelte'
    import XIcon from '@lucide/svelte/icons/x'
    import { fade, scale } from 'svelte/transition'

    interface BaseModalProps {
        open: boolean
        title: string
        onClose: () => void
        children: Snippet
        footer?: Snippet
        size?: 'sm' | 'md' | 'lg'
    }

    let {
        open,
        title,
        onClose,
        children,
        footer,
        size = 'md',
    }: BaseModalProps = $props()

    const sizeClass = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
    }
</script>

{#if open}
    <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
    <div
        transition:fade={{ duration: 150 }}
        class="fixed inset-0 z-100 flex items-center justify-center bg-black/10 dark:bg-black/50"
        onclick={onClose}
    >
        <div
            transition:scale={{ duration: 150, start: 0.95 }}
            onclick={(e) => e.stopPropagation()}
            class={`relative w-full ${sizeClass[size]} rounded-2xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-800 dark:bg-gray-900 mx-4`}
        >
            <div class="flex items-center justify-between mb-5">
                <h3 class="text-base font-semibold text-gray-800 dark:text-white/90">
                    {title}
                </h3>
                <button
                    type="button"
                    onclick={onClose}
                    class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                    <XIcon size={20} />
                </button>
            </div>

            <div class="space-y-4">
                {@render children()}
            </div>

            {#if footer}
                <div class="mt-6 flex gap-3">
                    {@render footer()}
                </div>
            {/if}
        </div>
    </div>
{/if}