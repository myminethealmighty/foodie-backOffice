import { DisabledLocationMenuCategorySlice } from "@/types/disabledLocationMenuCategorySlice";
import { DisabledLocationMenuCategory } from "@prisma/client";
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
    // Error Episode 40
    // Duplicate MenuCategory in redux store when updating name while disabling

    setDisabledLocationMenuCategories: (
      state,
      action: PayloadAction<DisabledLocationMenuCategory[]>
    ) => {
      state.items = action.payload;
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
  removeDisabledLocationMenuCategory,
} = DisabledLocationMenuCategorySlice.actions;
export default DisabledLocationMenuCategorySlice.reducer;
