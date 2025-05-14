import axiosInstance from '../base/axiosInstance'
import { RequestOptionsInterface } from '@/model/requestOptions'
import webStorageClient from '@/utils/webStorageClient'
import constants from '@/settings/constants'

const deleteRequest = async (
    url: string,
    options?: RequestOptionsInterface,
    fomrData?: boolean,
): Promise<object> => {
    let header = {}

    const data = options?.data
    const tokenClient = webStorageClient.get(constants.ACCESS_TOKEN)
    let headers: any = {
        'Content-Type': fomrData ? 'multipart/form-data' : 'application/json',
        ...header,
    }

    if (tokenClient) headers.Authorization = `Bearer ${tokenClient}`

    return axiosInstance
        .delete(url, {
            data,
            headers: {
                ...headers,
            },
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

export { deleteRequest }
