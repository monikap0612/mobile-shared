import OutboundTypes from '../constants/outbound';
import UpdatesTypes from '../constants/updates';
import moment from 'moment';
import get from 'lodash/get';

const ROOM_UPDATE_API = `/room_update`;
const TASK_API = `/tasks`;
const TASK_BATCH_API = `/tasks/batch`;
const GLITCHES_API = `/glitches`;

export function roomCleanStart(roomId) {
  const status = 'cleaning';
  const tapTs = moment().unix();
  
  return {
    type: OutboundTypes.OUTBOUND_ROOM_CLEAN_START,
    payload: {
      roomId,
      status,
    },
    meta: {
      offline: {
        effect: {
          url: `${ROOM_UPDATE_API}/${roomId}`,
          options: {
            method: 'PUT',
            body: { attendantStatus: status, tapTs }
          }
        },
        commit: { type: OutboundTypes.OUTBOUND_ROOM_UPDATE_SUCCESS },
        rollback: { type: OutboundTypes.OUTBOUND_ROOM_UPDATE_FAILURE }
      },
      auth: {
        enable: true,
        useUserSession: true
      }
    }
  }
}

export function roomCleanPause(roomId) {
  const status = 'paused';
  const tapTs = moment().unix();
  
  return {
    type: OutboundTypes.OUTBOUND_ROOM_CLEAN_PAUSE,
    payload: {
      roomId,
      status
    },
    meta: {
      offline: {
        effect: {
          url: `${ROOM_UPDATE_API}/${roomId}`,
          options: {
            method: 'PUT',
            body: { attendantStatus: status, tapTs }
          }
        },
        commit: { type: OutboundTypes.OUTBOUND_ROOM_UPDATE_SUCCESS },
        rollback: { type: OutboundTypes.OUTBOUND_ROOM_UPDATE_FAILURE }
      },
      auth: {
        enable: true,
        useUserSession: true
      }
    },
  }
}

export function roomCleanFinish(roomId) {
  const status = 'finish';
  const tapTs = moment().unix();

  return {
    type: OutboundTypes.OUTBOUND_ROOM_CLEAN_FINISH,
    payload: {
      roomId,
      status
    },
    meta: {
      offline: {
        effect: {
          url: `${ROOM_UPDATE_API}/${roomId}`,
          options: {
            method: 'PUT',
            body: { attendantStatus: status, tapTs }
          }
        },
        commit: { type: OutboundTypes.OUTBOUND_ROOM_UPDATE_SUCCESS },
        rollback: { type: OutboundTypes.OUTBOUND_ROOM_UPDATE_FAILURE }
      },
      auth: {
        enable: true,
        useUserSession: true
      }
    }
  }
}

export function roomCleanRestart(roomId) {
  const status = 'cleaning';
  const tapTs = moment().unix();
  
  return {
    type: OutboundTypes.OUTBOUND_ROOM_CLEAN_RESTART,
    payload: {
      roomId,
      status,
    },
    meta: {
      offline: {
        effect: {
          url: `${ROOM_UPDATE_API}/${roomId}`,
          options: {
            method: 'PUT',
            body: { attendantStatus: status, tapTs }
          }
        },
        commit: { type: OutboundTypes.OUTBOUND_ROOM_UPDATE_SUCCESS },
        rollback: { type: OutboundTypes.OUTBOUND_ROOM_UPDATE_FAILURE }
      },
      auth: {
        enable: true,
        useUserSession: true
      }
    }
  }
}

export function roomCleanUnpause(roomId) {
  const status = 'cleaning';
  const tapTs = moment().unix();
  
  return {
    type: OutboundTypes.OUTBOUND_ROOM_CLEAN_UNPAUSE,
    payload: {
      roomId,
      status,
    },
    meta: {
      offline: {
        effect: {
          url: `${ROOM_UPDATE_API}/${roomId}`,
          options: {
            method: 'PUT',
            body: { attendantStatus: status, tapTs }
          }
        },
        commit: { type: OutboundTypes.OUTBOUND_ROOM_UPDATE_SUCCESS },
        rollback: { type: OutboundTypes.OUTBOUND_ROOM_UPDATE_FAILURE }
      },
      auth: {
        enable: true,
        useUserSession: true
      }
    }
  }
}

