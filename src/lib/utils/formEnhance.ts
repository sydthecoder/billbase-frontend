import toast from 'svelte-hot-french-toast'

export function enhanceWithToast(options: {
    successMessage?: string
    errorMessage?: string
    onSuccess?: (data: any) => void
    onError?: (data: any) => void
}) {
    return () => {
        const toastId = toast.loading('Processing...')
        
        return async ({ result, update }: any) => {
            // Both 'success' and 'redirect' mean the backend operation worked perfectly!
            if (result.type === 'success' || result.type === 'redirect') {
                toast.success(options.successMessage ?? 'Success!', { id: toastId })
                options.onSuccess?.(result.data)
            } else {
                // Handles 'failure' (like validation errors from fail()) or 'error' (500 crashes)
                const msg = result.type === 'failure' 
                    ? (result.data?.error ?? options.errorMessage ?? 'Failed')
                    : options.errorMessage ?? 'Something went wrong'
                    
                toast.error(msg, { id: toastId })
                options.onError?.(result.data)
            }
            
            // This processes the redirect or updates the page state natively
            await update()
        }
    }
}