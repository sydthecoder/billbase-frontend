<script lang="ts">
    import { isExpanded, isHovered, isMobileOpen } from '$lib/stores/sidebar'
</script>

<a href="/">
    {#if $isExpanded || $isHovered || $isMobileOpen}
        <img
            class="dark:hidden"
            src="/images/logo/logo.svg"
            alt="Logo"
            width="150"
            height="40"
        />
        <img
            class="hidden dark:block"
            src="/images/logo/logo-dark.svg"
            alt="Logo"
            width="150"
            height="40"
        />
    {:else}
        <img
            src="/images/logo/logo-icon.svg"
            alt="Logo"
            width="32"
            height="32"
        />
    {/if}
</a>