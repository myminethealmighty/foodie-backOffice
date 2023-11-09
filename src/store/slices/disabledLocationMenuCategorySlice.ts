import { DisabledLocationMenuCategorySlice } from "@/types/disabledLocationMenuCategorySlice";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: DisabledLocationMenuCategorySlice = {
  items: [],
  isLoading: false,
  error: null,
};

const DisabledLocationMenuCategorySlice = createSlice({
  name: "disabledLocationMenuCategorySlice",
  initialState,
  reducers: {
    setDisabledLocationMenuCategories: (state, action) => {
      state.items = action.payload;
    },
    addDisabledLocationMenuCategory: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeDisabledLocationMenuCategory: (
      state,
      action: PayloadAction<{ locationId: number; menuCategoryId: number }>
    ) => {
      const { locationId, menuCategoryId } = action.payload;
      state.items = state.items.filter(
        (item) =>
          !(
            item.locationId === locationId &&
            item.menuCategoryId === menuCategoryId
          )
      );
    },
  },
});

export const {
  setDisabledLocationMenuCategories,
  addDisabledLocationMenuCategory,
  removeDisabledLocationMenuCategory,
} = DisabledLocationMenuCategorySlice.actions;
export default DisabledLocationMenuCategorySlice.reducer;
