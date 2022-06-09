import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  BaseboardData,
  BiosData,
  ChassisData,
  SystemData,
  UuidData
} from './systemHandler';

export interface SystemState {
  status: 'idle' | 'loading' | 'failed';
  systemData?: SystemData;
  uuidData?: UuidData;
  biosData?: BiosData;
  baseboardData?: BaseboardData;
  chassisData?: ChassisData;
}

const initialState: SystemState = {
  status: 'idle'
};

export const getSystemData = createAsyncThunk(
  'system/getSystemData',
  async () => {
    return await window.invoke.system();
  }
);

export const getUuidData = createAsyncThunk('system/getUuidData', async () => {
  return await window.invoke.uuids();
});

export const getBiosData = createAsyncThunk('system/getBiosData', async () => {
  return window.invoke.bios();
});

export const getBaseboardData = createAsyncThunk(
  'system/getBaseboardData',
  async () => {
    return window.invoke.baseboard();
  }
);

export const getChassisData = createAsyncThunk(
  'system/getChassisData',
  async () => {
    return window.invoke.chassis();
  }
);

export const systemSlice = createSlice({
  name: 'system',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getSystemData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getSystemData.fulfilled, (state, action) => {
        state.status = 'idle';
        state.systemData = action.payload;
      })
      .addCase(getSystemData.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(getUuidData.fulfilled, (state, action) => {
        state.uuidData = action.payload;
      })
      .addCase(getBiosData.fulfilled, (state, action) => {
        state.biosData = action.payload;
      })
      .addCase(getBaseboardData.fulfilled, (state, action) => {
        state.baseboardData = action.payload;
      })
      .addCase(getChassisData.fulfilled, (state, action) => {
        state.chassisData = action.payload;
      });
  }
});

export default systemSlice.reducer;
