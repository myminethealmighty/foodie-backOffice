import { GetMenusOptions, MenuSlice } from "@/types/menu";
import { config } from "@/utils/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: MenuSlice = {
  items: [],
  isLoading: false,
  error: null,
};

export const getMenus = createAsyncThunk(
  "menuSlice/getMenus",
  async (options: GetMenusOptions, thunkApi) => {
    const { locationId, onError, onSuccess } = options;
    try {
      const response = await fetch(
        `${config.apiBaseUrl}/menu?locationId=${locationId}`
      );
      const menus = await response.json();
      thunkApi.dispatch(setMenus(menus));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const menuSlice = createSlice({
  name: "menuSlice",
  initialState,
  reducers: {
    setMenus: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setMenus } = menuSlice.actions;
export default menuSlice.reducer;
