<script lang="ts">
    import InboxIcon from '@lucide/svelte/icons/inbox'

    interface EmptyStateProps {
        message?: string
    }

    let { message = 'No records found.' }: EmptyStateProps = $props()
</script>

<tr>
    <td colspan="100" class="px-5 py-12 text-center">
        <div class="flex flex-col items-center gap-3">
            <InboxIcon size={40} class="text-gray-300 dark:text-gray-600" />
            <p class="text-sm text-gray-500 dark:text-gray-400">{message}</p>
        </div>
    </td>
</tr>