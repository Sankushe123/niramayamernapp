import axios from "axios";
import { fetchAccessStart, fetchAccessSuccess, fetchAccessFailure } from "../accessSlice";

export const fetchAccessByRole = (role) => async (dispatch) => {
  try {
    dispatch(fetchAccessStart());

    const response = await axios.get(`/api/v1/accessManagement?role=${role}`);
    
    dispatch(fetchAccessSuccess(response.data));
  } catch (error) {
    dispatch(fetchAccessFailure(error.message));
  }
};
