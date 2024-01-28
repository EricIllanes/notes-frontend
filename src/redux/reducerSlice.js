import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const { VITE_URL_BACKEND } = import.meta.env;

const initialState = {
  notes: [],
  filteredState: [],
};
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

export const getNoteByIdAsync = createAsyncThunk(
  "notes/getNoteByIdAsync",
  async (id) => {
    const request = await fetch(`${VITE_URL_BACKEND}/notes/${id}`, {
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
    if (request.status !== 200) {
      return null;
    } else {
      const response = await request.json();
      return response;
    }
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
    if (request.status === 200) {
      return noteData.id;
    }
  }
);

export const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    noteAdd: (state, action) => {
      state.notes.push(action.payload);
      state.filteredState.push(action.payload);
    },

    noteDelete: (state, action) => {
      console.log(action.payload);
      const noteForDelete = state.notes.find(
        (notes) => notes.id === action.payload
      );
      console.log(2222, noteForDelete.id);
      if (noteForDelete) {
        (state.notes = state.notes.filter(
          (notes) => notes.id !== action.payload
        )),
          (state.filteredState = state.filteredState.filter(
            (notes) => notes.id !== action.payload
          ));
      }
    },

    noteUpdate: (state, action) => {
      const updateNote = state.notes.find(
        (note) => note.id == action.payload.id
      );
      if (updateNote) {
        (updateNote.archived = action.payload.archived),
          (updateNote.title = action.payload.title),
          (updateNote.content = action.payload.content),
          (updateNote.tags = action.payload.tags);
      }
    },

    noteFiltered: (state, action) => {
      console.log(action.payload);
      const filter = state.filteredState;
      const notesFiltered =
        action.payload === "all"
          ? filter
          : filter.filter((notes) => {
              return notes.tags.includes(action.payload);
            });
      state.notes = notesFiltered;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(noteAddAsync.fulfilled, (state, action) => {
        if (action.payload === null) {
          return;
        } else {
          state.notes.push(action.payload);
        }
      })
      .addCase(noteAddAsync.rejected, (state, action) => {
        console.error("Error adding note:", action.error);
      })
      .addCase(noteDeleteAsync.fulfilled, (state, action) => {
        const noteIdToDelete = action.payload;
        const filtered = state.notes.filter(
          (note) => note.id !== noteIdToDelete
        );
        state.notes = filtered;
      })
      .addCase(noteDeleteAsync.rejected, (state, action) => {
        console.error("Error adding note:", action.error);
      })
      .addCase(getNotesAsync.fulfilled, (state, action) => {
        state.notes = [...action.payload];
      })
      .addCase(getNotesAsync.rejected, (state, action) => {
        console.error("Error adding note:", action.error);
      })
      .addCase(noteUpdateAsync.fulfilled, (state, action) => {
        const foundNote = state.notes.find(
          (notes) => notes.id === action.payload
        );
        if (foundNote) {
          foundNote.archived = !foundNote.archived;
        }
      })
      .addCase(noteUpdateAsync.rejected, (state, action) => {
        console.error("Error adding note:", action.error);
      });
  },
});

export const { noteAdd, noteDelete, noteUpdate, noteFiltered } =
  noteSlice.actions;
export default noteSlice.reducer;
