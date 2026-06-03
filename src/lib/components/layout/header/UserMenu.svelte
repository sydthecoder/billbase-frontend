<script lang="ts">
    import { onMount } from 'svelte'
    import { page } from '$app/stores'
    import UserCircleIcon from '@lucide/svelte/icons/circle-user-round'
    import ChevronDownIcon from '@lucide/svelte/icons/chevron-down'
    import LogoutIcon from '@lucide/svelte/icons/log-out'
    import SettingsIcon from '@lucide/svelte/icons/settings'
    import InfoCircleIcon from '@lucide/svelte/icons/info'

    let dropdownOpen = $state(false)
    let dropdownRef: HTMLDivElement | null = null

    const menuItems = [
        { href: '/profile', icon: UserCircleIcon, text: 'Edit profile' },
        { href: '/chat', icon: SettingsIcon, text: 'Settings' },
        { href: '/pro', icon: InfoCircleIcon, text: 'Support' },
    ]

    const displayName = $derived($page.data?.user?.full_name ?? 'Bill Base')
    const displayEmail = $derived($page.data?.user?.email ?? '')

    const toggleDropdown = (event: MouseEvent) => {
        event.stopPropagation()
        dropdownOpen = !dropdownOpen
    }

    const closeDropdown = () => {
        dropdownOpen = false
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef && !dropdownRef.contains(event.target as Node)) {
            closeDropdown()
        }
    }

    onMount(() => {
        document.addEventListener('click', handleClickOutside)

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    })
</script>

<div class="relative" bind:this={dropdownRef}>
    <button
        class="flex items-center text-gray-700 dark:text-gray-400"
        onclick={toggleDropdown}
    >
        <span class="mr-3 overflow-hidden rounded-full h-11 w-11">
            <img src="/images/user/test.svg" alt="User" />
        </span>

        <span class="block mr-1 font-medium text-theme-sm">{displayName}</span>

        <span class={dropdownOpen ? 'rotate-180' : ''}>
            <ChevronDownIcon />
        </span>
    </button>

    {#if dropdownOpen}
        <div
            class="absolute right-0 mt-5 flex w-64 flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
        >
            <div>
                <span class="block font-medium text-gray-700 text-theme-sm dark:text-gray-400">
                    {displayName}
                </span>
                <span class="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">
                    {displayEmail}
                </span>
            </div>

            <ul class="flex flex-col gap-1 pt-4 pb-3 border-b border-gray-200 dark:border-gray-800">
                {#each menuItems as item (item.href)}
                    {@const Icon = item.icon}
                    <li>
                        <a
                            href={item.href}
                            class="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                        >
                            <span
                                class="text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300"
                            >
                                <Icon />
                            </span>
                            {item.text}
                        </a>
                    </li>
                {/each}
            </ul>

            <form method="POST" action="/logout">
                <button
                    type="submit"
                    class="w-full flex items-center gap-3 px-3 py-2 mt-3 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                >
                    <span class="text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300">
                        <LogoutIcon />
                    </span>
                    Log out
                </button>
            </form>
        </div>
    {/if}
</div>
