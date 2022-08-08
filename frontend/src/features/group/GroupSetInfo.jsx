import React, { useState } from "react"
import Button from "../../components/button/Button"
import Card from "../../components/card/Card"
import ImageIcon from "../../components/icon/ImageIcon"
import SmallTextInput from "../../components/input/SmallTextInput"
import LargeTextInput from "../../components/input/LargeTextInput"
import Modal from "../../components/modal/Modal"
import { useSelector } from "react-redux"

export default function GroupSetInfo() {
  const { teamName, teamContent, teamRepIcons } = useSelector(
    (state) => state.group
  )

  const [isOpen, setOpen] = useState(false)
  const modalClose = () => setOpen(false)

  return (
    <div>
      {/* 모달 영역 */}
      <Modal isOpen={isOpen} modalClose={modalClose}>
        <form action="">
          <SmallTextInput inputName="그룹 이름"></SmallTextInput>
          <LargeTextInput inputName="그룹 설명"></LargeTextInput>

          <div className="flex justify-end mt-5">
            <div className="mr-3">
              <Button text="개설" bgColor="bg-info" height="h-8" />
            </div>
            <div className="mr-3">
              <Button
                height="h-8"
                text="닫기"
                bgColor="bg-danger"
                onClick={modalClose}
                type="submit"
              />
            </div>
          </div>
        </form>
      </Modal>
      {/* 모달 영역 끝 */}

      <Card className="flex items-center border mx-5 rounded-lg border-gray-400 mt-5">
        <div className="mx-5 my-5">
          <ImageIcon
            size="large"
            image="data:image/jpeg;base64,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"
            shape="round"
          />
        </div>
        <div className="w-  8/12">
          <p className="text-3xl font-semibold mb-3">{teamName}</p>
          <p className="w-96">{teamContent}</p>
        </div>
        <Button
          onClick={() => setOpen(true)}
          text="그룹 프로필 변경"
          height="h-9"
          width="w-48"
        />
      </Card>
    </div>
  )
}