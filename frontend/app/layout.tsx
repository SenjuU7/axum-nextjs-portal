import React from "react"
import "@/styles/admin.css";

export const metadata = {
  title: 'Neural Website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 antialiased">
        {children}
      </body>
    </html>
  )
}