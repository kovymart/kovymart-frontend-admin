import React from "react";
import { Form, Row, Col } from "antd";
import { AimOutlined } from "@ant-design/icons";

export const GroundLocation = (props: any) => {
  return (
    <Form className="form-detail">
      <div className="title-area">
        <label>
          <AimOutlined />
          VỊ TRÍ MẶT BẰNG:
        </label>
      </div>
      <Row>
        <Col xs={24} sm={8} md={8} lg={8} xl={8} xxl={8}>
          <div>
            <span>
              <h6 className="p-unline-bold">Địa chỉ</h6>
            </span>
            <span>
              <p className="p-text">{props.Address}</p>
            </span>
          </div>
        </Col>
        <Col xs={24} sm={8} md={8} lg={8} xl={8} xxl={8}>
          <div>
            <span>
              <h6 className="p-unline-bold">Thành Phố/Tỉnh</h6>
            </span>
            <span>
              <p className="p-text">{props.ProvinceName}</p>
            </span>
          </div>
        </Col>
        <Col xs={24} sm={8} md={8} lg={8} xl={8} xxl={8}>
          <div>
            <span>
              <h6 className="p-unline-bold">Quận/Huyện</h6>
            </span>
            <span>
              <p className="p-text">{props.DistrictName}</p>
            </span>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={8} md={8} lg={8} xl={8} xxl={8}>
          <div>
            <span>
              <h6 className="p-unline-bold">Trục đường</h6>
            </span>
            <span>
              <p className="p-text">{props.RoadAxisName}</p>
            </span>
          </div>
        </Col>

        <Col xs={24} sm={8} md={8} lg={8} xl={8} xxl={8}>
          <div>
            <span>
              <h6 className="p-unline-bold">Phường/Xã</h6>
            </span>
            <span>
              <p className="p-text">{props.WardName}</p>
            </span>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={8} md={8} lg={8} xl={8} xxl={8}>
          <div>
            <span>
              <h6 className="p-unline-bold">Kinh độ</h6>
            </span>
            <span>
              <p className="p-text">{props.Lng}</p>
            </span>
          </div>
        </Col>
        <Col xs={12} sm={8} md={8} lg={8} xl={8} xxl={8}>
          <div>
            <span>
              <h6 className="p-unline-bold">Vĩ độ</h6>
            </span>
            <span>
              <p className="p-text">{props.Lat}</p>
            </span>
          </div>
        </Col>
        <Col xs={24} sm={8} md={8} lg={8} xl={8} xxl={8}>
          <div>
            <span>
              <h6 className="p-unline-bold">Link bản đồ</h6>
            </span>
            <span>
              <p className="p-text text-link">{props.MapLink}</p>
            </span>
          </div>
        </Col>
      </Row>
    </Form>
  );
};
