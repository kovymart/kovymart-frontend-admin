import { Form, Input, Select, Col, Checkbox } from "antd";

export const CustomInput = (props: any) => {
	const { Option } = Select;
	const DefineRules = (rule: string) => {
		if (rule === "required") {
			return [
				{
					required: true,
					message: "Bạn phải nhập thông tin này!",
				},
			] as any;
		} else if (rule === "email") {
			return [
				{
					type: "email",
					message: "Email không hợp lệ!",
				},
			];
		}
		return null;
	};

	const DefineInputs = (type: string) => {
		if (type === "select") {
			return (
				<Select
					showSearch
					placeholder="- Chọn"
					optionFilterProp="children"
					disabled={props.disabled}
					filterOption={(input: string, option: any) =>
						option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
						0
					}
					onChange={props.onChange}
				>
					{props.options.map((opt: any) => (
						<Option key={opt.ID} value={opt.ID}>
							{opt.Name}
						</Option>
					))}
				</Select>
			);
		} else if (type === "text-area") {
			return (
				<Input.TextArea rows={props.rows} placeholder={props.placeholder} />
			);
		} else if (type === "check-box") {
			return (
				<Checkbox checked={props.checked} onChange={props.onChange}>
					{props.label}
				</Checkbox>
			);
		} else {
			return (
				<Input addonAfter={props.addonAfter} placeholder={props.placeholder} />
			);
		}
	};

	return (
		<Col flex={props.flex} span={props.span} className={props.className}>
			<Form.Item
				name={props.name}
				rules={DefineRules(props.rule)}
				label={props.type === "check-box" ? " " : props.label}
			>
				{DefineInputs(props.type)}
			</Form.Item>
		</Col>
	);
};
