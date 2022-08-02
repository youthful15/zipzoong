import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { http } from "../../api/axios"
import { checkMemberId } from "../myPage/myPageReducer"

// 팀 상세 정보 조회
export const teamInfo = createAsyncThunk(
  "registration/team",
  async (teamId) => {
    const res = await http.get(`registration/team/${teamId}`)
    if (res.data.message === "success") {
      return res
    }
  }
)

export const groupSlice = createSlice({
  name: "group",
  initialState: {
    icons: [],
    teamName: null,
    teamContent: null,
    teamRepIcons: null,
    sheildCount: 0,
    teamMembers: [],
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(teamInfo.fulfilled, (state, action) => {
      state.icons = action.payload.data.data.icons
      state.teamName = action.payload.data.data.name
      state.teamContent = action.payload.data.data.content
      state.teamRepIcons = action.payload.data.data.repIcons
      state.sheildCount = action.payload.data.data.sheildCount
      state.teamMembers = action.payload.data.data.members
    })
  },
})