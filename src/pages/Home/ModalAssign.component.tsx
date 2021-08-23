import { Modal, Button, Form, Select } from "antd"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { place_insert } from "../../stores/place.slice"
import { houseforrent_assign } from "../../stores/houseforrent.slice"
import { AppState } from "../../stores"
import { user_list } from "./Home.data"
const { Option } = Select

interface IProps {
  houseForRentIDSelected: number | undefined,
  setHouseForRentIDSelected: (houseForRentIDSelected: number | undefined) => void,
  visibleAssign: boolean,
  setVisibleAssign: (visibleAssign: boolean) => void,

}
const ModalAssign: React.FC<IProps> = ({
  houseForRentIDSelected,
  setHouseForRentIDSelected,
  visibleAssign,
  setVisibleAssign
}) => {
  var id = houseForRentIDSelected as number | undefined
  const dispatch = useDispatch()
  const place = useSelector(
    (state: AppState) => state.place
  )

  const handleOk = () => {
    dispatch(
      place_insert({
        houseforrentid: id,
        assignuser: assignUser,
        userlogin: 45123,
      })
    )
    setVisibleAssign(false)
    setAssignUser((prevState) => (prevState = undefined))
  }
  useEffect(() => {
    if (place.success === true) {
      dispatch(houseforrent_assign(id))
      setHouseForRentIDSelected(undefined)
    }
  }, [place.success])

  const handleCancel = () => {
    setHouseForRentIDSelected(undefined)
    setAssignUser((prevState) => (prevState = undefined))
    setVisibleAssign(false)
  }
  const [assignUser, setAssignUser] = useState()
  const handleOnchange = (e: any) => {
    const idAssignUser = JSON.parse(e)[0]
    setAssignUser((prevState) => (prevState = idAssignUser))
  }
  return (
    <>
      <Modal
        title={`Phân công`}
        visible={visibleAssign}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Quay lại  
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Xác nhận
          </Button>,
        ]}
      >
        <Form>
          <Form.Item name="UserID">
            <Select
              showSearch
              onSelect={handleOnchange}
              value={assignUser}
              allowClear
              placeholder="- Chọn nhân viên"
            >
              {user_list.map((prov: any) => (
                <Option
                  key={prov.UserID}
                  value={JSON.stringify([prov.UserID, prov.UserName])}
                >
                  {prov.UserID} - {prov.UserName}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default ModalAssign
