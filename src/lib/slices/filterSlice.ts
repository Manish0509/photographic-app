import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Work } from "@/types/categories";

interface FilterState {
  searchQuery: string;
  selectedAuthor: string | null;
  selectedInstitution: string | null;
  availableAuthors: string[];
  availableInstitutions: string[];
}

const initialState: FilterState = {
  searchQuery: "",
  selectedAuthor: null,
  selectedInstitution: null,
  availableAuthors: [],
  availableInstitutions: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedAuthor: (state, action: PayloadAction<string | null>) => {
      state.selectedAuthor = action.payload;
    },
    setSelectedInstitution: (state, action: PayloadAction<string | null>) => {
      state.selectedInstitution = action.payload;
    },
    setAvailableAuthors: (state, action: PayloadAction<string[]>) => {
      state.availableAuthors = action.payload;
    },
    setAvailableInstitutions: (state, action: PayloadAction<string[]>) => {
      state.availableInstitutions = action.payload;
    },
    clearFilters: (state) => {
      state.searchQuery = "";
      state.selectedAuthor = null;
      state.selectedInstitution = null;
    },
  },
});

export const {
  setSearchQuery,
  setSelectedAuthor,
  setSelectedInstitution,
  setAvailableAuthors,
  setAvailableInstitutions,
  clearFilters,
} = filterSlice.actions;

export const filterWorks = (
  works: Work[],
  searchQuery: string,
  selectedAuthor: string | null,
  selectedInstitution: string | null
): Work[] => {
  return works.filter((work) => {
    const matchesSearch =
      !searchQuery ||
      work?.name?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesAuthor =
      !selectedAuthor ||
      `${work?.author?.name} ${work?.author?.surnames}` === selectedAuthor;

    const matchesInstitution =
      !selectedInstitution || work.institution.name === selectedInstitution;

    return matchesSearch && matchesAuthor && matchesInstitution;
  });
};

export default filterSlice.reducer;
