import { vendors } from "../../static/data";
import supabase from "../../supabaseClient";
import {
  CLEAR_ERRORS,
  LOADING_UI,
  LOADING_VENDOR,
  SET_AUTHENTICATED,
  SET_ERRORS,
  SET_SUCCESS,
  SET_VENDOR,
  STOP_LOADING_UI,
  STOP_LOADING_VENDOR,
} from "../type";

export const signupVendor = (vendorData) => async (dispatch) => {
  // dispatch({ type: CLEAR_ERRORS });
  dispatch({ type: LOADING_UI });

  const {
    companyName,
    contactPersonName,
    contactEmail,
    contactNumber,
    companyAddress,
    vatNumber,
    businessLicense,
    password,
    description,
  } = vendorData;

  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  const fileExtension = businessLicense.name.split(".").pop();

  try {
    const { data: storageData, error: storageError } = await supabase.storage
      .from("licenses")
      .upload(`${uniqueSuffix}.${fileExtension}`, businessLicense, {
        contentType: "image/*",
      });

    if (storageError) {
      throw storageError;
    }

    const { data: session, error } = await supabase.auth.signUp({
      email: contactEmail,
      password: password,
      options: {
        data: {
          role: "vendor",
          name: companyName,
          contact_person_name: contactPersonName,
          email: contactEmail,
          number: contactNumber,
          address: companyAddress,
          vat_number: vatNumber,
          business_license_picture_url: `${process.env.REACT_APP_SUPABASE_URL}/storage/v1/object/public/${storageData.fullPath}`,
          description,
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

export const getVendorData = () => async (dispatch, getState) => {
  dispatch({ type: LOADING_VENDOR });
  const user = getState().user;
  try {
    let { data, error } = await supabase
      .from("vendors")
      .select("*")
      .eq("id", user.credentials.id)
      .single();

    if (error) {
      throw error;
    }

    dispatch({
      type: SET_VENDOR,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: error.message || "something went wrong",
    });
  } finally {
    dispatch({ type: STOP_LOADING_VENDOR });
  }
};

export const uploadProduct = (productData) => async (dispatch) => {
  const {
    name,
    categoryId,
    description,
    originalPrice,
    discountPrice,
    stock,
    detail,
    images,
    vendorId,
  } = productData;

  dispatch({ type: LOADING_UI });

  const uploadPromises = images.map((image) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = image.name.split(".").pop();
    return supabase.storage
      .from("products")
      .upload(`${uniqueSuffix}.${fileExtension}`, image, {
        contentType: "image/*",
      });
  });

  try {
    const uploads = await Promise.all(uploadPromises);
    const image_urls = uploads.map(({ data, error }) => {
      console.log(error);
      if (error) {
        throw error;
      }
      return `${process.env.REACT_APP_SUPABASE_URL}/storage/v1/object/public/${data.fullPath}`;
    });
    const { data, error } = await supabase
      .from("products")
      .insert([
        {
          category_id: categoryId,
          name,
          description,
          price: originalPrice,
          discount_price: discountPrice,
          stock,
          image_urls,
          vendor_id: vendorId,
          detail,
        },
      ])
      .select();

    if (error) {
      throw error;
    }

    dispatch({ type: SET_SUCCESS, payload: "Product created succefuly" });
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: error.message || "something went wrong",
    });
  } finally {
    dispatch({ type: STOP_LOADING_UI });
  }
};
