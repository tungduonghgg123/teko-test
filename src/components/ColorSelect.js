import { Select } from "antd";
import { API } from "../services/API";

const { Option } = Select;

const ColorSelect = ({ value, handleChange }) => {
  const { data: colors } = API.useGetColorQuery();
  if (!colors) return <h1>loading</h1>;
  return (
    <Select defaultValue={value} style={{ width: 120 }} onChange={handleChange}>
      {colors.map((color) => (
        <Option key={color.id} value={color.id}>
          {color.name}
        </Option>
      ))}
    </Select>
  );
};
export default ColorSelect;
