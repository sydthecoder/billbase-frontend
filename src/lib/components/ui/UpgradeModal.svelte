<script lang="ts">
    import ZapIcon from '@lucide/svelte/icons/zap'
    import BaseModal from './BaseModal.svelte'

    interface UpgradeModalProps {
        open: boolean
        message?: string
        onClose: () => void
    }

    let {
        open,
        message = "You've reached the limit on your current plan.",
        onClose,
    }: UpgradeModalProps = $props()
</script>

<BaseModal {open} title="Upgrade Your Plan" onClose={onClose} size="sm">
    {#snippet children()}
        <div class="text-center">
            <div class="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 dark:bg-brand-500/10">
                <ZapIcon size={30} class="text-brand-600 dark:text-brand-400" />
            </div>

            <h3 class="mb-3 text-lg font-semibold text-gray-800 dark:text-white/90">
                Plan Limit Reached
            </h3>

            <p class="text-theme-sm text-gray-500 dark:text-gray-400">
                {message}
            </p>
        </div>
    {/snippet}

    {#snippet footer()}
        <button
            type="button"
            onclick={onClose}
            class="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-transparent dark:text-gray-300"
        >
            Maybe Later
        </button>

        <a
            href="/billing"
            class="flex flex-1 items-center justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600"
        >
            Upgrade Now
        </a>
    {/snippet}
</BaseModal>