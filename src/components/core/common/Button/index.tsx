import { cn } from '@/libs/utils'
import { Button, ButtonProps } from 'antd'
import type { ReactNode } from 'react'

export interface ButtonPropsInterface extends ButtonProps {
    children: ReactNode
}

const ButtonCommon = ({ ...props }: ButtonPropsInterface) => {
    return <Button {...props} className={cn('', `${props.className}`)} />
}

export default ButtonCommon
