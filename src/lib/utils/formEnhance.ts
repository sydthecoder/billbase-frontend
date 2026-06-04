import toast from 'svelte-hot-french-toast'
import { goto } from '$app/navigation'

export function enhanceWithToast(options: {
    successMessage?: string
    errorMessage?: string
    onSuccess?: (data: any) => void
    onError?: (data: any) => void
}) {
    return () => {
        const toastId = toast.loading('Processing...')

        return async ({ result, update }: any) => {
            if (result.type === 'success') {
                toast.success(options.successMessage ?? 'Success!', { id: toastId })
                options.onSuccess?.(result.data)
                await update()

            } else if (result.type === 'redirect') {
                toast.success(options.successMessage ?? 'Success!', { id: toastId })
                options.onSuccess?.(result.data)
                await new Promise(r => setTimeout(r, 800))
                await update()

            } else {
                const msg = options.errorMessage ?? 'Something went wrong'

                toast.error(msg, { id: toastId })
                options.onError?.(result.data)
                await update()
            }
        }
    }
}