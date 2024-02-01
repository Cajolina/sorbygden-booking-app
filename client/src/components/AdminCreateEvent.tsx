import { Button, Form, Input, InputNumber, Modal, Select, Space } from "antd";
import { useEventContext } from "../context/EventContext";
import { useEffect, useState } from "react";
import { useCategoryContext } from "../context/CategoryContext";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";

function AdminCreateEvent() {
  const { createEvent } = useEventContext();
  const { fetchCategories, categories } = useCategoryContext();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");

  // Fetch categories on component mount
  useEffect(() => {
    const fetchData = async () => {
      //Fetch categories only if they haven't already been fetched.
      if (!categories || categories.length === 0) {
        await fetchCategories();
      }
    };

    fetchData();
  }, [fetchCategories, categories]);

  // Function to submit the form
  const submitForm = async () => {
    try {
      await form.validateFields();
      const fieldsValue = await form.getFieldsValue();

      // Validate if there is at least one image
      if (!fieldsValue.images || fieldsValue.images.length === 0) {
        setError("Lägg till åtminstone en bild");
        throw new Error("Add at least one image");
      }

      // Create an event object with form values
      const event = {
        title: fieldsValue.title,
        description: fieldsValue.description,
        price: fieldsValue.price,
        inStock: fieldsValue.inStock,
        categories: fieldsValue.categories,
        type: fieldsValue.type,
        images: fieldsValue.images,
      };
      // Call the createEvent function from context to add the new event
      createEvent(event);
      // Close the modal, reset form fields, and clear any previous errors
      setIsModalOpen(false);
      form.resetFields();
      setError("");
    } catch (error) {
      console.log(error);
    }
  };

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to handle OK button click
  const handleOk = () => {
    submitForm();
  };

  // Function to handle Cancel button click
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setError("");
  };
  return (
    <div>
      <Button type="dashed" icon={<PlusOutlined />} onClick={openModal}>
        Lägg till nytt event
      </Button>
      <Modal
        title="Lägg till nytt event"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Skapa event"
        okType="text"
        cancelText="Avbryt"
      >
        <Form
          form={form}
          onFinish={submitForm}
          layout="vertical"
          style={{ maxWidth: 600 }}
        >
          <Form.Item
            name="title"
            label="Eventnamn"
            rules={[{ required: true, message: "Du måste ange ett namn" }]}
          >
            <Input placeholder="Eventnamn" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Beskrivning"
            rules={[
              { required: true, message: "Du måste ange en beskrivning" },
            ]}
          >
            <Input placeholder="Beskrivning" />
          </Form.Item>
          <Form.Item
            name="price"
            label="Pris"
            rules={[{ required: true, message: "Du måste ange ett pris" }]}
          >
            <InputNumber placeholder="Pris" />
          </Form.Item>
          <Form.Item
            name="inStock"
            label="I lager"
            rules={[
              { required: true, message: "Du måste lägga till antal i lager" },
            ]}
          >
            <InputNumber placeholder="I lager" />
          </Form.Item>
          <Form.Item
            name="categories"
            label="Kategori"
            rules={[
              { required: true, message: "Du måste välja minst 1 kategori" },
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
          <Form.Item
            name="type"
            label="Typ"
            rules={[{ required: true, message: "Du måste ange typ" }]}
          >
            <Select placeholder="Select type">
              {["event", "facility"].map((type) => (
                <Select.Option key={type} value={type}>
                  {type}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.List name="images">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={name}
                      key={key}
                      rules={[
                        {
                          required: true,
                          message: "Du måste lägga till minst 1 bild",
                        },
                        {
                          type: "string",
                          message: "Du måste lägga till minst 1 bild",
                        },
                      ]}
                    >
                      <Input placeholder="Image URL" />
                    </Form.Item>
                    <CloseOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                  >
                    Add Image
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          {error && <p className="error-message">{error}</p>}
        </Form>
      </Modal>
    </div>
  );
}

export default AdminCreateEvent;
