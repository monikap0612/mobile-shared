import { times } from 'lodash/util';

import moment from 'moment';

// Yves
const USER_ID = '55d06bb599295b3a5a000076'

const task = (due_date) => ({
  creator_id: USER_ID,
  date_ts: moment(due_date).unix(),
  due_date,
  dueDateDisplay: due_date ? moment(due_date).format("DD MMM. YYYY") : "Backlog",
  task: 'Sink: Unclog',
  lastMessage: 'Matress neddd to be flippped',
  roomName: '101',
  is_priority: 1,
  is_completed: 1,
  assigned: {
  },
  meta: {
    isMaintenance: true,
    image: 'https://placekitten.com/g/200/300',
  },
  room: {
    name: '1022'
  },
})

export const tasks = [
  task(),
  task(moment()),
  task(moment()),
  task(moment().add(-1, 'day')),
  task(moment().add(-5, 'day')),
  task(moment().add(-5, 'day')),
  task(moment().add(-5, 'day')),
]
