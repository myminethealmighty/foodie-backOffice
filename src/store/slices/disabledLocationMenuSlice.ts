import { DisabledLocationMenuSlice } from "@/types/disabledLocationMenu";
import { DisabledLocationMenu } from "@prisma/client";
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
    // Error Episode 40
    // Duplicate Menu in redux store when updating name while disabling

    setDisabledLocationMenus: (
      state,
      action: PayloadAction<DisabledLocationMenu[]>
    ) => {
      state.items = action.payload;
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

export const { setDisabledLocationMenus, removeDisabledLocationMenu } =
  disabledLocationMenuSlice.actions;

export default disabledLocationMenuSlice.reducer;
