import { useEffect, useState } from "react";
import { useCategoryContext } from "../context/CategoryContext";
import { useFacilityContext } from "../context/FacilityContext";
import { Button, Form, Input, InputNumber, Modal, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
function AdminCreateFacility() {
  const { createFacility } = useFacilityContext();
  const { fetchCategories, categories } = useCategoryContext();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      //Fetch categories only if they haven't already been fetched.
      if (!categories || categories.length === 0) {
        await fetchCategories();
      }
    };

    fetchData();
  }, [fetchCategories, categories]);

  const submitForm = async () => {
    try {
      await form.validateFields();
      const fieldsValue = await form.getFieldsValue();

      const facility = {
        title: fieldsValue.title,
        description: fieldsValue.description,
        price: fieldsValue.price,
        categories: fieldsValue.categories,
        type: fieldsValue.type,
        images: fieldsValue.images,
      };

      createFacility(facility);
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    submitForm();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <div>
      <Button type="dashed" icon={<PlusOutlined />} onClick={openModal}>
        Lägg till nytt event
      </Button>
      <Modal
        title="Lägg till ny lokal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Skapa lokal"
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
            label="Lokalnamn"
            rules={[{ required: true }]}
          >
            <Input placeholder="Lokalnamn" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Beskrivning"
            rules={[{ required: true }]}
          >
            <Input placeholder="Beskrivning" />
          </Form.Item>
          <Form.Item name="price" label="Pris" rules={[{ required: true }]}>
            <InputNumber placeholder="Pris" />
          </Form.Item>

          <Form.Item
            name="categories"
            label="Kategori"
            rules={[{ required: true }]}
          >
            <Select mode="multiple" placeholder="Select categories">
              {categories.map((category) => (
                <Select.Option key={category._id} value={category._id}>
                  {category.title}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="type" label="Typ" rules={[{ required: true }]}>
            <Select placeholder="Select type">
              {["event", "facility"].map((type) => (
                <Select.Option key={type} value={type}>
                  {type}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="images"
            label="Lokalbilder"
            rules={[{ required: true }]}
          >
            <Input placeholder="ladda upp" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default AdminCreateFacility;
