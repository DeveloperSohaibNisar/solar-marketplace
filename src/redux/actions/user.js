import {
  CLEAR_ERRORS,
  LOADING_UI,
  SET_AUTHENTICATED,
  SET_ERRORS,
  SET_SUCCESS,
  SET_UNAUTHENTICATED,
  STOP_LOADING_UI,
} from "../type";
import supabase from "../../supabaseClient";

export const signupUser = (userData) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  try {
    const { session, error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          name: userData.name,
          role: "customer",
        },
      },
    });

    if (error) {
      throw error;
    }

    dispatch({
      type: SET_AUTHENTICATED,
      payload: session.user,
    });
    dispatch({ type: SET_SUCCESS, payload: "Signed up successfuly" });
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: error.message || "something went wrong",
    });
  } finally {
    dispatch({ type: STOP_LOADING_UI });
  }
};

export const loginUser = (userData, redirect) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  try {
    const { data: session, error } = await supabase.auth.signInWithPassword({
      email: userData.email,
      password: userData.password,
    });

    if (error) {
      throw error;
    }

    dispatch({
      type: SET_AUTHENTICATED,
      payload: session.user,
    });
    dispatch({ type: SET_SUCCESS, payload: "Loged in successfuly" });
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: error.message || "something went wrong",
    });
  } finally {
    dispatch({ type: STOP_LOADING_UI });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  try {
    const { error } = await supabase.auth.signOut({ scope: "local" });

    if (error) {
      throw error;
    }

    dispatch({ type: SET_UNAUTHENTICATED });
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: error.message || "something went wrong",
    });
  } finally {
    dispatch({ type: STOP_LOADING_UI });
  }
};

export const getUserData = (userData) => async (dispatch) => {
  // // const navigate = useNavigate();
  // dispatch({ type: CLEAR_ERRORS });
  // dispatch({ type: LOADING_UI });
  // const { data, error } = await supabase.auth.signInWithPassword({
  //   email: userData.email,
  //   password: userData.password,
  // });
  // if (error) {
  //   dispatch({
  //     type: SET_ERRORS,
  //     payload: error.message || "something went wrong",
  //   });
  // } else {
  //   dispatch({
  //     type: SET_AUTHENTICATED,
  //     payload: data.user.user_metadata.role,
  //   });
  // }
  // dispatch({ type: STOP_LOADING_UI });
};
