import { browser } from '$app/environment'
import { writable } from 'svelte/store'

type Theme = 'light' | 'dark'

const theme = writable<Theme>('light')
let initialized = false

const applyTheme = (value: Theme) => {
    if (!browser) {
        return
    }

    localStorage.setItem('theme', value)
    if (value === 'dark') {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }
}

export const initTheme = () => {
    if (!browser || initialized) {
        return
    }

    const saved = localStorage.getItem('theme') as Theme | null
    const nextTheme = saved ?? 'light'

    theme.set(nextTheme)
    applyTheme(nextTheme)
    initialized = true
}

export const toggleTheme = () => {
    theme.update((value) => {
        const nextValue: Theme = value === 'light' ? 'dark' : 'light'
        applyTheme(nextValue)
        return nextValue
    })
}

export { theme }
