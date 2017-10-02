const hashTaskCreate = (task, location="NL", assignedLabel="", photoId='') => {
    return `${task}:${location}:${assignLabel}:${photoId}`
}

const hashTasksCreate = (task, firstRoomId="NL", assignedLabel="", photoId='') => {
    return `${task}:${firstRoomId}:${assignLabel}:${photoId}`
}

const hashTaskUpdate = (taskId, updateType, updateValue) => {
    return `${taskId}:${updateType}:${updateValue}`
}

const hashTaskConvert = (taskId) => {
    return taskId
}

export default {
    hashTaskCreate,
    hashTasksCreate,
    hashTaskUpdate,
    hashTaskConvert
}