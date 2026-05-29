<script lang="ts">
    import type { Component } from 'svelte'
    import { page } from '$app/stores'
    import { slide } from 'svelte/transition'
    import { isExpanded, isHovered, isMobileOpen, openSubmenu, setOpenSubmenu } from '$lib/stores/sidebar'
    import GridIcon from '@lucide/svelte/icons/layout-dashboard'
    import CalenderIcon from '@lucide/svelte/icons/calendar'
    import UserCircleIcon from '@lucide/svelte/icons/circle-user-round'
    import FileTextIcon from '@lucide/svelte/icons/file-text'
    import FileIcon from '@lucide/svelte/icons/file'
    import BoxIcon from '@lucide/svelte/icons/box'
    import LandmarkIcon from '@lucide/svelte/icons/landmark'
    import CreditCardIcon from '@lucide/svelte/icons/credit-card'
    import SettingsIcon from '@lucide/svelte/icons/settings'
    import ChevronDownIcon from '$lib/components/icons/ChevronDownIcon.svelte'
    import HorizontalDots from '$lib/components/icons/HorizontalDots.svelte'

    type IconComponent = Component<any>

    type SubItem = {
        name: string
        path: string
        pro?: boolean
        new?: boolean
    }

    type MenuItem = {
        icon: IconComponent
        name: string
        path?: string
        subItems?: SubItem[]
    }

    type MenuGroup = {
        title: string
        items: MenuItem[]
    }

    const menuGroups: MenuGroup[] = [
        {
            title: 'Menu',
            items: [
                {
                    icon: GridIcon,
                    name: 'Dashboard',
                    path: '/',
                },
                {
                    icon: CalenderIcon,
                    name: 'Calendar',
                    path: '/calendar',
                },
                {
                    icon: UserCircleIcon,
                    name: 'Customers',
                    path: '/customers',
                },
                {
                    icon: BoxIcon,
                    name: 'Products',
                    subItems: [
                        { name: 'Products', path: '/products', pro: false },
                        { name: 'Products Categories', path: '/products/categories', pro: false },
                    ],
                },
                {
                    icon: FileTextIcon,
                    name: 'Invoices',
                    subItems: [
                        { name: 'Once-Off Invoices', path: '/invoices', pro: false },
                        { name: 'Recurring Invoices', path: '/invoices/recurring', pro: false },
                    ],
                },
                {
                    icon: CreditCardIcon,
                    name: 'Payments',
                    path: '/payments',
                },
                {
                    icon: FileIcon,
                    name: 'Quotes',
                    path: '/quotes',
                },
                {
                    name: 'Transactions',
                    icon: LandmarkIcon,
                    subItems: [
                        { name: 'Incoming', path: '/basic-tables', pro: false },
                        { name: 'Basic Tables', path: '/basic-tables', pro: false },
                    ],
                },
            ],
        },
        {
            title: 'Others',
            items: [
                {
                    icon: SettingsIcon,
                    name: 'Settings',
                    subItems: [
                        { name: 'General', path: '/settings/general', pro: false },
                        { name: 'Cedit Tokens', path: '/avatars', pro: false },
                        { name: 'Payment Gateways', path: '/badge', pro: false },
                        { name: 'Email Configuration', path: '/buttons', pro: false },
                        { name: 'Email Templates', path: '/videos', pro: false },
                        { name: 'SMS Templates', path: '/buttons', pro: false },
                        { name: 'Users (Teams)', path: '/buttons', pro: false },
                        { name: 'My Billing', path: '/buttons', pro: false },
                    ],
                },
            ],
        },
    ]

    const currentPath = $derived($page.url.pathname)
    const isActive = (path: string) => currentPath === path

    const toggleSubmenu = (groupIndex: number, itemIndex: number) => {
        const key = `${groupIndex}-${itemIndex}`
        setOpenSubmenu($openSubmenu === key ? null : key)
    }

    const isAnySubmenuRouteActive = $derived(
        menuGroups.some((group) =>
            group.items.some(
                (item) => item.subItems && item.subItems.some((subItem) => isActive(subItem.path))
            )
        )
    )

    const isSubmenuOpen = (groupIndex: number, itemIndex: number) => {
        const key = `${groupIndex}-${itemIndex}`
        return (
            $openSubmenu === key ||
            (isAnySubmenuRouteActive &&
                menuGroups[groupIndex].items[itemIndex].subItems?.some((subItem) =>
                    isActive(subItem.path)
                ))
        )
    }
