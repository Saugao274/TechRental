import * as faceapi from 'face-api.js'

export const loadFaceApiModels = async () => {
    await faceapi.nets.tinyFaceDetector.loadFromUri(
        '/models/tiny_face_detector',
    )
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models/face_landmark_68')
    await faceapi.nets.faceRecognitionNet.loadFromUri(
        '/models/face_recognition',
    )
}

export const getFaceDescriptorFromImageURL = async (imageUrl: string) => {
    const img = await faceapi.fetchImage(imageUrl)
    const detection = await faceapi
        .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor()

    return detection?.descriptor || null
}

export const getFaceDescriptorFromVideo = async (videoEl: HTMLVideoElement) => {
    const detection = await faceapi
        .detectSingleFace(videoEl, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor()

    return detection?.descriptor || null
}

export const compareFaceDescriptors = (
    desc1: Float32Array,
    desc2: Float32Array,
    threshold = 0.6,
) => {
    if (!desc1 || !desc2) return false
    const distance = faceapi.euclideanDistance(desc1, desc2)
    return distance < threshold
}
