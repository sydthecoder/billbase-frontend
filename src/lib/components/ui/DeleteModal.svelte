<script lang="ts">
    import Trash2Icon from '@lucide/svelte/icons/trash-2'
    import { fade, scale } from 'svelte/transition'
    import BaseModal from './BaseModal.svelte'
    import ButtonLoader from './forms/ButtonLoader.svelte'

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

<BaseModal {open} title="Confirm Delete" onClose={onCancel} size="sm">
    {#snippet children()}
        <div class="text-center">
            <div class="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-error-50 dark:bg-error-500/10">
                <Trash2Icon size={30} class="text-error-600 dark:text-error-400" />
            </div>

            <h3 class="mb-3 text-lg font-semibold text-gray-800 dark:text-white/90">
                Delete {item}
            </h3>

            <p class="text-theme-sm text-gray-500 dark:text-gray-400">
                Are you sure you want to delete
                <span class="font-medium text-gray-700 dark:text-gray-300">{item}</span>?
                <br />This action cannot be undone.
            </p>
        </div>
    {/snippet}

    {#snippet footer()}
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
    {/snippet}
</BaseModal>