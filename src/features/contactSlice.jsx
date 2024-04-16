import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import RefreshToken from "../auth/RefreshToken";

import secureLocalStorage from "react-secure-storage";
import axios from "../auth/AxiosConfig";

export const setGetContactList = createAsyncThunk(
  "contact/setGetContactList",
  async () => {
    try {
      // await RefreshToken();
      const response = await axios.get("/api/contacts", {
        headers: {
          Authorization: `Bearer ${secureLocalStorage.getItem("accessToken")}`,
        },
      });

      return response.data;
    } catch (error) {
      const errorMessage = JSON.parse(error.request.response);
      throw new Error(
        errorMessage.errors[0] ? errorMessage.errors[0] : error.message
      );
    }
  }
);
export const setAddContact = createAsyncThunk(
  "contact/setAddContact",
  async (data) => {
    try {
      // await RefreshToken();
      const response = await axios.post("/api/contacts", data, {
        headers: {
          Authorization: `Bearer ${secureLocalStorage.getItem("accessToken")}`,
        },
      });

      return response.data;
    } catch (error) {
      const errorMessage = JSON.parse(error.request.response);
      throw new Error(
        errorMessage.errors[0] ? errorMessage.errors[0] : error.message
      );
    }
  }
);
export const detailContact = createAsyncThunk(
  "contact/detailContact",
  async (data) => {
    return data;
  }
);

export const setDeleteContact = createAsyncThunk(
  "contact/setDeleteContact",
  async (id) => {
    try {
      // await RefreshToken();
      const response = await axios.delete(`/api/contacts/${id}`, {
        headers: {
          Authorization: `Bearer ${secureLocalStorage.getItem("accessToken")}`,
        },
      });

      return response.data;
    } catch (error) {
      const errorMessage = JSON.parse(error.request.response);
      throw new Error(
        errorMessage.errors[0] ? errorMessage.errors[0] : error.message
      );
    }
  }
);
export const setUpdateContact = createAsyncThunk(
  "contact/setUpdateContact",
  async (data) => {
    try {
      // await RefreshToken();
      const response = await axios.put(
        `/api/contacts/${data.contactId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${secureLocalStorage.getItem(
              "accessToken"
            )}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      const errorMessage = JSON.parse(error.request.response);
      throw new Error(
        errorMessage.errors[0] ? errorMessage.errors[0] : error.message
      );
    }
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    data: null,
    loading: false,
    error: null,
    dataAdd: null,
    errorAdd: null,

    dataVal: null,
    dataUpdate: null,
    errorEdit: null,
    dataDelete: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // setGetContactList
    builder
      .addCase(setGetContactList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setGetContactList.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.loading = false;
      })
      .addCase(setGetContactList.rejected, (state, action) => {
        state.data = null;
        state.loading = false;
        state.error = action.error.message;
      })
      //Add contact
      .addCase(setAddContact.pending, (state) => {
        state.loading = true;
        state.errorAdd = null;
      })
      .addCase(setAddContact.fulfilled, (state, action) => {
        state.dataAdd = action.payload;
        state.loading = false;
        state.errorAdd = null;
      })
      .addCase(setAddContact.rejected, (state, action) => {
        state.dataAdd = null;
        state.loading = false;
        state.errorAdd = action.error.message;
      })

      //Detail Contact
      .addCase(detailContact.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.dataAdd = null;
        state.errorAdd = null;
      })
      .addCase(detailContact.fulfilled, (state, action) => {
        state.dataVal = action.payload;
        state.loading = false;
        state.dataAdd = null;
        state.dataUpdate = null;
      })

      //Delete contact
      .addCase(setDeleteContact.pending, (state) => {
        state.loading = true;
        state.dataDelete = null;
      })
      .addCase(setDeleteContact.fulfilled, (state, action) => {
        state.dataDelete = action.payload;
        state.loading = false;
      })
      .addCase(setDeleteContact.rejected, (state, action) => {
        state.dataDelete = null;
        state.loading = false;
        state.error = action.error.message;
      })
    
      //Update contact
      .addCase(setUpdateContact.pending, (state) => {
        state.loading = true;
        state.errorEdit = null;
      })
      .addCase(setUpdateContact.fulfilled, (state, action) => {
        state.dataUpdate = action.payload;
        state.loading = false;
        state.errorEdit = null;
      })
      .addCase(setUpdateContact.rejected, (state, action) => {
        state.dataUpdate = null;
        state.loading = false;
        state.errorEdit = action.error.message;
      });
  },
});

export default contactSlice.reducer;
