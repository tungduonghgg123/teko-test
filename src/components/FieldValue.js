import React from "react";
import { Typography } from "antd";

const { Text } = Typography;

const FieldValue = ({ field, value }) => {
  return (
    <>
      <Text>
        <Text type="secondary">{field}</Text>
        {":   "}
        {value}
      </Text>
      <br />
    </>
  );
};
export default FieldValue;
