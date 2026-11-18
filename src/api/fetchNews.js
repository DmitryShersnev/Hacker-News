import { createAsyncThunk } from "@reduxjs/toolkit";

const url = import.meta.env.VITE_API_URL;

export const fetchNews = createAsyncThunk(
  "news/getNews",
  async (_, thunkApi) => {
    try {
      const idsResponse = await fetch(`${url}/newstories.json`);
      if (!idsResponse.ok) {
        return thunkApi.rejectWithValue(
          `Не удалось получить список ID: ${idsResponse.status}`,
        );
      }
      const ids = await idsResponse.json();
      const news = await Promise.all(
        ids.slice(0, 100).map(async (id) => {
          const response = await fetch(`${url}/item/${id}.json?print=pretty`);
          if (!response.ok) {
            throw new Error(`Не удалось загрузить новость ${id}`);
          }
          return response.json();
        }),
      );

      return news;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.message || "Не удалось загрузить новости",
      );
    }
  },
);
