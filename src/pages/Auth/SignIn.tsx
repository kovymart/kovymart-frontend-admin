import { useEffect } from 'react';
import { Card, Form, Input, Row, Col, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { AccountI } from '../../types';
import ButtonUI from '../../components/UIKit/ButtonUI';
import { signIn, selectRequesting, selectSignInMessage } from '../../stores/auth.slice';
import { checkAuth } from '../../helpers/auth';

const { Title } = Typography;
const SignIn = () => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	let history = useHistory();

	const handleSubmit = (e: AccountI) => {
		dispatch(signIn(e));
	};

	const message = useSelector(selectSignInMessage);
	useEffect(() => {
		if (checkAuth()) {
			history.push('/');
			setTimeout(
				() => window.location.reload(),
				500
			);
		}
	}, [message]); // eslint-disable-line react-hooks/exhaustive-deps


	const requesting: boolean = useSelector(selectRequesting);
	return (
		<Row className="d-flex" justify="center">
			<Col xs={20} md={12}>
				<Card className="border-small border-2 shadow-small py-4">
					<Row className="d-flex" justify="center">
						<Col span={20}>
							<Title level={3}> Đăng nhập </Title>
							<Form
								layout={"vertical"}
								name="login-form"
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
									<Input placeholder="Email" autoComplete="on" />
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
									<Input.Password placeholder="Mật khẩu" autoComplete="on" />
								</Form.Item>

								<Form.Item>
									<ButtonUI
										text="Đăng nhập"
										type="primary"
										htmlType="submit"
										block="true"
										requesting={requesting}
										disabled={requesting}
									/>
								</Form.Item>
							</Form>
						</Col>
					</Row>
				</Card>
			</Col>
		</Row>
	);
};

export default SignIn;