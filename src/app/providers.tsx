import { Toaster } from "@/components/ui/sonner";
import { TanstackQueryProvider } from "@/contexts/tanstack-query-provider";
import { ThemeProvider } from "@/contexts/theme-context";

export default async function Providers({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <ThemeProvider>
            <TanstackQueryProvider>
                {children}
                <Toaster />
            </TanstackQueryProvider>
        </ThemeProvider>
    );
}