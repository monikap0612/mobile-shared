const roomUpdate = (roomId, field, value) => {
    return `${roomId}:${field}:${value}`
}

const roomCleanLog = (roomId, startTs) => {
    return `${roomId}:${startTs}`
}

const roomOtherLog = (roomId, status) => {
    return `${roomId}:${status}`
}

export default {
    roomUpdate,
    roomCleanLog,
    roomOtherLog
}