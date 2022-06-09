import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { OsData, UsersData, VersionData } from './osHandler';

export interface OsState {
  status: 'idle' | 'loading' | 'failed';
  osData?: OsData;
  versionsData? : VersionData;
  usersData?: UsersData;
}

const initialState: OsState = {
  status: 'idle'
};

export const getOsData = createAsyncThunk('os/osinfo', async () => {
  return await window.invoke.os();
});

export const getVersionData = createAsyncThunk('os/versions', async () => {
  return await window.invoke.software_versions()
})

export const getUsersData = createAsyncThunk('os/getUsersData', async () => {
  return await window.invoke.users()
})

export const osSlice = createSlice({
  name: 'os',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getOsData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getOsData.fulfilled, (state, action) => {
        state.status = 'idle';
        state.osData = action.payload;
      })
      .addCase(getOsData.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(getVersionData.fulfilled, (state, action) => {
        state.versionsData = action.payload
      })
      .addCase(getUsersData.fulfilled, (state, action) => {
        state.usersData = action.payload
      })
  }
});

export default osSlice.reducer;
