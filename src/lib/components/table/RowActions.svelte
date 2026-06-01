<script lang="ts">
    import type { Component } from 'svelte'
    import EllipsisIcon from '@lucide/svelte/icons/ellipsis'

    interface Action {
        label: string
        icon: Component<any>
        href?: string
        onclick?: () => void
        variant?: 'default' | 'danger'
    }

    interface RowActionsProps {
        actions: Action[]
    }

    let { actions }: RowActionsProps = $props()

    let open = $state(false)
    let ref: HTMLDivElement | null = null
    let btnRef: HTMLButtonElement | null = null
    let coords = $state({ top: 0, left: 0 })

    function handleClickOutside(e: MouseEvent) {
        if (ref && !ref.contains(e.target as Node)) {
            open = false
        }
    }

    function handleOpen(e: MouseEvent) {
        e.stopPropagation()

        if (!open && btnRef) {
            const rect = btnRef.getBoundingClientRect()
            coords = {
                top:  rect.bottom + window.scrollY + 4,
                left: rect.right + window.scrollX - 160,
            }
        }

        open = !open
    }

    $effect(() => {
        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    })
</script>

<div bind:this={ref}>
    <button
        type="button"
        bind:this={btnRef}
        onclick={handleOpen}
        class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
    >
        <EllipsisIcon size={20} />
    </button>

    {#if open}
        <div
            style="position:fixed;top:{coords.top}px;left:{coords.left}px"
            class="z-50 w-40 rounded-xl border border-gray-200 bg-white p-1 shadow-theme-lg dark:border-gray-800 dark:bg-gray-900"
        >
            {#each actions as action}
                {@const Icon = action.icon}
                {#if action.href}
                    <a
                        href={action.href}
                        onclick={() => open = false}
                        class={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                            action.variant === 'danger'
                                ? 'text-error-600 hover:bg-error-50 dark:text-error-400 dark:hover:bg-error-500/10'
                                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5'
                        }`}
                    >
                        <Icon size={16} />
                        {action.label}
                    </a>
                {:else}
                    <button
                        type="button"
                        onclick={() => { action.onclick?.(); open = false }}
                        class={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                            action.variant === 'danger'
                                ? 'text-error-600 hover:bg-error-50 dark:text-error-400 dark:hover:bg-error-500/10'
                                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5'
                        }`}
                    >
                        <Icon size={16} />
                        {action.label}
                    </button>
                {/if}
            {/each}
        </div>
    {/if}
</div>