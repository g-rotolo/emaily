import axios from 'axios';
import { GET_USER, GET_SURVEYS } from './types';

export const getUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: GET_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);
  dispatch({ type: GET_USER, payload: res.data });
};

export const submitSurvey = (survey, history) => async dispatch => {
  const res = await axios.post('/api/surveys', survey);

  history.push('/surveys');
  dispatch({ type: GET_USER, payload: res.data });
};

export const getSurveys = () => async dispatch => {
  const res = await axios.get('/api/surveys');
  dispatch({ type: GET_SURVEYS, payload: res.data });
}