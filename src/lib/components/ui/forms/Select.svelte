<script lang="ts">
    import ChevronDownIcon from '@lucide/svelte/icons/chevron-down'


    interface SelectOption {
        value: string | number
        label: string
    }

    interface SelectProps {
        id: string
        name: string
        options: SelectOption[]
        value?: string | number
        placeholder?: string
        required?: boolean
        disabled?: boolean
    }

    let {
        id,
        name,
        options,
        value = $bindable(''),
        placeholder = 'Select an option',
        required = false,
        disabled = false,
    }: SelectProps = $props()
</script>

<div class="relative z-20 bg-transparent">
    <select
        {id}
        {name}
        {required}
        {disabled}
        bind:value
        class="cursor-pointer dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
    >
        <option value="" disabled>{placeholder}</option>

        {#each options as option}
            <option
                value={option.value}
                class="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
            >
                {option.label}
            </option>
        {/each}
    </select>

    <span class="absolute z-30 text-gray-500 -translate-y-1/2 pointer-events-none right-4 top-1/2 dark:text-gray-400">
        <ChevronDownIcon />
    </span>
</div>