import axios from "axios";
import {
  createListFailure,
  createListStart,
  createListSuccess,
  deleteListFailure,
  deleteListStart,
  deleteListSuccess,
  getListsFailure,
  getListsStart,
  getListsSuccess,
} from "./ListActions";

export const getLists = async (dispatch) => {
  dispatch(getListsStart());

  const token = JSON.parse(localStorage.getItem("user"))?.accessToken;

  try {
    const res = await axios.get("http://localhost:8080/api/lists", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(getListsSuccess(res.data));
  } catch (err) {
    dispatch(getListsFailure());
  }
};

export const deleteList = async (id, dispatch) => {
  dispatch(deleteListStart());

  // Retrieve the token from localStorage
  const token = JSON.parse(localStorage.getItem("user"))?.accessToken;

  try {
    await axios.delete("http://localhost:8080/api/lists/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(deleteListSuccess(id));
  } catch (err) {
    dispatch(deleteListFailure());
  }
};

export const createList = async (list, dispatch) => {
  dispatch(createListStart());
  const token = JSON.parse(localStorage.getItem("user"))?.accessToken;

  try {
    const res = await axios.post("http://localhost:8080/api/lists", list, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(createListSuccess(res.data));
  } catch (err) {
    dispatch(createListFailure());
  }
};
