import { CreateLocationOptions, LocationSlice } from "@/types/location";
import { config } from "@/utils/config";
import { Location } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: LocationSlice = {
  items: [],
  selectedLocation: null,
  isLoading: false,
  error: null,
};

export const createLocation = createAsyncThunk(
  "location/createNewLocation",
  async (options: CreateLocationOptions, thunkApi) => {
    const { name, street, township, city, companyId, onSuccess, onError } =
      options;
    try {
      const response = await fetch(`${config.apiBaseUrl}/locations`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, street, township, city, companyId }),
      });
      const createdLocation = await response.json();
      thunkApi.dispatch(addLocation(createdLocation));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

// export const updateLocation = createAsyncThunk(
//   "location/updateLocation",
//   async (options: UpdateLocationOptions, thunkApi) => {
//     const { id, name, onError, onSuccess } = options;
//     try {
//       const response = await fetch(`${config.apiBaseUrl}/locations`, {
//         method: "PUT",
//         headers: { "content-type": "application/json" },
//         body: JSON.stringify({ id, name }),
//       });
//       const { location } = await response.json();
//       thunkApi.dispatch(replaceLocation(location));
//       onSuccess && onSuccess();
//     } catch (err) {
//       onError && onError();
//     }
//   }
// );

// export const deleteLocation = createAsyncThunk(
//   "location/deleteLocation",
//   async (options: DeleteLocationOptions, thunkApi) => {
//     const { id, onSuccess, onError } = options;
//     try {
//       await fetch(`${config.apiBaseUrl}/locations?id=${id}`, {
//         method: "DELETE",
//       });
//       thunkApi.dispatch(removeLocation({ id }));
//       onSuccess && onSuccess();
//     } catch (err) {
//       onError && onError();
//     }
//   }
// );

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    //Get all locations from server, so the type is array[]
    setLocations: (state, action: PayloadAction<Location[]>) => {
      state.items = action.payload;
      const selectedLocationId = localStorage.getItem("selectedLocationId");
      if (!selectedLocationId) {
        const firstLocationId = action.payload[0].id;
        localStorage.setItem("selectedLocationId", String(firstLocationId));
        state.selectedLocation = action.payload[0];
      } else {
        const selectedLocation = state.items.find(
          (item) => item.id === Number(selectedLocationId)
        );
        if (selectedLocation) {
          state.selectedLocation = selectedLocation;
        }
      }
    },
    setSelectedLocation: (state, action: PayloadAction<Location>) => {
      state.selectedLocation = action.payload;
    },
    addLocation: (state, action: PayloadAction<Location>) => {
      state.items = [...state.items, action.payload];
    },
    // replaceLocation: (state, action: PayloadAction<Location>) => {
    //   state.items = state.items.map((item) =>
    //     item.id === action.payload.id ? action.payload : item
    //   );
    // },
    // removeLocation: (state, action: PayloadAction<{ id: number }>) => {
    //   state.items = state.items.filter((item) => item.id !== action.payload.id);
    // },
  },
});

export const { setLocations, addLocation, setSelectedLocation } =
  locationSlice.actions;
export default locationSlice.reducer;
