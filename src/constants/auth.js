import { createTypes } from 'reduxsauce';

export default createTypes(`
  HOTEL_REQUEST
  HOTEL_SUCCESS
  HOTEL_FAILURE

  USER_REQUEST
  USER_SUCCESS
  USER_FAILURE

  HOTEL_FETCH
  HOTEL_FETCH_SUCCESS
  HOTEL_FETCH_FAILURE

  HOTEL_RESET
  LOGOUT
`);
