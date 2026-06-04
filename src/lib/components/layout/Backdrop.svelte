<script lang="ts">
    import { isMobileOpen, toggleMobileSidebar } from '$lib/stores/sidebar'
</script>

{#if $isMobileOpen}
    <div
        class="fixed inset-0 bg-gray-900/50 z-40 lg:hidden"
        onclick={toggleMobileSidebar}
    ></div>
{/if}
