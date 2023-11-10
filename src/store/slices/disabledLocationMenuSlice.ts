import { DisabledLocationMenuSlice } from "@/types/disabledLocationMenu";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: DisabledLocationMenuSlice = {
  items: [],
  isLoading: false,
  error: null,
};

const disabledLocationMenuSlice = createSlice({
  name: "disabledLocationMenuSlice",
  initialState,
  reducers: {
    setDisabledLocationMenus: (state, action) => {
      state.items = action.payload;
    },
    addDisabledLocationMenu: (state, action) => {
      state.items = [...state.items, ...action.payload];
    },
    removeDisabledLocationMenu: (
      state,
      action: PayloadAction<{ locationId: number; menuId: number }>
    ) => {
      const { locationId, menuId } = action.payload;
      state.items = state.items.filter(
        (item) => !(item.locationId === locationId && item.menuId === menuId)
      );
    },
  },
});

export const {
  setDisabledLocationMenus,
  addDisabledLocationMenu,
  removeDisabledLocationMenu,
} = disabledLocationMenuSlice.actions;

export default disabledLocationMenuSlice.reducer;