export function roomDelay(roomId) {
  const status = 'delay';
  const tapTs = moment().unix();
  
  return {
    type: OutboundTypes.OUTBOUND_ROOM_DELAY,
    payload: {
      roomId,
      status,
    },
    meta: {
      offline: {
        effect: {
          url: `${ROOM_UPDATE_API}/${roomId}`,
          options: {
            method: 'PUT',
            body: { attendantStatus: status, tapTs }
          }
        },
        commit: { type: OutboundTypes.OUTBOUND_ROOM_UPDATE_SUCCESS },
        rollback: { type: OutboundTypes.OUTBOUND_ROOM_UPDATE_FAILURE }
      },
      auth: {
        enable: true,
        useUserSession: true
      }
    }
  }
}

export function roomDND(roomId) {
  const status = 'dnd';
  const tapTs = moment().unix();
  
  return {
    type: OutboundTypes.OUTBOUND_ROOM_DND,
    payload: {
      roomId,
      status,
    },
    meta: {
      offline: {
        effect: {
          url: `${ROOM_UPDATE_API}/${roomId}`,
          options: {
            method: 'PUT',
            body: { attendantStatus: status, tapTs }
          }
        },
        commit: { type: OutboundTypes.OUTBOUND_ROOM_UPDATE_SUCCESS },
        rollback: { type: OutboundTypes.OUTBOUND_ROOM_UPDATE_FAILURE }
      },
      auth: {
        enable: true,
        useUserSession: true
      }
    }
  }
}

export function roomRefuse(roomId) {
  const status = 'refuse';
  const tapTs = moment().unix();
  
  return {
    type: OutboundTypes.OUTBOUND_ROOM_REFUSE,
    payload: {
      roomId,
      status,
    },
    meta: {
      offline: {
        effect: {
          url: `${ROOM_UPDATE_API}/${roomId}`,
          options: {
            method: 'PUT',
            body: { attendantStatus: status, tapTs }
          }
        },
        commit: { type: OutboundTypes.OUTBOUND_ROOM_UPDATE_SUCCESS },
        rollback: { type: OutboundTypes.OUTBOUND_ROOM_UPDATE_FAILURE }
      },
      auth: {
        enable: true,
        useUserSession: true
      }
    }
  }
}

export function roomReset(roomId) {
  const tapTs = moment().unix();
  
  return {
    type: OutboundTypes.OUTBOUND_ROOM_RESET,
    payload: {

    },
    meta: {
      offline: {
        effect: {
          url: `/room_reset/${roomId}`,
          options: {
            method: 'POST',
            body: { platform: 'inspector', tapTs }
          }
        },
        commit: { type: OutboundTypes.OUTBOUND_ROOM_UPDATE_SUCCESS },
        rollback: { type: OutboundTypes.OUTBOUND_ROOM_UPDATE_FAILURE }
      },
      auth: {
        enable: true,
        useUserSession: true
      }
    }
  }
}

export function roomCancel(roomId) {
  const status = '';
  const tapTs = moment().unix();

  return {
    type: OutboundTypes.OUTBOUND_ROOM_CANCEL,
    payload: {
      roomId,
      status,
    },
    meta: {
      offline: {
        effect: {
          url: `${ROOM_UPDATE_API}/${roomId}`,
          options: {
            method: 'PUT',
            body: { attendantStatus: status, tapTs }
          }
        },
        commit: { type: OutboundTypes.OUTBOUND_ROOM_UPDATE_SUCCESS },
        rollback: { type: OutboundTypes.OUTBOUND_ROOM_UPDATE_FAILURE }
      },
      auth: {
        enable: true,
        useUserSession: true
      }
    }
  }
}

