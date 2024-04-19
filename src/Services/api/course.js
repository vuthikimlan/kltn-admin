import axios from "../request"

export const createCourse = (values) => {
    return axios.post('/course/create', values)
}
export const createPart = (_id, values) => {
    const data = {
        parts: [
            {
                partName: values.partName,
                
            }
        ]
    }
    return axios.post(`/course/${_id}/add-part`, data)
}
export const createLectures = (courseId, partId, values) => {
    const data = {
        lectureName:  values.lectureName,
        descriptionLectures: values.descriptionLectures,
        video: values.video,
        document: values.document,
        isFree: values.isFree
            
    }
    return axios.post(`/course/${courseId}/add-lectures/${partId}`, data)
}

export const getListCourse = () => {
    return axios.get('/course/getAll')
}

export const getCourseById = (_id) => {
    return axios.get(`/course/${_id}`)
}

export const updateCourse = (_id, values) => {
    const data = {
        name: values.name,
        description: values.description,
        image: values.image,
        field: values.field,
        topic: values.topic,
        price: values.price,
        lessonContent: values.lessonContent,
        conditionParticipate: values.conditionParticipate,
        object: values.object,
        level: values.level,
    }
    return axios.put(`/course/${_id}`, data)
}

export const updateLecturse = (courseId, partId, lectureId, values) => {
    const data = {
        lectureName: values.lectureName,
        descriptionLectures: values.descriptionLectures,
        video: values.video,
        document: values.document,
        isFree: values.isFree
                
    }
    return axios.put(`/course/${courseId}/${partId}/${lectureId}`, data)
}
export const updatePart = (courseId, partId, values) => {
    const data = {
        partName: values.partName
    }
    return axios.put(`/course/${courseId}/${partId}`, data)
}

export const deleteCourse = (_id) => {
    return axios.delete(`/course/${_id}`)
}
export const deletePart = (courseId, partId) => {
    return axios.delete(`/course/${courseId}/del-part/${partId} `)
}

export const deleteLecture = (courseId, partId, lectureId) => {
    return axios.delete(`/course/${courseId}/${partId}/${lectureId} `)
}

export const filterCourse = (values) => {
    const courseValues = {
        name: values.name,
        field: values.field,
        category: values.category,
        price: values.price,
        level: values.level,
    }
    return axios.post('/course/filter', courseValues)
}

export const uploadFile = (file) => {
    const formData = new FormData()
    formData.append("file", file)
    console.log('file', file);
    return axios.post('/file/upload', formData)
}

export const approveCourse = (courseId) => {
    return axios.post(`/approve/approval-request/${courseId}`)
}

export const getApproveCourse = () => {
    return axios.get(`/approve/pending`)
}

export const isAcceptCourse = (requestId, ) => {
    const data = {
        status: "approved"
    }
    return axios.put(`/approve/updateStatus/${requestId}`, data)
}

export const rejectedCourse = (requestId, ) => {
    const data = {
        status: "rejected"
    }
    return axios.put(`/approve/updateStatus/${requestId}`, data)
}

export const getCourseAprroved = () => {
    return axios.get('/approve/approved')
}

export const getCourseRejected = () => {
    return axios.get('/approve/rejected')
}

export const applyDiscount = (courseId, values) => {
    return axios.post(`/course/${courseId}/apply-discount`, values)
}
