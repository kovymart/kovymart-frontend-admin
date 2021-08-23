import React from "react";
import { Form, Row, Col } from "antd";
import { HomeOutlined } from "@ant-design/icons";
export const GroundInfo = (props: any) => {
  return (
    <Form className="form-detail">
      <div className="title-area">
        <label>
          <HomeOutlined />
          THÔNG TIN MẶT BẰNG:
        </label>
      </div>
      <Row>
        <Col xs={24} sm={8} md={8} lg={8} xl={8} xxl={8}>
          <div>
            <span style={{ backgroundColor: "red" }}>
              <p className="p-text">
                <u className="p-unline-bold"> Chiều Dài:</u> {props.Length}m
              </p>
            </span>
            <p style={{ height: "20px" }}></p>
          </div>
        </Col>
        <Col xs={24} sm={8} md={8} lg={8} xl={8} xxl={8}>
          <div>
            <span>
              <p className="p-text">
                <u className="p-unline-bold">Chiều rộng:</u> {props.Width}m
              </p>
            </span>
            <p style={{ height: "20px" }}></p>
          </div>
        </Col>
        <Col xs={24} sm={8} md={8} lg={8} xl={8} xxl={8}>
          <div>
            <span>
              <p className="p-text">
                <u className="p-unline-bold">Diện tích:</u> {props.Acreage}m2
              </p>
            </span>
            <p style={{ height: "20px" }}></p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={8} md={8} lg={8} xl={8} xxl={8}>
          <div>
            <span>
              <p className="p-text">
                <u className="p-unline-bold">Diện tích lề đường:</u>{" "}
                {props.Pavement}m2{" "}
              </p>
            </span>
            <p style={{ height: "20px" }}></p>
          </div>
        </Col>
        <Col xs={24} sm={8} md={8} lg={8} xl={8} xxl={8}>
          <div>
            <span>
              <p className="p-text">
                <u className="p-unline-bold">Diện tích vỉa hè:</u>{" "}
                {props.Frontline}m2
              </p>
            </span>
            <p style={{ height: "20px" }}></p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={8} md={8} lg={8} xl={8} xxl={8}>
          <div>
            <span>
              <h6 className="p-unline-bold">Trạng thái mặt bằng</h6>
            </span>
            <span>
              <span>
                <p className="p-text">{props.Status}</p>
              </span>
            </span>
          </div>
        </Col>
        <Col xs={24} sm={8} md={8} lg={8} xl={8} xxl={8}>
          <div>
            <span>
              <h6 className="p-unline-bold">Trạng thái xử lý</h6>
            </span>
            <span>
              <p className="p-text">{props.StatusQuo}</p>
            </span>
          </div>
        </Col>
        <Col xs={24} sm={8} md={8} lg={8} xl={8} xxl={8}>
          <div>
            <span>
              <h6 className="p-unline-bold">Ghi chú</h6>
            </span>
            <span>
              <textarea
                disabled
                className="p-text text-Aria"
                value={props.Note}
              ></textarea>
            </span>
          </div>
        </Col>
      </Row>
    </Form>
  );
};
