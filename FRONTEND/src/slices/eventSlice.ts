import { createSlice } from "@reduxjs/toolkit";

// Event type shared across the app
export interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  expectedParticipants: number;
  purpose: string;
  studentId: string;
  createdAt: string;
  updatedAt: string;
}

interface EventState {
  events: Event[];
  loading: boolean;
  error: string | null;
}

const initialState: EventState = {
  events: [],
  loading: false,
  error: null,
};

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEventsForStudents: (state, action) => {
      state.events = action.payload;
    },
  },
});

export const { setEventsForStudents } = eventSlice.actions;
export default eventSlice.reducer;
