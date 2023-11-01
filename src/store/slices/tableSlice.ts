import { CreateTableOptions, DeleteTableOptions, TableSlice, UpdateTableOptions } from "@/types/table";
import { config } from "@/utils/config";
import { Table } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addMenu } from "./menuSlice";

const initialState: TableSlice = {
  items: [],
  isLoading: false,
  error: null,
};

export const createTable = createAsyncThunk(
  "table/createTable",
  async (options: CreateTableOptions, thunkApi) => {
    const { name, locationId, onSuccess, onError } = options;
    try {
      const response = await fetch(`${config}/tables`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, locationId }),
      });
      const {table  } = await response.json();
      thunkApi.dispatch(addMenu(table));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const updateTable = createAsyncThunk(
  "table/updateTable",
  async (options: UpdateTableOptions, thunkApi) => {
    const { id, name, onError, onSuccess } = options;
    try {
      const response = await fetch(`${config.apiBaseUrl}/tables`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id, name}),
      });
      const { table } = await response.json();
      thunkApi.dispatch(replaceTable(table));
       onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

export const deleteTable = createAsyncThunk(
  "table/deleteTable",
  async (options: DeleteTableOptions, thunkApi) => {
    const { id, onError, onSuccess } = options;
    try {
      await fetch(`${config.apiBaseUrl}/tables?id=${id}`, {
        method: "DELETE",
      });
      thunkApi.dispatch(removeTable({id}));
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError();
    }
  }
);

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setTables: (state, action) => {
      state.items = action.payload;
    },
    replaceTable: (state, action: PayloadAction<Table>) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    removeTable: (state, action: PayloadAction<{id:number}>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    addTable: (state, action: PayloadAction<Table>) => {
      state.items = [...state.items, action.payload];
    },
  },
});

export const { setTables , replaceTable,removeTable,addTable} = tableSlice.actions;
export default tableSlice.reducer;
