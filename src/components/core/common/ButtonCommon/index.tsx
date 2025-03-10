import { cn } from '@/libs/utils'
import { Button, ButtonProps } from 'antd'
import type { ReactNode } from 'react'

export interface ButtonPropsInterface extends ButtonProps {
    children: ReactNode
}

export default function ButtonCommon({ ...props }: ButtonPropsInterface) {
    return (
        <Button
            {...props}
            className={cn(
                '!rounded !shadow-none !font-semibold',
                `${props.className}`,
                `${props.variant == 'outlined' ? 'border !border-primary !text-primary hover:!bg-primary hover:!text-white' : ''}`,
            )}
        />
    )
}
