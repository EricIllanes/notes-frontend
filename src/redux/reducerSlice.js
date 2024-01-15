import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const { VITE_URL_BACKEND } = import.meta.env;

//thunk for async functions
export const getNotesAsync = createAsyncThunk(
  "notes/getNotesAsync",
  async () => {
    const request = await fetch(`${VITE_URL_BACKEND}/notes`, {
      method: "GET",
    });
    const response = await request.json();
    return response;
  }
);
export const noteAddAsync = createAsyncThunk(
  "notes/noteAddAsync",
  async (noteData) => {
    const request = await fetch(`${VITE_URL_BACKEND}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(noteData),
    });
    const response = await request.json();
    return response;
  }
);

export const noteDeleteAsync = createAsyncThunk(
  "notes/noteDeleteAsync",
  async (noteData) => {
    const request = await fetch(`${VITE_URL_BACKEND}/notes/${noteData}`, {
      method: "DELETE",
    });
    if (request.status === 200) {
      return noteData;
    }
  }
);

export const noteUpdateAsync = createAsyncThunk(
  "notes/noteUpdateAsync",
  async (noteData) => {
    const request = await fetch(`${VITE_URL_BACKEND}/notes`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(noteData),
    });
    if(request.status ===200){
      return noteData.id
    }
  }
);

export const noteSlice = createSlice({
  name: "notes",
  initialState: [],
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(noteAddAsync.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(noteAddAsync.rejected, (state, action) => {
        console.error("Error adding note:", action.error);
      })
      .addCase(noteDeleteAsync.fulfilled, (state, action) => {
        const noteIdToDelete = action.payload;
        return state.filter((note) => note.id !== noteIdToDelete);
      })
      .addCase(noteDeleteAsync.rejected, (state, action) => {
        console.error("Error adding note:", action.error);
      })
      .addCase(getNotesAsync.fulfilled, (state, action) => {
        state.push(...action.payload);
      })
      .addCase(getNotesAsync.rejected, (state, action) => {
        console.error("Error adding note:", action.error);
      })
      .addCase(noteUpdateAsync.fulfilled, (state, action) => {
        const foundNote = state.find((notes) => notes.id === action.payload);
        if (foundNote) {
          foundNote.archived = !foundNote.archived;
        }
      })
      .addCase(noteUpdateAsync.rejected, (state, action) => {
        console.error("Error adding note:", action.error);
      });
  },
});

export const { noteAdd, noteDelete, noteArchive } = noteSlice.actions;
export default noteSlice.reducer;
