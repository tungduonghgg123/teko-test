import React from "react";
import { Modal, Button, Image, Row, Col, Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { API } from "../services/API";
import FieldValue from "./FieldValue";
const { Text } = Typography;

const ConfirmModal = ({ getUpdatedProducts, onSubmit }) => {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const { data: colors } = API.useGetColorQuery();
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
      onSubmit();
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  return (
    <>
      <Button
        onClick={showModal}
        type="primary"
        style={{
          marginBottom: 16,
        }}
        icon={<UploadOutlined />}
      >
        Submit
      </Button>
      <Modal
        title="Re-uploaded Products"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        {getUpdatedProducts().map((product) => {
          return (
            <Row key={product.id}>
              <Col span={6}>
                <Image width={100} src={product.image}></Image>
              </Col>
              <Col span={18}>
                <Text strong>{product.name}</Text>
                <br />
                <FieldValue field="ID" value={product.id} />
                <FieldValue field="SKU" value={product.sku} />
                <FieldValue
                  field="Color"
                  value={colors[product.color - 1].name}
                />
              </Col>
            </Row>
          );
        })}
      </Modal>
    </>
  );
};
export default ConfirmModal;
