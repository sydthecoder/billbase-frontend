<script lang="ts">
    import type { PageData } from './$types'
    import AdminLayout from '$lib/components/layout/AdminLayout.svelte'
    import SearchIcon from '@lucide/svelte/icons/search'

    let { data }: { data: PageData } = $props()
</script>

<AdminLayout>
    <div class="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
        <div class="flex flex-col gap-4 border-b border-gray-200 px-4 py-4 sm:px-5 lg:flex-row lg:items-center lg:justify-between dark:border-gray-800">
            <div class="max-w-sm">
                <form>
                    <div class="relative">
                        <button class="absolute -translate-y-1/2 left-4 top-1/2 text-gray-500 dark:text-gray-400">
                            <SearchIcon size={18} />
                        </button>

                        <input
                            type="text"
                            placeholder="Search customers"
                            class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                        />
                    </div>
                </form>
            </div>

            <div class="flex flex-col gap-4 sm:flex-row lg:items-center">
                <div class="inline-flex h-11 w-full flex-1 gap-0.5 overflow-x-auto rounded-lg bg-gray-100 p-0.5 sm:w-auto lg:min-w-fit dark:bg-gray-900">
                    <button class="h-10 flex-1 rounded-md px-2 py-2 text-xs font-medium sm:px-3 sm:text-sm lg:flex-initial shadow-theme-xs text-gray-900 dark:text-white bg-white dark:bg-gray-800">All</button>
                    <button class="h-10 flex-1 rounded-md px-2 py-2 text-xs font-medium sm:px-3 sm:text-sm lg:flex-initial text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Active</button>
                    <button class="h-10 flex-1 rounded-md px-2 py-2 text-xs font-medium sm:px-3 sm:text-sm lg:flex-initial text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">In-Active</button>
                </div>

                <div class="flex flex-col gap-3 sm:flex-row flex-1sm:items-center lg:gap-4">
                    <div class="relative">
                        <button class="shadow-theme-xs flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 sm:w-auto sm:min-w-[100px] dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400" type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M14.6537 5.90414C14.6537 4.48433 13.5027 3.33331 12.0829 3.33331C10.6631 3.33331 9.51206 4.48433 9.51204 5.90415M14.6537 5.90414C14.6537 7.32398 13.5027 8.47498 12.0829 8.47498C10.663 8.47498 9.51204 7.32398 9.51204 5.90415M14.6537 5.90414L17.7087 5.90411M9.51204 5.90415L2.29199 5.90411M5.34694 14.0958C5.34694 12.676 6.49794 11.525 7.91777 11.525C9.33761 11.525 10.4886 12.676 10.4886 14.0958M5.34694 14.0958C5.34694 15.5156 6.49794 16.6666 7.91778 16.6666C9.33761 16.6666 10.4886 15.5156 10.4886 14.0958M5.34694 14.0958L2.29199 14.0958M10.4886 14.0958L17.7087 14.0958" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg>
                            Filter
                        </button>

                        <div class="absolute right-0 z-10 mt-2 w-56 rounded-lg border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-gray-800" style="display: none;">
                            <div class="mb-5">
                                <label class="mb-2 block text-xs font-medium text-gray-700 dark:text-gray-300"> Category </label>
                                <input type="text" class="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-10 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30" placeholder="Search category...">
                            </div>
                            <div class="mb-5">
                                <label class="mb-2 block text-xs font-medium text-gray-700 dark:text-gray-300"> Company </label>
                                <input type="text" class="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-10 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30" placeholder="Search company...">
                            </div>
                            <button class="bg-brand-500 hover:bg-brand-600 h-10 w-full rounded-lg px-3 py-2 text-sm font-medium text-white"> Apply </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div>
            <div class="custom-scrollbar overflow-x-auto">
                <table class="w-full table-auto">
                    <thead>
                        <tr class="border-b border-gray-200 dark:divide-gray-800 dark:border-gray-800">
                            <th class="p-4">
                                <div class="flex w-full cursor-pointer items-center justify-between">
                                    <div class="flex items-center gap-3">
                                        <label class="flex cursor-pointer items-center text-sm font-medium text-gray-700 select-none dark:text-gray-400">
                                            <span class="relative">
                                                <input type="checkbox" class="sr-only">
                                                <span class="bg-transparent border-gray-300 dark:border-gray-700 flex h-4 w-4 items-center justify-center rounded-sm border-[1.25px]">
                                                    <span class="opacity-0">
                                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                            <path d="M10 3L4.5 8.5L2 6" stroke="white" stroke-width="1.6666" stroke-linecap="round" stroke-linejoin="round"></path>
                                                        </svg>
                                                    </span>
                                                </span>
                                            </span>
                                        </label>
                                        <p class="text-theme-xs font-medium uppercase text-gray-500 dark:text-gray-400"> Order ID </p>
                                    </div>
                                </div>
                            </th>
                            <th class="p-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 cursor-pointer">
                                <div class="flex items-center gap-3">
                                    <p class="text-theme-xs font-medium uppercase">Category</p>
                                    <span class="flex flex-col gap-0.5">
                                        <svg class="text-gray-300" width="8" height="5"><path d="M4.40962 0.585167C4.21057 0.300808 3.78943 0.300807 3.59038 0.585166L1.05071 4.21327C0.81874 4.54466 1.05582 5 1.46033 5H6.53967C6.94418 5 7.18126 4.54466 6.94929 4.21327L4.40962 0.585167Z" fill="currentColor"></path></svg>
                                        <svg class="text-gray-300" width="8" height="5"><path d="M4.40962 4.41483C4.21057 4.69919 3.78943 4.69919 3.59038 4.41483L1.05071 0.786732C0.81874 0.455343 1.05582 0 1.46033 0H6.53967C6.94418 0 7.18126 0.455342 6.94929 0.786731L4.40962 4.41483Z" fill="currentColor"></path></svg>
                                    </span>
                                </div>
                            </th>
                            <th class="p-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 cursor-pointer">
                                <div class="flex items-center gap-3">
                                    <p class="text-theme-xs font-medium uppercase">Company</p>
                                    <span class="flex flex-col gap-0.5">
                                        <svg class="text-gray-300" width="8" height="5"><path d="M4.40962 0.585167C4.21057 0.300808 3.78943 0.300807 3.59038 0.585166L1.05071 4.21327C0.81874 4.54466 1.05582 5 1.46033 5H6.53967C6.94418 5 7.18126 4.54466 6.94929 4.21327L4.40962 0.585167Z" fill="currentColor"></path></svg>
                                        <svg class="text-gray-300" width="8" height="5"><path d="M4.40962 4.41483C4.21057 4.69919 3.78943 4.69919 3.59038 4.41483L1.05071 0.786732C0.81874 0.455343 1.05582 0 1.46033 0H6.53967C6.94418 0 7.18126 0.455342 6.94929 0.786731L4.40962 4.41483Z" fill="currentColor"></path></svg>
                                    </span>
                                </div>
                            </th>
                            <th class="p-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 cursor-pointer">
                                <div class="flex items-center gap-3">
                                    <p class="text-theme-xs font-medium uppercase">Arrival Time</p>
                                    <span class="flex flex-col gap-0.5">
                                        <svg class="text-gray-300" width="8" height="5"><path d="M4.40962 0.585167C4.21057 0.300808 3.78943 0.300807 3.59038 0.585166L1.05071 4.21327C0.81874 4.54466 1.05582 5 1.46033 5H6.53967C6.94418 5 7.18126 4.54466 6.94929 4.21327L4.40962 0.585167Z" fill="currentColor"></path></svg>
                                        <svg class="text-gray-300" width="8" height="5"><path d="M4.40962 4.41483C4.21057 4.69919 3.78943 4.69919 3.59038 4.41483L1.05071 0.786732C0.81874 0.455343 1.05582 0 1.46033 0H6.53967C6.94418 0 7.18126 0.455342 6.94929 0.786731L4.40962 4.41483Z" fill="currentColor"></path></svg>
                                    </span>
                                </div>
                            </th>
                            <th class="p-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase"> Route </th>
                            <th class="p-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase"> Price </th>
                            <th class="p-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase"> Status </th>
                        </tr>
                    </thead>

                    <tbody class="divide-x divide-y divide-gray-200 dark:divide-gray-800">
                        <tr class="transition hover:bg-gray-50 dark:hover:bg-gray-900">
                            <td class="p-4 whitespace-nowrap">
                                <div class="group flex items-center gap-3">
                                    <label class="flex cursor-pointer items-center text-sm font-medium text-gray-700 select-none dark:text-gray-400">
                                        <span class="relative">
                                            <input type="checkbox" class="sr-only">
                                            <span class="bg-transparent border-gray-300 dark:border-gray-700 flex h-4 w-4 items-center justify-center rounded-sm border-[1.25px]">
                                                <span class="opacity-0">
                                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                        <path d="M10 3L4.5 8.5L2 6" stroke="white" stroke-width="1.6666" stroke-linecap="round" stroke-linejoin="round"></path>
                                                    </svg>
                                                </span>
                                            </span>
                                        </span>
                                    </label>
                                    <span class="text-theme-xs font-medium uppercase text-gray-700 dark:text-gray-400">#324112</span>
                                </div>
                            </td>
                            <td class="p-4 text-sm font-normal whitespace-nowrap text-gray-800 dark:text-white/90">Furniture</td>
                            <td class="p-4 text-sm font-normal whitespace-nowrap text-gray-700 dark:text-white/90">HomeLine</td>
                            <td class="p-4 text-sm font-normal whitespace-nowrap text-gray-700 dark:text-white/90">10 Apr 2028 2:15 pm</td>
                            <td class="p-4 text-sm font-normal whitespace-nowrap text-gray-700 dark:text-white/90">Berlin–Milan</td>
                            <td class="p-4 text-sm font-normal whitespace-nowrap text-gray-700 dark:text-white/90">$1,250.00</td>
                            <td class="p-4 whitespace-nowrap"><span class="bg-success-50 dark:bg-success-500/15 text-success-700 dark:text-success-500 text-theme-xs rounded-full px-2 py-0.5 font-medium">Delivered</span></td>
                        </tr>
                        <tr class="transition hover:bg-gray-50 dark:hover:bg-gray-900">
                            <td class="p-4 whitespace-nowrap">
                                <div class="group flex items-center gap-3">
                                    <label class="flex cursor-pointer items-center text-sm font-medium text-gray-700 select-none dark:text-gray-400">
                                        <span class="relative">
                                            <input type="checkbox" class="sr-only">
                                            <span class="bg-transparent border-gray-300 dark:border-gray-700 flex h-4 w-4 items-center justify-center rounded-sm border-[1.25px]">
                                                <span class="opacity-0">
                                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                        <path d="M10 3L4.5 8.5L2 6" stroke="white" stroke-width="1.6666" stroke-linecap="round" stroke-linejoin="round"></path>
                                                    </svg>
                                                </span>
                                            </span>
                                        </span>
                                    </label>
                                    <span class="text-theme-xs font-medium uppercase text-gray-700 dark:text-gray-400">#332800</span>
                                </div>
                            </td>
                            <td class="p-4 text-sm font-normal whitespace-nowrap text-gray-800 dark:text-white/90">Clothing</td>
                            <td class="p-4 text-sm font-normal whitespace-nowrap text-gray-700 dark:text-white/90">StylePro</td>
                            <td class="p-4 text-sm font-normal whitespace-nowrap text-gray-700 dark:text-white/90">21 May 2028 9:00 am</td>
                            <td class="p-4 text-sm font-normal whitespace-nowrap text-gray-700 dark:text-white/90">Paris–Rome</td>
                            <td class="p-4 text-sm font-normal whitespace-nowrap text-gray-700 dark:text-white/90">$340.75</td>
                            <td class="p-4 whitespace-nowrap"><span class="text-theme-xs rounded-full bg-red-50 px-2 py-0.5 font-medium text-red-600 dark:bg-red-500/15 dark:text-red-500">Canceled</span></td>
                        </tr>
                        <tr class="transition hover:bg-gray-50 dark:hover:bg-gray-900">
                            <td class="p-4 whitespace-nowrap">
                                <div class="group flex items-center gap-3">
                                    <label class="flex cursor-pointer items-center text-sm font-medium text-gray-700 select-none dark:text-gray-400">
                                        <span class="relative">
                                            <input type="checkbox" class="sr-only">
                                            <span class="bg-transparent border-gray-300 dark:border-gray-700 flex h-4 w-4 items-center justify-center rounded-sm border-[1.25px]">
                                                <span class="opacity-0">
                                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                        <path d="M10 3L4.5 8.5L2 6" stroke="white" stroke-width="1.6666" stroke-linecap="round" stroke-linejoin="round"></path>
                                                    </svg>
                                                </span>
                                            </span>
                                        </span>
                                    </label>
                                    <span class="text-theme-xs font-medium uppercase text-gray-700 dark:text-gray-400">#3328100</span>
                                </div>
                            </td>
                            <td class="p-4 text-sm font-normal whitespace-nowrap text-gray-800 dark:text-white/90">Books</td>
                            <td class="p-4 text-sm font-normal whitespace-nowrap text-gray-700 dark:text-white/90">EduSource</td>
                            <td class="p-4 text-sm font-normal whitespace-nowrap text-gray-700 dark:text-white/90">02 Jun 2028 11:45 am</td>
                            <td class="p-4 text-sm font-normal whitespace-nowrap text-gray-700 dark:text-white/90">New York–Chicago</td>
                            <td class="p-4 text-sm font-normal whitespace-nowrap text-gray-700 dark:text-white/90">$128.40</td>
                            <td class="p-4 whitespace-nowrap"><span class="bg-warning-50 dark:bg-warning-500/15 text-warning-600 dark:text-warning-400 text-theme-xs rounded-full px-2 py-0.5 font-medium">In-Transit</span></td>
                        </tr>
                        <tr class="transition hover:bg-gray-50 dark:hover:bg-gray-900">
                            <td class="p-4 whitespace-nowrap">
                                <div class="group flex items-center gap-3">
                                    <label class="flex cursor-pointer items-center text-sm font-medium text-gray-700 select-none dark:text-gray-400">
                                        <span class="relative">
                                            <input type="checkbox" class="sr-only">
                                            <span class="bg-transparent border-gray-300 dark:border-gray-700 flex h-4 w-4 items-center justify-center rounded-sm border-[1.25px]">
                                                <span class="opacity-0">
                                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                        <path d="M10 3L4.5 8.5L2 6" stroke="white" stroke-width="1.6666" stroke-linecap="round" stroke-linejoin="round"></path>
                                                    </svg>
                                                </span>
                                            </span>
                                        </span>
                                    </label>
                                    <span class="text-theme-xs font-medium uppercase text-gray-700 dark:text-gray-400">#3328200</span>
                                </div>
                            </td>
                            <td class="p-4 text-sm font-normal whitespace-nowrap text-gray-800 dark:text-white/90">Automotive</td>
                            <td class="p-4 text-sm font-normal whitespace-nowrap text-gray-700 dark:text-white/90">AutoParts Co.</td>
                            <td class="p-4 text-sm font-normal whitespace-nowrap text-gray-700 dark:text-white/90">18 Mar 2028 4:00 pm</td>
                            <td class="p-4 text-sm font-normal whitespace-nowrap text-gray-700 dark:text-white/90">Tokyo–Osaka</td>
                            <td class="p-4 text-sm font-normal whitespace-nowrap text-gray-700 dark:text-white/90">$2,150.89</td>
                            <td class="p-4 whitespace-nowrap"><span class="bg-success-50 dark:bg-success-500/15 text-success-700 dark:text-success-500 text-theme-xs rounded-full px-2 py-0.5 font-medium">Delivered</span></td>
                        </tr>
                        <tr class="transition hover:bg-gray-50 dark:hover:bg-gray-900">
                            <td class="p-4 whitespace-nowrap">
                                <div class="group flex items-center gap-3">
                                    <label class="flex cursor-pointer items-center text-sm font-medium text-gray-700 select-none dark:text-gray-400">
                                        <span class="relative">
                                            <input type="checkbox" class="sr-only">
                                            <span class="bg-transparent border-gray-300 dark:border-gray-700 flex h-4 w-4 items-center justify-center rounded-sm border-[1.25px]">
                                                <span class="opacity-0">
                                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                        <path d="M10 3L4.5 8.5L2 6" stroke="white" stroke-width="1.6666" stroke-linecap="round" stroke-linejoin="round"></path>
                                                    </svg>
                                                </span>
                                            </span>
                                        </span>
                                    </label>
                                    <span class="text-theme-xs font-medium uppercase text-gray-700 dark:text-gray-400">#3328300</span>
                                </div>
                            </td>
                            <td class="p-4 text-sm font-normal whitespace-nowrap text-gray-800 dark:text-white/90">Beauty</td>
                            <td class="p-4 text-sm font-normal whitespace-nowrap text-gray-700 dark:text-white/90">GlamShine</td>
                            <td class="p-4 text-sm font-normal whitespace-nowrap text-gray-700 dark:text-white/90">28 Jun 2028 5:45 pm</td>
                            <td class="p-4 text-sm font-normal whitespace-nowrap text-gray-700 dark:text-white/90">Dubai–Doha</td>
                            <td class="p-4 text-sm font-normal whitespace-nowrap text-gray-700 dark:text-white/90">$323.75</td>
                            <td class="p-4 whitespace-nowrap"><span class="text-theme-xs rounded-full bg-red-50 px-2 py-0.5 font-medium text-red-600 dark:bg-red-500/15 dark:text-red-500">Canceled</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="flex items-center flex-col sm:flex-row justify-between border-t border-gray-200 px-5 py-4 dark:border-gray-800">
                <div class="pb-3 sm:pb-0">
                    <span class="block text-sm font-medium text-gray-500 dark:text-gray-400"> Showing <span class="text-gray-600 dark:text-white/90">1</span> to <span class="text-gray-600 dark:text-white/90">10</span> of <span class="text-gray-600 dark:text-white/90">7</span></span>
                </div>

                <div class="flex items-center bg-gray-50 dark:bg-white/3 dark:sm:bg-transparent sm:bg-transparent p-4 sm:p-0 w-full sm:w-auto rounded-lg justify-between gap-2 sm:justify-normal">
                    <button class="shadow-theme-xs flex items-center gap-2 rounded-lg border border-gray-300 bg-white p-2 text-gray-700 hover:bg-gray-50 hover:text-gray-800 disabled:opacity-50 sm:p-2.5 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/3 dark:hover:text-gray-200">
                        <span>
                            <svg class="fill-current" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.58203 9.99868C2.58174 10.1909 2.6549 10.3833 2.80152 10.53L7.79818 15.5301C8.09097 15.8231 8.56584 15.8233 8.85883 15.5305C9.15183 15.2377 9.152 14.7629 8.85921 14.4699L5.13911 10.7472L16.6665 10.7472C17.0807 10.7472 17.4165 10.4114 17.4165 9.99715C17.4165 9.58294 17.0807 9.24715 16.6665 9.24715L5.14456 9.24715L8.85919 5.53016C9.15199 5.23717 9.15184 4.7623 8.85885 4.4695C8.56587 4.1767 8.09099 4.17685 7.79819 4.46984L2.84069 9.43049C2.68224 9.568 2.58203 9.77087 2.58203 9.99715C2.58203 9.99766 2.58203 9.99817 2.58203 9.99868Z" fill=""></path>
                            </svg>
                        </span>
                    </button>

                    <span class="block text-sm font-medium text-gray-700 sm:hidden dark:text-gray-400"> Page 1 of 2</span>
                    <ul class="hidden sm:flex items-center gap-0.5">
                        <li><a href="#" class="bg-brand-500 text-white flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium">1</a></li>
                        <li><a href="#" class="text-gray-700 dark:text-gray-400 flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium">2</a></li>
                    </ul>

                    <button class="shadow-theme-xs flex items-center gap-2 rounded-lg border border-gray-300 bg-white p-2 text-gray-700 hover:bg-gray-50 hover:text-gray-800 disabled:opacity-50 sm:p-2.5 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/3 dark:hover:text-gray-200">
                        <span>
                            <svg class="fill-current" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M17.4165 9.9986C17.4168 10.1909 17.3437 10.3832 17.197 10.53L12.2004 15.5301C11.9076 15.8231 11.4327 15.8233 11.1397 15.5305C10.8467 15.2377 10.8465 14.7629 11.1393 14.4699L14.8594 10.7472L3.33203 10.7472C2.91782 10.7472 2.58203 10.4114 2.58203 9.99715C2.58203 9.58294 2.91782 9.24715 3.33203 9.24715L14.854 9.24715L11.1393 5.53016C10.8465 5.23717 10.8467 4.7623 11.1397 4.4695C11.4327 4.1767 11.9075 4.17685 12.2003 4.46984L17.1578 9.43049C17.3163 9.568 17.4165 9.77087 17.4165 9.99715C17.4165 9.99763 17.4165 9.99812 17.4165 9.9986Z" fill=""></path>
                            </svg>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</AdminLayout>