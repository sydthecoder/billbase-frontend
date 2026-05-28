import { serverApi } from '$lib/server/api'
import type { RequestHandler } from './$types'

export const GET: RequestHandler = async ({ params, cookies, url }) => {
    const token = cookies.get('auth_token')!
    const download = url.searchParams.has('download')

    const endpoint = download
        ? `/quotes/${params.id}/pdf/download`
        : `/quotes/${params.id}/pdf`

    const response = await serverApi(endpoint, {}, `auth_token=${token}`)

    if (!response.ok) {
        return new Response('Failed to generate PDF', { status: response.status })
    }

    const pdf = await response.arrayBuffer()

    return new Response(pdf, {
        headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': download
                ? `attachment; filename="quote-${params.id}.pdf"`
                : `inline; filename="quote-${params.id}.pdf"`,
        },
    })
}