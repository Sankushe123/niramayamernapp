import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Async Thunk to fetch access data from API
export const fetchAccessData = createAsyncThunk(
  "access/fetchAccessData",
  async (role, { rejectWithValue }) => {
    try {
      // console.log("🔄 Fetching access data for role:", role);
      const response = await axios.get(`/api/roleaccess/get/${role}`);

      // console.log("✅ API Response Data:", response.data); // ✅ Add this log

      return response.data;
    } catch (error) {
      console.error("❌ Error in fetchAccessData:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchReviewById = createAsyncThunk(
  "reviews/fetchById",
  async (reviewid) => {
    const res = await fetch(`https://your-api.com/reviews/${reviewid}`);
    if (!res.ok) throw new Error("Failed to fetch review");
    return { id: reviewid, data: await res.json() };
  }
);

const reviewsSlice = createSlice({
  name: "reviews",
  initialState: { items: {}, status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviewById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchReviewById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items[action.payload.id] = action.payload.data;
      })
      .addCase(fetchReviewById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

const accessSlice = createSlice({
  name: "access",
  initialState: {
    role: null,
    permissions: [],
    loading: false,
    error: null,
  },
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccessData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAccessData.fulfilled, (state, action) => {
        state.loading = false;
        state.permissions = action.payload;
      })
      .addCase(fetchAccessData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState: {
    isAppointmentOpen: false,
  },
  reducers: {
    openAppointment: (state) => {
      state.isAppointmentOpen = true;
    },
    closeAppointment: (state) => {
      state.isAppointmentOpen = false;
    },
    toggleAppointment: (state) => {
      state.isAppointmentOpen = !state.isAppointmentOpen;
    },
  },
});
const consultationSlice = createSlice({
  name: 'consultation',
  initialState: {
    isConsultationOpen: false,
  },
  reducers: {
    openConsultation: (state) => {
      state.isConsultationOpen = true;
    },
    closeConsultation: (state) => {
      state.isConsultationOpen = false;
    },
    toggleConsultation: (state) => {
      state.isConsultationOpen = !state.isConsultationOpen;
    },
  },
});

export const { setRole } = accessSlice.actions;
export const { openAppointment, closeAppointment, toggleAppointment } = appointmentSlice.actions;
export const { openConsultation, closeConsultation, toggleConsultation } = consultationSlice.actions;


export const accessReducer = accessSlice.reducer;
export const appointmentReducer = appointmentSlice.reducer;
export const consultationReducer = consultationSlice.reducer;
export const reviewsReducer = reviewsSlice.reducer;