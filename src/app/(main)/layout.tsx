import MainLayout from '@/components/core/layouts/MainLayout'
import { cn } from '@/libs/utils'
export default async function LayoutAuth({
    children,
}: {
    readonly children: React.ReactNode
}) {
    return (
        <div className="relative">
            <div
                className={cn(
                    'z-[-1000] h-screen w-full overflow-y-auto',
                    // "bg-[url('https://img.freepik.com/premium-vector/abstract-realistic-blue-sky-with-clouds-background_38782-305.jpg?semt=ais_hybrid')] bg-cover bg-no-repeat blur-3xl",
                    "bg-white"
                )}
            ></div>
            <div className="absolute top-0 z-[1] h-screen w-full overflow-hidden overflow-y-auto overflow-x-hidden">
                <MainLayout>{children}</MainLayout>
            </div>
        </div>
    )
}
