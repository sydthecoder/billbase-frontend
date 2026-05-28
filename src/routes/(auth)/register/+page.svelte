<script lang="ts">
    import { enhance } from '$app/forms'
    import type { ActionData } from './$types'

    let { form }: { form: ActionData } = $props()
</script>

<form method="POST" use:enhance>
    {#if form?.error}
        <p>{form.error}</p>
    {/if}

    <input
        type="email"
        name="email"
        value={form?.email ?? ''}
        placeholder="Email"
        required
    />

    <input
        type="password"
        name="password"
        placeholder="Password"
        required
    />

    <input
        type="password"
        name="password_confirmation"
        placeholder="Confirm Password"
        required
    />

    <button type="submit">Register</button>
</form>