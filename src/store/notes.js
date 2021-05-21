import getUuidv4 from '../utils/getUuidv4'

const state = {
  notes: [
    {
      guid: getUuidv4(),
      title: 'Tickets to create'
    },
    {
      guid: getUuidv4(),
      title: 'UI quick wins'
    },
    {
      guid: getUuidv4(),
      title: 'Recipe ideas'
    },
    {
      guid: getUuidv4(),
      title: 'Frontend interview questions examples'
    }
  ]
}

const getters = {
  getNotes(state) {
    return state.notes
  }
}

export default {
  state,
  getters
}