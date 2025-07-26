import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentTheme: 'golden', // 'golden' or 'emerald'
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.currentTheme = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
