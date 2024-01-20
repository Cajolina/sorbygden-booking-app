import { Table } from "antd";
import type { TableColumnProps } from "antd";
import { useFacilityContext } from "../context/FacilityContext";
import { useCategoryContext } from "../context/CategoryContext";
import { useEffect } from "react";

function AdminFacilities() {
  const { fetchCategories, categories } = useCategoryContext();
  const { facilities } = useFacilityContext();

  useEffect(() => {
    const fetchData = async () => {
      await fetchCategories();
    };

    fetchData();
  }, [fetchCategories]);

  interface DataType {
    key: string;
    title: string;
    description: string;
    price: number;
    images: string[];
    // avalability: boolean;
    categories: string[];

    type: string;
  }
  const columns: TableColumnProps<DataType>[] = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text: string) => <p>{text}</p>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text: string) => <p>{text}</p>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text: number) => <p>{text}</p>,
    },
    {
      title: "Images",
      dataIndex: "images",
      key: "images",
      render: (images: string[]) => (
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
      ),
    },
    // {
    //   title: "avalability",
    //   dataIndex: "avalability",
    //   key: "avalability",
    //   render: (text: boolean) => <p>{text}</p>,
    // },
    {
      title: "categories",
      dataIndex: "categories",
      key: "categories",
      render: (categoryIds: string[]) => (
        <div>
          {categoryIds.map((categoryId, index) => {
            const category = categories.find((c) => c._id === categoryId);
            return <p key={index}>{category?.title}</p>;
          })}
        </div>
      ),
    },

    {
      title: "type",
      dataIndex: "type",
      key: "type",
      render: (text: string) => <p>{text}</p>,
    },
  ];
  return (
    <div>
      <Table
        columns={columns}
        dataSource={facilities.map((facility) => ({
          ...facility,
          key: facility._id,
        }))}
      />
    </div>
  );
}

export default AdminFacilities;
