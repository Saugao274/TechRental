import { message } from 'antd'
import { RequestOptionsInterface } from '@/model/requestOptions'
import webStorageClient from '@/utils/webStorageClient'
import axiosInstance from '../base/axiosInstance'
import constants from '@/settings/constants'

const postRequest = async (
    url: string,
    options?: RequestOptionsInterface,
    fomrData?: boolean,
) => {
    let header = {}

    const data = options?.data
    const tokenClient = webStorageClient.get(constants.ACCESS_TOKEN)
    let headers: any = {
        'Content-Type': fomrData ? 'multipart/form-data' : 'application/json',
        ...header,
    }

    if (tokenClient) headers.Authorization = `Bearer ${tokenClient}`
   
console.log('[FE DEBUG] headers sent to backend:', headers)
console.log('[FE DEBUG] token from storage:', tokenClient)

    return axiosInstance
        .post(url, data, {
            headers: headers,
            withCredentials: true,
        })
        .then((res: any) => {
            if (res?.statusCode >= 400 || res?.code >= 400) {
                return Promise.reject(res)
            } else {
                return res
            }
        })
        .catch((err: any) => {
            return Promise.reject(err)
        })
}

export { postRequest }