export function logOther(room, user, status) {
  const data = {
    date_ts: moment().unix(),
    hotel_id: user.hotel,
    room_id: room._id,
    room_name: room.name,
    user_id: user._id,
    user_username: user.username,
    user_email: user.email,
    user_firstname: user.first_name,
    user_lastname: user.last_name,
    attendant_status: status,
    image: '',
  };

  return {
    type: OutboundTypes.OUTBOUND_LOG_OTHER,
    payload: { room, user, status },
    meta: {
      offline: {
        effect: {
          url: `/attendant/${room._id}/${user._id}/log_other`,
          options: {
            method: 'POST',
            body: data
          }
        },
        commit: { type: OutboundTypes.OUTBOUND_LOG_COMPLETED },
        rollback: { type: OutboundTypes.OUTBOUND_LOG_FAILURE }
      },
      auth: {
        enable: true
      }
    }
  }
}

export function logClean(room, user, roomUpdate) {
  const data = {
    id: null,
    hotel_id: user.hotel,
    room_id: room._id,
    room_name: room.name,
    start_ts: get(roomUpdate, 'startTime') || moment().unix(),
    end_ts: moment().unix(),
    start_user_id: user._id,
    start_username: user.username,
    start_email: user.email,
    start_firstname: user.first_name,
    start_lastname: user.last_name,
    end_user_id: user._id,
    end_username: user.username,
    end_email: user.email,
    end_firstname: user.first_name,
    end_lastname: user.last_name,
    paused_time: get(roomUpdate, 'pauseTime'),
  }

  return {
    type: OutboundTypes.OUTBOUND_LOG_CLEAN,
    payload: { room, user, roomUpdate },
    meta: {
      offline: {
        effect: {
          url: `/attendant/${room._id}/${user._id}/cleaned`,
          options: {
            method: 'POST',
            body: data
          }
        },
        commit: { type: OutboundTypes.OUTBOUND_LOG_COMPLETED },
        rollback: { type: OutboundTypes.OUTBOUND_LOG_FAILURE }
      },
      auth: {
        enable: true
      }
    }
  }
}

export function roomUpdate(roomId, field, value) {
  const status = '';
  const tapTs = moment().unix();

  return {
    type: OutboundTypes.OUTBOUND_ROOM_MODEL_UPDATE,
    payload: {
      roomId,
      field,
      value
    },
    meta: {
      offline: {
        effect: {
          url: `${ROOM_UPDATE_API}/${roomId}`,
          options: {
            method: 'PUT',
            body: { [field]: value, tapTs }
          }
        },
        commit: { type: OutboundTypes.OUTBOUND_ROOM_UPDATE_SUCCESS },
        rollback: { type: OutboundTypes.OUTBOUND_ROOM_UPDATE_FAILURE }
      },
      auth: {
        enable: true,
        useUserSession: true
      }
    }
  } 
}

export function taskCreate(task) {
  const tapTs = moment().unix();
  console.log(tapTs)

  return {
    type: OutboundTypes.OUTBOUND_TASK_CREATE,
    payload: {
      task
    },
    meta: {
      offline: {
        effect: {
          url: TASK_API,
          options: {
            method: 'POST',
            body: { ...task, tapTs }
          }
        },
        commit: { type: OutboundTypes.OUTBOUND_TASK_CREATE_SUCCESS },
        rollback: { type: OutboundTypes.OUTBOUND_TASK_CREATE_FAILURE },
      },
      auth: {
        enable: true
      }
    }
  }
}

export function tasksCreate(task) {
  const tapTs = moment().unix();

  return {
    type: OutboundTypes.OUTBOUND_TASKS_CREATE,
    payload: {
      task
    },
    meta: {
      offline: {
        effect: {
          url: `${TASK_BATCH_API}`,
          options: {
            method: 'POST',
            body: { ...task, tapTs }
          }
        },
        commit: { type: OutboundTypes.OUTBOUND_TASKS_CREATE_SUCCESS },
        rollback: { type: OutboundTypes.OUTBOUND_TASKS_CREATE_FAILURE },        
      },
      auth: {
        enable: true
      }
    }
  }
}

