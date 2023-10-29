import { createSlice } from "@reduxjs/toolkit";
import { MenuCategoryMenuSlice } from "./../../types/menuCategoryMenu";
const initialState: MenuCategoryMenuSlice = {
  items: [],
  isLoading: false,
  error: null,
};

const menuCategoryMenuSlice = createSlice({
  name: "menuCategoryMenu",
  initialState,
  reducers: {
    setMenuCategoryMenus: (state, action) => {
      state.items = action.payload;
    },
    addMenuCategoryMenu: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    replaceMenuCategoryMenu: (state, action) => {
      const menuId = action.payload[0].menuId;
      const otherMenuCategoryMenu = state.items.filter(
        (item) => item.menuId !== menuId
      );
      state.items = [...otherMenuCategoryMenu, ...action.payload];
    },
  },
});

export const {
  setMenuCategoryMenus,
  addMenuCategoryMenu,
  replaceMenuCategoryMenu,
} = menuCategoryMenuSlice.actions;

export default menuCategoryMenuSlice.reducer;