</script>

<nav class="mb-6">
    <div class="flex flex-col gap-4">
        {#each menuGroups as menuGroup, groupIndex}
            <div>
                <h2
                    class={`mb-4 text-xs uppercase flex leading-5 text-gray-400 ${
                        !$isExpanded && !$isHovered ? 'lg:justify-center' : 'justify-start'
                    }`}
                >
                    {#if $isExpanded || $isHovered || $isMobileOpen}
                        {menuGroup.title}
                    {:else}
                        <HorizontalDots />
                    {/if}
                </h2>

                <ul class="flex flex-col gap-3">
                    {#each menuGroup.items as item, index (item.name)}
                        {@const Icon = item.icon}
                        <li>
                            {#if item.subItems}
                                <button
                                    onclick={() => toggleSubmenu(groupIndex, index)}
                                    class={`menu-item group w-full outline-none ${
                                        isSubmenuOpen(groupIndex, index)
                                            ? 'menu-item-active'
                                            : 'menu-item-inactive'
                                    } ${
                                        !$isExpanded && !$isHovered
                                            ? 'lg:justify-center'
                                            : 'lg:justify-start'
                                    }`}
                                >
                                    <span
                                        class={isSubmenuOpen(groupIndex, index)
                                            ? 'menu-item-icon-active'
                                            : 'menu-item-icon-inactive'}
                                    >
                                        <Icon strokeWidth={1.5} />
                                    </span>
                                    {#if $isExpanded || $isHovered || $isMobileOpen}
                                        <span class="menu-item-text">{item.name}</span>
                                    {/if}
                                    {#if $isExpanded || $isHovered || $isMobileOpen}
                                        <span
                                            class={`ml-auto w-5 h-5 transition-transform duration-200 ${
                                                isSubmenuOpen(groupIndex, index)
                                                    ? 'rotate-180 text-brand-500'
                                                    : ''
                                            }`}
                                        >
                                            <ChevronDownIcon />
                                        </span>
                                    {/if}
                                </button>
                            {:else if item.path}
                                <a
                                    href={item.path}
                                    class={`menu-item group ${
                                        isActive(item.path) ? 'menu-item-active' : 'menu-item-inactive'
                                    }`}
                                >
                                    <span
                                        class={isActive(item.path)
                                            ? 'menu-item-icon-active'
                                            : 'menu-item-icon-inactive'}
                                    >
                                        <Icon strokeWidth={1.5} />
                                    </span>
                                    {#if $isExpanded || $isHovered || $isMobileOpen}
                                        <span class="menu-item-text">{item.name}</span>
                                    {/if}
                                </a>
                            {/if}

                            {#if item.subItems && isSubmenuOpen(groupIndex, index) && ($isExpanded || $isHovered || $isMobileOpen)}
                                <div transition:slide>
                                    <ul class="mt-2 space-y-1 ml-9">
                                        {#each item.subItems as subItem (subItem.name)}
                                            <li>
                                                <a
                                                    href={subItem.path}
                                                    class={`menu-dropdown-item ${
                                                        isActive(subItem.path)
                                                            ? 'menu-dropdown-item-active'
                                                            : 'menu-dropdown-item-inactive'
                                                    }`}
                                                >
                                                    {subItem.name}
                                                    <span class="flex items-center gap-1 ml-auto">
                                                        {#if subItem.new}
                                                            <span
                                                                class={`menu-dropdown-badge ${
                                                                    isActive(subItem.path)
                                                                        ? 'menu-dropdown-badge-active'
                                                                        : 'menu-dropdown-badge-inactive'
                                                                }`}
                                                            >
                                                                new
                                                            </span>
                                                        {/if}
                                                        {#if subItem.pro}
                                                            <span
                                                                class={`menu-dropdown-badge ${
                                                                    isActive(subItem.path)
                                                                        ? 'menu-dropdown-badge-active'
                                                                        : 'menu-dropdown-badge-inactive'
                                                                }`}
                                                            >
                                                                pro
                                                            </span>
                                                        {/if}
                                                    </span>
                                                </a>
                                            </li>
                                        {/each}
                                    </ul>
                                </div>
                            {/if}
                        </li>
                    {/each}
                </ul>
            </div>
        {/each}
    </div>
</nav>