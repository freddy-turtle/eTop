import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GraphicsData } from './graphicsHandler';

export interface GraphicsState {
  status: 'idle' | 'loading' | 'failed';
  graphicsData?: GraphicsData;
}

const initialState: GraphicsState = {
  status: 'idle'
};

export const getGraphicsData = createAsyncThunk(
  'graphics/getGraphicsData',
  async () => {
    return await window.invoke.graphics();
  }
);

export const graphicsSlice = createSlice({
  name: 'graphics',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getGraphicsData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getGraphicsData.fulfilled, (state, action) => {
        state.status = 'idle';
        state.graphicsData = action.payload;
      })
      .addCase(getGraphicsData.rejected, (state) => {
        state.status = 'failed';
      });
  }
});

export default graphicsSlice.reducer;
