import React from "react";
import { Form, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";
export const Homeowner = (props: any) => {
  return (
    <Form className="form-detail">
      <div className="title-area">
        <label>
          <UserOutlined />
          THÔNG TIN LIÊN HỆ:
        </label>
      </div>
      <Row>
        <Col xs={24} sm={8} md={8} lg={8} xl={8} xxl={8}>
          <div>
            <span>
              <h6 className="p-unline-bold">Tên chủ nhà</h6>
            </span>
            <span>
              <p className="p-text">{props.LandOwnerName}</p>
            </span>
          </div>
        </Col>
        <Col xs={12} sm={8} md={8} lg={8} xl={8} xxl={8}>
          <div>
            <span>
              <h6 className="p-unline-bold">Số điện thoại</h6>
            </span>
            <span>
              <p className="p-text">{props.Phone}</p>
            </span>
          </div>
        </Col>
        <Col xs={24} sm={8} md={8} lg={8} xl={8} xxl={8}>
          <div>
            <span>
              <h6 className="p-unline-bold">Email</h6>
            </span>
            <span>
              <p className="p-text">{props.Email}</p>
            </span>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={8} md={8} lg={8} xl={8} xxl={8}>
          <div>
            <span>
              <h6 className="p-unline-bold">Tên người cho thuê</h6>
            </span>
            <span>
              <p className="p-text">{props.MainOwnerName}</p>
            </span>
          </div>
        </Col>
        <Col xs={24} sm={8} md={8} lg={8} xl={8} xxl={8}>
          <div>
            <span>
              <h6 className="p-unline-bold">Số điện thoại cho thuê</h6>
            </span>
            <span>
              <p className="p-text">{props.MainOwnerPhone}</p>
            </span>
          </div>
        </Col>
      </Row>
    </Form>
  );
};
