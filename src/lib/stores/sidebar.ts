import { writable } from 'svelte/store'
import { browser } from '$app/environment'

const savedExpanded = browser ? localStorage.getItem('sidebar_expanded') !== 'false' : true

export const isExpanded = writable(savedExpanded)
export const isMobileOpen = writable(false)
export const isHovered = writable(false)
export const openSubmenu = writable<string | null>(null)

export const toggleSidebar = () => {
    isExpanded.update((value) => {
        const next = !value
        if (browser) localStorage.setItem('sidebar_expanded', String(next))
        return next
    })
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