import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit"
import { http } from "../../api/axios"

export const nicknameValidation = createAsyncThunk(
  "member/duplicate",
  async (nickname) => {
    console.log("닉네임 확인")
    if (nickname.length > 0) {
      const { message } = await http.get("/member/duplicate/", nickname)
      console.log(message)
      return [message, nickname]
    } else {
      alert("닉네임을 입력해주세요")
    }
  }
)
export const memberInfo = createAsyncThunk(
  "member/information",
  async (nickname) => {
    const { data } = await http.get("/member/info/", nickname)
    return data
  }
)
export const selectNickname = createAsyncThunk(
  "member/nickname",
  async (nickname) => {
    const { data } = await http.get("/member/nickname", nickname)
    return data
  }
)

export const memberSlice = createSlice({
  name: "member",
  initialState: {
    memberId: null,
    memberName: null,
    memberEmail: null,
    memberProvider: null,
    memberNickname: null,
  },
  reducers: {
    // 사용 안하는 중
    checkMemberId: (state, action) => {
      state.memberId = action.payload
    },
    checkMemberName: (state, action) => {
      state.memberName = action.payload
    },
    checkMemberEmail: (state, action) => {
      state.memberEmail = action.payload
    },
    checkMemberProvider: (state, action) => {
      state.memberProvider = action.payload
    },
  },
  extraReducers(builder) {
    builder.addCase(nicknameValidation.fulfilled, (state, action) => {
      if (action.payload === "success") {
        state.memberNickname = action.payload[1]
      } else {
        console.log("닉네임 중복 처리 불가!!!")
      }
    })

    builder.addCase(selectNickname.fulfilled, (state, action) => {
      state.memberName = action.payload["name"]
      state.memberEmail = action.payload["email"]
      state.memberProvider = action.payload["provider"]
      state.memberNickname = action.payload["nickname"]
    })
    builder.addCase(memberInfo.fulfilled, (state, action) => {
      state.memberName = action.payload["name"]
      state.memberEmail = action.payload["email"]
      state.memberProvider = action.payload["provider"]
      state.memberNickname = action.payload["nickname"]
      console.log("멤버 정보 받아오기 성공!")
    })
  },
})
export const {
  checkMemberId,
  checkMemberName,
  checkMemberEmail,
  checkMemberProvider,
  checkMemberNickname,
} = memberSlice.actions

export default memberSlice.reducer