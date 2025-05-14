import constants from '@/settings/constants'
import webStorageClient from './webStorageClient'

const deleteStorage = () => {
    webStorageClient.remove(constants.ACCESS_TOKEN)
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('privateKey')
}
export default deleteStorage
