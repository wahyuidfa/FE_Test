import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

export function Providers({ children }) {
    return (
        <NextThemesProvider {...props}>{children}</NextThemesProvider>
    )
}