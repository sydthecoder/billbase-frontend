<script lang="ts">
    import InfoCircleIcon from '@lucide/svelte/icons/info'

    interface AlertProps {
        variant: 'error'
        title: string
        message: string
        showLink?: boolean
        linkHref?: string
        linkText?: string
    }

    let {
        variant,
        title,
        message,
        showLink = false,
        linkHref = '#',
        linkText = 'Learn more',
    }: AlertProps = $props()

    const variantClasses = {
        error: {
            container: 'border-error-500 bg-error-50 dark:border-error-500/30 dark:bg-error-500/15',
            icon: 'text-error-500',
        },
        // success: { ... }   add later
        // warning: { ... }   add later
        // info: { ... }      add later
    }
</script>

<div class={`max-w-xs mb-6 rounded-xl border px-4 py-2 ${variantClasses[variant].container}`}>
    <div class="flex items-start gap-3">
        <div class={`-mt-0.5 ${variantClasses[variant].icon}`}>
            <InfoCircleIcon />
        </div>

        <div>
            <h4 class="mb-1 text-sm font-semibold text-gray-800 dark:text-white/90">
                {title}
            </h4>

            <p class="text-sm text-gray-500 dark:text-gray-400">
                {message}
            </p>

            {#if showLink}
                <a
                    href={linkHref}
                    class="inline-block mt-3 text-sm font-medium text-gray-500 underline dark:text-gray-400"
                >
                    {linkText}
                </a>
            {/if}
        </div>
    </div>
</div>