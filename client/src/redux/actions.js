import axios from 'axios'
import * as Actions from './actionTypes'

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/auth/current_user')
  dispatch({ type: Actions.FETCH_USER, payload: res.data })
}
