import { writable } from 'svelte/store'

export const isExpanded = writable(true)
export const isMobileOpen = writable(false)
export const isHovered = writable(false)
export const openSubmenu = writable<string | null>(null)

export const toggleSidebar = () => {
    isExpanded.update((value) => !value)
}

export const toggleMobileSidebar = () => {
    isMobileOpen.update((value) => !value)
}

export const setIsHovered = (value: boolean) => {
    isHovered.set(value)
}

export const setOpenSubmenu = (value: string | null) => {
    openSubmenu.set(value)
}
