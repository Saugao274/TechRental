import { Suspense } from 'react'
import VerifyForm from '@/components/modules/forgotPassword/indev'

export default function VerifyPage() {
    return (
        <Suspense fallback={<div>Đang tải...</div>}>
            <VerifyForm />
        </Suspense>
    )
}
