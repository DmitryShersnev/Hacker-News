import { createSlice } from "@reduxjs/toolkit";
import { fetchNews } from "../../api/fetchNews";

const initialState = {
  news: [],
  loading: false,
};

const newsSlice = createSlice({
  name: "fetchSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.news = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
      });
  },
  selectors: {
    selectNews: (state) => state.news,
  },
});

export const { selectNews } = newsSlice.selectors;

export default newsSlice.reducer;
