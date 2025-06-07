import { AuthGuard } from "@/components/guards/auth-guard";
import { SessionProvider } from "@/contexts/session-context";


export default async function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SessionProvider>
            <AuthGuard>{children}</AuthGuard>
        </SessionProvider>
    );
}
