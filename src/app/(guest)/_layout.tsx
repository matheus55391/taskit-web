import { GuestGuard } from "@/components/guards/guest-guard";

export default async function GuestLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <GuestGuard>
            {children}
        </GuestGuard>
    );
}

