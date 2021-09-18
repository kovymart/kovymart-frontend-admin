import { Card, Form, Input, Row, Col, Typography } from 'antd'
import { AccountI } from '../../types'
import ButtonUI from '../../components/UIKit/ButtonUI'
import { signUp, selectRequesting } from '../../stores/auth.slice'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom"

const { Text, Title } = Typography

const SignUp = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  const handleSubmit = (e: AccountI) => {
    console.log(e)
    dispatch(signUp(e))
  }

  const requesting: boolean = useSelector(selectRequesting)
  return (
    <Row className="d-flex" justify="center">
      <Col xs={20} md={12}>
        <Card className="border-small border-2 shadow-small py-4">
          <Row className="d-flex" justify="center">
            <Col span={20}>
              <Title level={3}> Đăng ký </Title>
              <Form
                layout={"vertical"}
                name="signup-form"
                onFinish={handleSubmit}
                form={form}
              >
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập email!",
                    },
                  ]}
                >
                  <Input placeholder="Email" autoComplete="off" />
                </Form.Item>
                <Form.Item
                  label="Mật khẩu"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mật khẩu!",
                    },
                  ]}
                >
                  <Input.Password placeholder="Mật khẩu" autoComplete="off" />
                </Form.Item>
                <Form.Item
                  label="Nhập lại mật khẩu"
                  name="confirmPassword"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mật khẩu!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve()
                        }

                        return Promise.reject(new Error("Mật khẩu không trùng khớp!"))
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="Mật khẩu" autoComplete="off" />
                </Form.Item>
                <Form.Item>
                  <ButtonUI
                    text="Đăng ký"
                    type="primary"
                    htmlType="submit"
                    block="true"
                    requesting={requesting}
                    disabled={requesting}
                  />
                  <Row className="mt-3">
                    <Text>Đã có tài khoản</Text>
                    <Link to="/signin">
                      <Text
                        className="ms-2 color-primary"
                        strong
                      >  Đăng nhập
                      </Text>
                    </Link>
                  </Row>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  )
}

export default SignUp