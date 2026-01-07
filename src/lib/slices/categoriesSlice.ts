import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Work } from "@/types/categories";

interface CategoriesState {
  works: Work[];
  filteredWorks: Work[];
  totalCount: number;
  loading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  works: [],
  filteredWorks: [],
  totalCount: 0,
  loading: false,
  error: null,
};

// Async thunk for fetching works data
export const fetchWorks = createAsyncThunk(
  "categories/fetchWorks",
  async (isValid: boolean = true) => {
    const response = await fetch(
      `https://aadpc-be.sctestingsite.com/api/works/getWorks?isValid=${isValid}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch works");
    }
    const data = await response.json();
    return {
      works: data.data.works,
      totalCount: data.data.totalCount,
    };
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setFilteredWorks: (state, action: PayloadAction<Work[]>) => {
      state.filteredWorks = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorks.fulfilled, (state, action) => {
        state.loading = false;
        state.works = action.payload.works;
        state.filteredWorks = action.payload.works;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchWorks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch works";
      });
  },
});

export const { setFilteredWorks } = categoriesSlice.actions;
export default categoriesSlice.reducer;
