'use client'
import { useEffect } from 'react'
import { FormInstance } from 'antd'

export const useFormAutoSave = (form: FormInstance, key: string) => {
    useEffect(() => {
        const saved = localStorage.getItem(key)
        if (saved) {
            form.setFieldsValue(JSON.parse(saved))
        }
    }, [])

    const onValuesChange = (_: any, allValues: any) => {
        localStorage.setItem(key, JSON.stringify(allValues))
    }

    return { onValuesChange }
}
