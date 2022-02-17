import React from "react";
import { Table, Image } from "antd";
import EditableCell from "./EditableCell";
import EditableRow from "./EditableRow";
import ColorSelect from "./ColorSelect";
import ConfirmModal from "./ConfirmModal";
class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Error Description",
        dataIndex: "errorDescription",
        key: "errorDescription",
      },
      {
        title: "Product Image",
        dataIndex: "image",
        key: "image",
        render: (url) => <Image width={200} src={url} />,
      },
      {
        title: "Product Name",
        dataIndex: "name",
        key: "name",
        editable: true,
      },
      {
        title: "SKU",
        dataIndex: "sku",
        key: "sku",
        editable: true,
      },
      {
        title: "Color",
        dataIndex: "color",
        key: "color",
        render: (colorKey, record) => (
          <ColorSelect
            value={colorKey}
            handleChange={(newColorId) =>
              this.handleSave({ ...record, color: newColorId })
            }
          />
        ),
      },
    ];
    this.state = {
      dataSource: this.props.dataSource,
    };
    this.updatedProductIds = new Set();
  }

  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.id === item.id);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.setState({
      dataSource: newData,
    });
    // record updated ids
    this.updatedProductIds.add(row.id);
  };
  clearUpdatedProductIds = () => this.updatedProductIds.clear();
  getUpdatedProducts = () => {
    const updatedProducts = [];
    this.updatedProductIds.forEach((id) =>
      // product ids is a sequence starting from 1
      updatedProducts.push(this.state.dataSource[id - 1])
    );
    // Open the modal
    // clear the ids list if submitted
    console.log(updatedProducts);
    return updatedProducts;
  };
  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        <ConfirmModal
          getUpdatedProducts={this.getUpdatedProducts}
          onSubmit={this.clearUpdatedProductIds}
        />
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    );
  }
}
export default EditableTable;
