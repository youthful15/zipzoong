import React, { useEffect, useState } from "react"
import Button from "../../components/button/Button"
import ImageIcon from "../../components/icon/ImageIcon"
import Modal from "../../components/modal/Modal"
import SmallTextInput from "../../components/input/SmallTextInput"
import { memberIconSelect } from "./myPageReducer"
import { nicknameValidation, nicknameChange } from "../login/memberReducer"
import { useDispatch, useSelector } from "react-redux"

// 동물 사진들
import bee from "../../assets/animalIcon/bee.png"
import elephant from "../../assets/animalIcon/elephant.png"
import basic from "../../assets/animalIcon/basic.png"
import ferret from "../../assets/animalIcon/ferret.png"
import frog from "../../assets/animalIcon/frog.png"
import pandaBear from "../../assets/animalIcon/panda-bear.png"
import pig from "../../assets/animalIcon/pig.png"
import rabbit from "../../assets/animalIcon/rabbit.png"
import walrus from "../../assets/animalIcon/walrus.png"
import yak from "../../assets/animalIcon/yak.png"

const User = {
  Name: "신슬기",
  Profic: "https://i1.sndcdn.com/artworks-CDyMPstbky5qw7oe-NfF8Pg-t240x240.jpg",
  Icons: [
    bee,
    elephant,
    basic,
    ferret,
    frog,
    pandaBear,
    pig,
    rabbit,
    walrus,
    yak,
  ],
}

export default function Profile() {
  const dispatch = useDispatch()
  const [isOpen, setOpen] = useState(false)
  const modalClose = () => setOpen(false)
  const [nickname, setNickname] = useState("")
  const [icon, setIcon] = useState(rabbit)
  const stateNickname = useSelector((state) => state.member.memberNickname)
  // useEffect(() => {
  //   setNickname(stateNickname)
  // }, [])
  const handleSubmit = (e) => {
    e.preventDefault()
    const validationResult = dispatch(nicknameValidation(nickname))
    if (validationResult) {
      dispatch(
        nicknameChange({
          origin: stateNickname,
          nickname: nickname,
          icon: icon,
        })
      )
      // dispatch(memberIconSelect({ nickname: nickname, icon: icon }))
    }
    modalClose()
  }
  return (
    // 모달
    <div>
      <Modal isOpen={isOpen} modalClose={modalClose}>
        <form onSubmit={handleSubmit}>
          <p className="text-3xl">수정</p>
          <div className="flex items-center">
            <p className="text-xl">대표 아이콘</p>
            <ImageIcon image={icon} size="large" shape="round" />
          </div>
          <SmallTextInput
            inputName="닉네임"
            onChange={({ target: { value } }) => setNickname(value)}
          ></SmallTextInput>
          <p className="text-xl">획득 아이콘</p>
          <p className="text-sm mb-2">
            그룹에서 운동을 통해 아이콘을 획득하실 수 있습니다.
          </p>
          <div className="flex overflow-scroll">
            {User.Icons.map((icon, idx) => {
              return (
                <div
                  onClick={() => {
                    setIcon(icon)
                  }}
                  key={idx}
                  className="mr-3 cursor-pointer"
                >
                  <div className="border hover:border-red-400">
                    <ImageIcon image={icon} size="middle" shape="square" />
                  </div>
                </div>
              )
            })}
          </div>

          <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="submit" className="bg-lightBlue">
              정보 수정
            </button>
          </div>
        </form>
      </Modal>

      <div className="flex items-center justify-center">
        <div className="w-[600px] h-12 bg-lightBlue border-2 m-2 rounded-3xl">
          <div className="flex items-center justify-center h-full w-full">
            <ImageIcon
              image={icon}
              size="small"
              shape="round"
              borderStyle="none"
            />
            <p className="text-sm p-2">
              <span className="font-semibold">{stateNickname} </span> 님, 오늘도
              즐거운 운동 되세요!
            </p>
            <Button
              onClick={() => setOpen(true)}
              text="수정"
              height="h-12"
            ></Button>
          </div>
        </div>
      </div>
    </div>
  )
}