import React from "react";
import { Table, Image, Skeleton } from "antd";
import EditableCell from "./EditableCell";
import EditableRow from "./EditableRow";
import { ColorSelect, ConfirmModal } from "../index";
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
        length: 50,
      },
      {
        title: "SKU",
        dataIndex: "sku",
        key: "sku",
        editable: true,
        length: 20,
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
  componentDidUpdate(prevProps) {
    if (prevProps.dataSource !== this.props.dataSource) {
      this.setState({ dataSource: this.props.dataSource });
    }
  }
  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.id === item.id);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    // record updated ids
    this.updatedProductIds.add(row.id);
    this.setState({
      dataSource: newData,
    });
  };
  clearUpdatedProductIds = () => {
    this.updatedProductIds.clear();
    this.forceUpdate();
  };
  getUpdatedProducts = () => {
    const updatedProducts = [];
    this.updatedProductIds.forEach((id) =>
      // product ids is a sequence starting from 1
      updatedProducts.push(this.state.dataSource[id - 1])
    );
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
          length: col.length,
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
          rowKey={(record) => record.id}
          locale={{
            emptyText: (
              <Skeleton
                paragraph={{
                  rows: 5,
                  width: "100%",
                }}
                title={false}
                active={true}
              />
            ),
          }}
        />
      </div>
    );
  }
}
export default EditableTable;
