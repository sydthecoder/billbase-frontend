<script lang="ts">
    import { onMount } from 'svelte'
    import PlusIcon from '@lucide/svelte/icons/plus'
    import XIcon from '@lucide/svelte/icons/x'
    import UserCircleIcon from '@lucide/svelte/icons/circle-user-round'
    import BoxIcon from '@lucide/svelte/icons/box'
    import FileTextIcon from '@lucide/svelte/icons/file-text'
    import FileIcon from '@lucide/svelte/icons/file'
    import CreditCardIcon from '@lucide/svelte/icons/credit-card'

    const items = [
        { label: 'New Customer', href: '/customers/create',  icon: UserCircleIcon, desc: 'Add a new customer'       },
        { label: 'New Product',  href: '/products/create',   icon: BoxIcon,        desc: 'Add a product or service' },
        { label: 'New Quote',    href: '/quotes/create',     icon: FileIcon,       desc: 'Create a quote'           },
        { label: 'New Invoice',  href: '/invoices/create',   icon: FileTextIcon,   desc: 'Create an invoice'        },
        { label: 'New Payment',  href: '/payments/create',   icon: CreditCardIcon, desc: 'Record a payment'         },
    ]

    let dropdownOpen = $state(false)
    let dropdownRef: HTMLDivElement | null = null

    const toggleDropdown = (e: MouseEvent) => {
        e.stopPropagation()
        dropdownOpen = !dropdownOpen
    }

    const handleClickOutside = (e: MouseEvent) => {
        if (dropdownRef && !dropdownRef.contains(e.target as Node)) {
            dropdownOpen = false
        }
    }

    onMount(() => {
        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    })
</script>

<div class="relative" bind:this={dropdownRef}>
    <button
        onclick={toggleDropdown}
        class="relative flex items-center justify-center text-gray-500 transition-colors bg-white border border-gray-200 rounded-full hover:text-dark-900 h-11 w-11 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
    >
        <PlusIcon strokeWidth={1.8} />
    </button>

    {#if dropdownOpen}
        <div class="absolute -right-[240px] mt-[17px] flex w-[300px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark lg:right-0">

            <!-- Header -->
            <div class="flex items-center justify-between pb-3 mb-3 border-b border-gray-100 dark:border-gray-800">
                <h5 class="text-base font-semibold text-gray-800 dark:text-white/90">
                    Quick Create
                </h5>
                <button
                    onclick={() => dropdownOpen = false}
                    class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                    <XIcon size={20} />
                </button>
            </div>

            <!-- Items -->
            <ul class="flex flex-col gap-1">
                {#each items as item}
                    {@const Icon = item.icon}
                    <li>
                        <a
                            href={item.href}
                            onclick={() => dropdownOpen = false}
                            class="flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                        >
                            <span class="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-500 dark:bg-brand-500/10">
                                <Icon size={18} />
                            </span>
                            <span class="flex flex-col">
                                <span class="text-sm font-medium text-gray-800 dark:text-white/90">
                                    {item.label}
                                </span>
                                <span class="text-xs text-gray-500 dark:text-gray-400">
                                    {item.desc}
                                </span>
                            </span>
                        </a>
                    </li>
                {/each}
            </ul>
        </div>
    {/if}
</div>