export function taskUpdate(uuid, data) {
  const tapTs = moment().unix();

  return {
    type: OutboundTypes.OUTBOUND_TASK_UPDATE,
    payload: {
      uuid,
      data
    },
    meta: {
      offline: {
        effect: {
          url: `${TASK_API}/${uuid}`,
          options: {
            method: 'PUT',
            body: { ...data, tapTs }
          }
        },
        commit: { type: OutboundTypes.OUTBOUND_TASK_UPDATE_SUCCESS },
        rollback: { type: OutboundTypes.OUTBOUND_TASK_UPDATE_FAILURE },
      },
      auth: {
        enable: true
      }
    }
  }
}

export function taskUpdateBatch(tasks, userId) {
  const tapTs = moment().unix();
  
  return {
    type: OutboundTypes.OUTBOUND_TASK_UPDATE_BATCH,
    payload: {
      userId,
      tasks
    },
    meta: {
      offline: {
        effect: {
          url: `${TASK_API}/batch`,
          options: {
            method: 'PUT',
            body: { tasks, user_id: userId, tapTs }
          }
        },
        commit: { type: OutboundTypes.OUTBOUND_TASK_UPDATE_BATCH_SUCCESS },
        rollback: { type: OutboundTypes.OUTBOUND_TASK_UPDATE_BATCH_FAILURE },
      }
    },
    auth: {
      enable: true
    }
  }
}

export function taskReassign(uuid, data) {
  const tapTs = moment().unix();
  
  return {
    type: OutboundTypes.OUTBOUND_TASK_REASSIGN,
    payload: {
      uuid,
      data
    },
    meta: {
      offline: {
        effect: {
          url: `${TASK_API}/${uuid}/reassign`,
          options: {
            method: 'PUT',
            body: { ...data, tapTs }
          }
        },
        commit: { type: OutboundTypes.OUTBOUND_TASK_REASSIGN_SUCCESS },
        rollback: { type: OutboundTypes.OUTBOUND_TASK_REASSIGN_FAILURE }
      }
    },
    auth: {
      enable: true
    }
  }
}

export function updateGlitch(glitchId, task_id, user_id) {
  return {
    type: OutboundTypes.OUTBOUND_GLITCH_UPDATE,
    payload: {
      glitchId
    },
    meta: {
      offline: {
        effect: {
          url: `${GLITCHES_API}/${glitchId}/task`,
          options: {
            method: 'PUT',
            body: { task_id, user_id }
          }
        },
        commit: { type: OutboundTypes.OUTBOUND_GLITCH_UPDATE_SUCCESS },
        rollback: { type: OutboundTypes.OUTBOUND_GLITCH_UPDATE_FAILURE },
      },
      auth: {
        enable: true
      }
    }
  }
}

export function roomInspect(roomId) {
  return {
    type: OutboundTypes.ROOM_INSPECT,
    roomId,
    status: 'finish',
    tapTs: moment().unix()
  }
}

export function roomNoCheck(roomId) {
  return {
    type: OutboundTypes.ROOM_NO_CHECK,
    roomId,
    status: 'no-check',
    tapTs: moment().unix()
  }
}

export function roomConfirmDND(roomId) {
  return {
    type: OutboundTypes.ROOM_CONFIRM_DND,
    roomId,
    status: 'confirm-dnd',
    tapTs: moment().unix()
  }
}

export default {
  roomCleanStart,
  roomCleanRestart,
  roomCleanPause,
  roomCleanUnpause,
  roomCleanFinish,
  roomDelay,
  roomDND,
  roomRefuse,
  roomInspect,
  roomNoCheck,
  roomConfirmDND,
  roomReset,
  roomCancel,
  logOther,
  logClean,
  taskCreate,
  tasksCreate,
  taskUpdate,
  taskUpdateBatch,
  taskReassign,
  updateGlitch
}