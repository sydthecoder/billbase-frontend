<script lang="ts">
    import Header from './Header.svelte'
    import Sidebar from './Sidebar.svelte'
    import Backdrop from './Backdrop.svelte'
    import Footer from './Footer.svelte'
    import { isExpanded, isHovered } from '$lib/stores/sidebar'

    let { children } = $props()
</script>

<div class="min-h-screen xl:flex">
    <Sidebar />
    <Backdrop />

    <div
        class={`flex flex-col min-h-screen flex-1 transition-all duration-300 ease-in-out ${
            $isExpanded || $isHovered ? 'lg:ml-72' : 'lg:ml-22'
        }`}
    >
        <Header />

        <div class="flex-1 p-4 mx-auto w-full max-w-(--breakpoint-2xl) md:p-6">
            {@render children()}
        </div>

        <Footer />
    </div>
</div>