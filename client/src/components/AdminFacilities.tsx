import { Button, Form, Input, InputNumber, Select, Space, Table } from "antd";
import type { TableColumnProps } from "antd";
import { useFacilityContext } from "../context/FacilityContext";
import { useCategoryContext } from "../context/CategoryContext";
import { useEffect, useState } from "react";

import {
  DeleteOutlined,
  EditOutlined,
  CheckOutlined,
  PlusOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { DataTypeFacility, IFacility } from "../Interfaces";
import AdminCreateFacility from "./AdminCreateFacility";
function AdminFacilities() {
  const { fetchCategories, categories } = useCategoryContext();
  const { facilities, deleteFacility, updateFacility } = useFacilityContext();
  const [form] = Form.useForm();
  // State to track the facility being edited
  const [edit, setEdit] = useState<string | null>(null);
  const [error, setError] = useState("");
  const typeOf = ["event", "facility"];
  // Fetch categories on component mount
  useEffect(() => {
    const fetchData = async () => {
      await fetchCategories();
    };

    fetchData();
  }, [fetchCategories]);
  // Handle saving changes when the form is submitted
  const handleEditSave = async (values: any) => {
    form.validateFields();
    const fieldsValue = await form.getFieldsValue();

    // Validate if there is at least one image
    if (!fieldsValue.images || fieldsValue.images.length === 0) {
      setError("Lägg till åtminstone en bild");
      throw new Error("Add at least one image");
    }
    // Create a new object with updated values and send it for update
    const newValuesFacility = { _id: edit, deleted: false, ...values };
    updateFacility(newValuesFacility);
    // Exit edit mode
    setEdit(null);
    setError("");
  };
  // Define the columns for the table
  const columns: TableColumnProps<DataTypeFacility>[] = [
    // Images column with rendering logic for displaying images
    {
      title: "Images",
      dataIndex: "images",
      key: "images",
      render: (images: string[], record: DataTypeFacility) => {
        if (edit === record.key) {
          // In edit mode, display the form for adding or removing images
          return (
            <Form.List name="images">
              {(fields, { add, remove }) => (
                <>
                  {error && <p className="error-message">{error}</p>}
                  {fields.map(({ name, key, ...restField }) => (
                    <div key={key} style={{ display: "flex", marginBottom: 8 }}>
                      <Button
                        type="text"
                        onClick={() => remove(name)}
                        icon={<CloseOutlined />}
                        style={{ marginRight: 8, color: "red" }}
                      ></Button>
                      <Form.Item
                        {...restField}
                        name={name}
                        key={key}
                        rules={[
                          {
                            required: true,
                            message: "Lägg till åtminstone en bild",
                          },
                          {
                            type: "string",
                            message: "Lägg till åtminstone en bild",
                          },
                        ]}
                      >
                        <Input placeholder="Image URL" />
                      </Form.Item>
                    </div>
                  ))}
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                  >
                    Add Image
                  </Button>
                </>
              )}
            </Form.List>
          );
        } else {
          // Display images if not in edit mode
          return (
            <div>
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Image ${index + 1}`}
                  style={{ width: "50px", height: "50px" }}
                />
              ))}
            </div>
          );
        }
      },
    },
    // Title column with rendering logic for editing title in form
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text: string, record: DataTypeFacility) => {
        if (edit === record.key) {
          return (
            <Form.Item
              name="title"
              rules={[
                { required: true, message: "Du måste ange ett namn" },
                { type: "string", message: "Du måste ange ett namn" },
                {
                  type: "string",
                  min: 3,
                  message: "Minst 3 tecken krävs",
                },
              ]}
            >
              <Input />
            </Form.Item>
          );
        } else {
          // Display title if not in edit mode
          return <p>{text}</p>;
        }
      },
    },
    // Description column with rendering logic for editing description in form
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text: string, record: DataTypeFacility) => {
        if (edit === record.key) {
          return (
            <Form.Item
              name="description"
              rules={[
                { required: true, message: "Ange en beskrivning" },
                { type: "string", message: "Ange en beskrivning" },
                { type: "string", min: 6, message: "Minst 6 tecken krävs" },
              ]}
            >
              <Input />
            </Form.Item>
          );
        } else {
          // Display description if not in edit mode
          return <p>{text}</p>;
        }
      },
    },
    // Price column with rendering logic for editing price in form
    {
      title: "Pris",
      dataIndex: "price",
      key: "price",
      render: (price: number, record: DataTypeFacility) => {
        if (edit === record.key) {
          return (
            <Form.Item
              name="price"
              rules={[
                { required: true, message: "Ange ett nummer" },
                { type: "number", message: "Ange ett nummer" },
              ]}
            >
              <InputNumber />
            </Form.Item>
          );
        } else {
          // Display price if not in edit mode
          return <p>{`${price}kr`}</p>;
        }
      },
    },

    // {
    //   title: "avalability",
    //   dataIndex: "avalability",
    //   key: "avalability",
    //   render: (text: boolean) => <p>{text}</p>,
    // },

    // Categories column with rendering logic for editing categories in form
    {
      title: "Categories",
      dataIndex: "categories",
      key: "categories",
      render: (text: string[], record: DataTypeFacility) => (
        <>
          {edit === record.key ? (
            <Form.Item
              name="categories"
              rules={[
                { required: true, message: "Du måste välja en kategori" },
              ]}
            >
              <Select mode="multiple" placeholder="Select categories">
                {categories.map((category) => (
                  <Select.Option key={category._id} value={category._id}>
                    {category.title}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          ) : (
            // Display categories if not in edit mode
            <div>
              {text.map((categoryId, index) => {
                const category = categories.find((c) => c._id === categoryId);
                return <p key={index}>{category?.title}</p>;
              })}
            </div>
          )}
        </>
      ),
    },
    // Type column with rendering logic for editing type in form
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (text: string, record: DataTypeFacility) => (
        <>
          {edit === record.key ? (
            //In editing mode, the form for adding images is displayed.
            <Form.Item
              name="type"
              rules={[{ required: true, message: "Du måste välja en typ" }]}
            >
              <Select placeholder="Select type">
                {typeOf.map((type) => (
                  <Select.Option key={type} value={type}>
                    {type}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          ) : (
            // Display type if not in edit mode
            <p>{text}</p>
          )}
        </>
      ),
    },
    // Action column with buttons for editing, deleting, and submitting changes
    {
      title: "Action",
      key: "action",
      render: (record: IFacility) => (
        <Space size="middle">
          {edit === record._id && (
            // Display save button for submitting changes in edit mode
            <Button htmlType="submit" className="saveBtn">
              <CheckOutlined />
            </Button>
          )}
          {/* Display delete and edit buttons */}
          <DeleteOutlined onClick={() => deleteFacility(record)} />
          <EditOutlined
            onClick={() => {
              // Set the record ID to start editing mode
              setEdit(record._id);
              // Populate the form fields with the existing values
              form.setFieldsValue({
                title: record.title,
                description: record.description,
                price: record.price,
                categories: record.categories,
                type: record.type,
                images: record.images,
              });
            }}
          />
        </Space>
      ),
    },
  ];

  // Render the main component
  return (
    <div>
      <Form form={form} onFinish={handleEditSave}>
        <Table
          columns={columns}
          dataSource={facilities.map((facility) => ({
            ...facility,
            key: facility._id,
          }))}
          pagination={{ pageSize: 5 }}
        />
      </Form>
      <AdminCreateFacility />
    </div>
  );
}

export default AdminFacilities;
