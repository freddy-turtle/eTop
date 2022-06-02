import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BatteryData } from './batteryHandler';

export interface BatteryState {
  status: 'idle' | 'loading' | 'failed';
  batteryData?: BatteryData;
}

const initialState: BatteryState = {
  status: 'idle'
};

export const getBatteryData = createAsyncThunk(
  'battery/getBatteryData',
  async () => {
    return await window.electron.battery();
  }
);

export const batterySlice = createSlice({
  name: 'battery',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getBatteryData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getBatteryData.fulfilled, (state, action) => {
        state.status = 'idle';
        state.batteryData = action.payload;
      })
      .addCase(getBatteryData.rejected, (state) => {
        state.status = 'failed';
      });
  }
});

export default batterySlice.reducer;
