<script lang="ts">
    interface LabelProps {
        for: string
        text: string
        required?: boolean
    }

    let { for: forAttr, text, required = false }: LabelProps = $props()
</script>

<label for={forAttr} class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
    {text}{#if required}<span class="text-error-500">*</span>{/if}
</label>