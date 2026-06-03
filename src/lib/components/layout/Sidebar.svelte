<script lang="ts">
    import { onMount } from 'svelte'
    import { isMobileOpen, isExpanded, isHovered, setIsHovered } from '$lib/stores/sidebar'
    import SidebarLogo from './sidebar/SidebarLogo.svelte'
    import SidebarNavigation from './sidebar/SidebarNavigation.svelte'
    import SidebarWidget from './sidebar/SidebarWidget.svelte'

    const handleMouseEnter = () => {
        if (!$isExpanded) setIsHovered(true)
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
    }

    const handleResize = () => {
        if (window.innerWidth >= 768) isMobileOpen.set(false)
    }

    onMount(() => {
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    })

    const sidebarClass = $derived(
        [
            'fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200',
            $isExpanded || $isMobileOpen || $isHovered ? 'lg:w-[290px]' : '',
            !$isExpanded && !$isHovered ? 'lg:w-[90px]' : '',
            $isMobileOpen ? 'translate-x-0 w-[290px]' : '',
            !$isMobileOpen ? '-translate-x-full' : '',
            'lg:translate-x-0',
        ]
            .filter(Boolean)
            .join(' ')
    )

    const logoWrapperClass = $derived(
        [
            'py-6 flex',
            !$isExpanded && !$isHovered ? 'lg:justify-center' : 'justify-start',
        ]
            .filter(Boolean)
            .join(' ')
    )
</script>

<aside
    class={sidebarClass}
    onmouseenter={handleMouseEnter}
    onmouseleave={handleMouseLeave}
>
    <div class={logoWrapperClass}>
        <SidebarLogo />
    </div>

    <div class="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <SidebarNavigation />

        {#if $isExpanded || $isHovered || $isMobileOpen}
            <SidebarWidget />
        {/if}
    </div>
</aside>