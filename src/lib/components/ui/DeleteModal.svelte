<script lang="ts">
    import Trash2Icon from '@lucide/svelte/icons/trash-2'
    import XIcon from '@lucide/svelte/icons/x'
    import { fade, scale } from 'svelte/transition'
    import ButtonLoader from './forms/ButtonLoader.svelte';

    interface DeleteModalProps {
        open: boolean
        item: string
        loading?: boolean
        onConfirm: () => void
        onCancel: () => void
    }

    let {
        open,
        item,
        loading = false,
        onConfirm,
        onCancel,
    }: DeleteModalProps = $props()
</script>

{#if open}
    <!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions (because of reasons) -->
    <div
        transition:fade={{ duration: 150 }}
        class="fixed inset-0 z-100 flex items-center justify-center bg-black/50 dark:bg-black/70"
        onclick={onCancel}
    >
        <div
            transition:scale={{ duration: 150, start: 0.95 }}
            onclick={(e) => e.stopPropagation()}
            class="text-center relative w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-800 dark:bg-gray-900 mx-4"
        >
            <button
                type="button"
                onclick={onCancel}
                class="absolute right-4 top-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
                <XIcon size={20} />
            </button>

            <div class="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-error-50 dark:bg-error-500/10">
                <Trash2Icon size={30} class=" text-error-600 dark:text-error-400" />
            </div>

            <h3 class="mb-3 text-lg font-semibold text-gray-800 dark:text-white/90">
                Delete {item}
            </h3>

            <p class="mb-8 text-theme-sm text-gray-500 dark:text-gray-400">
                Are you sure you want to delete <span class="font-medium text-gray-700 dark:text-gray-300">{item}</span>? <br />
                This action cannot be undone.
            </p>

            <div class="flex gap-3">
                <button
                    type="button"
                    onclick={onCancel}
                    disabled={loading}
                    class="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-transparent dark:text-gray-300 dark:hover:bg-white/5"
                >
                    Cancel
                </button>

                <button
                    type="button"
                    onclick={onConfirm}
                    disabled={loading}
                    class="flex flex-1 items-center justify-center gap-2 rounded-lg bg-error-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-error-700 disabled:opacity-70 dark:bg-error-500 dark:hover:bg-error-600"
                >
                    {#if loading}
                        <ButtonLoader />
                    {:else}
                        Delete
                    {/if}
                    
                </button>
            </div>
        </div>
    </div>
{/if}