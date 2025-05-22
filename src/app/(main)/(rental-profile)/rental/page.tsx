"use client"
import {
  Card,
  Input,
  Table,
  Avatar,
  Space,
  Button,
  Modal,
  Form,
  Upload,
  message,
  Collapse,
  Tabs,
  Typography,
} from "antd"
import { SearchOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons"
import { useState, useEffect } from "react"
import { Image, Badge, Rate } from "antd"
import type { UploadFile, UploadProps } from "antd"
import { useRouter } from "next/navigation"

const { Panel } = Collapse
const { Title, Text, Paragraph } = Typography
const { TabPane } = Tabs

// Define the product interface
interface Product {
  id: string
  name: string
  image: string
  rentDaily: string
  rentWeekly: string
  rentMonthly: string // Added monthly rental price
  status: "Sẵn phẩm" | "Đã cho thuê"
  rating: number
}

// Define the product request interface
interface ProductRequest {
  id: string
  name: string
  status: "Pending" | "Approved" | "Rejected"
  adminNote?: string
  realPhotos: UploadFile[]
  detailPhotos: UploadFile[]
  originPhoto: UploadFile[]
  rentDaily: string
  rentWeekly: string
  rentMonthly: string // Added monthly rental price
  description: string
}

const products: Product[] = [
  {
    id: "PROD-001",
    name: "Osmo Pocket 3",
    image: "https://tse2.mm.bing.net/th?id=OIP.5hLDtL7nBZlLotjnt_O0bwHaHB&pid=Api&P=0&h=220",
    rentDaily: "1.800.000 ₫",
    rentWeekly: "6.000.000 ₫",
    rentMonthly: "20.000.000 ₫", // Added monthly price
    status: "Sẵn phẩm",
    rating: 4.5,
  },
  {
    id: "PROD-002",
    name: "Sony ZV-1",
    image: "https://tse4.mm.bing.net/th?id=OIP.Srmo4fBjCKCypHkXwFlAgAHaEK&pid=Api&P=0&h=220",
    rentDaily: "2.000.000 ₫",
    rentWeekly: "10.000.000 ₫",
    rentMonthly: "25.000.000 ₫", // Added monthly price
    status: "Đã cho thuê",
    rating: 4.7,
  },
  {
    id: "PROD-003",
    name: "GoPro Hero 12 Black",
    image: "https://tse3.mm.bing.net/th?id=OIP.xEIm6Vk4yTA8G9YaGuoN6wHaHa&pid=Api&P=0&h=220",
    rentDaily: "1.000.000 ₫",
    rentWeekly: "6.000.000 ₫",
    rentMonthly: "15.000.000 ₫", // Added monthly price
    status: "Đã cho thuê",
    rating: 4.6,
  },
]

const statusColors: Record<Product["status"], string> = {
  "Sẵn phẩm": "green",
  "Đã cho thuê": "red",
}

// Mock shop data
const shop = {
  name: "TechRental Shop",
  avatar: "https://tse2.mm.bing.net/th?id=OIP.1cm6Ujvi-w_213sGCwv3SgHaJk&pid=Api&P=0&h=220",
}

// Mock product requests (replace with API data)
const initialProductRequests: ProductRequest[] = [
  {
    id: "REQ-001",
    name: "Canon EOS R6",
    status: "Pending",
    adminNote: "Ảnh quá mờ",
    realPhotos: [],
    detailPhotos: [],
    originPhoto: [],
    rentDaily: "2.500.000 ₫",
    rentWeekly: "12.000.000 ₫",
    rentMonthly: "30.000.000 ₫", // Added monthly price
    description: "Máy ảnh Canon EOS R6, mới 99%.",
  },
  {
    id: "REQ-002",
    name: "DJI Mavic Air 2",
    status: "Approved",
    adminNote: "Đã duyệt",
    realPhotos: [],
    detailPhotos: [],
    originPhoto: [],
    rentDaily: "1.500.000 ₫",
    rentWeekly: "8.000.000 ₫",
    rentMonthly: "20.000.000 ₫", // Added monthly price
    description: "Drone DJI Mavic Air 2, pin tốt.",
  },
  {
    id: "REQ-003",
    name: "Nikon Z6",
    status: "Rejected",
    adminNote: "Hình ảnh không rõ, thiếu hóa đơn",
    realPhotos: [],
    detailPhotos: [],
    originPhoto: [],
    rentDaily: "2.000.000 ₫",
    rentWeekly: "9.000.000 ₫",
    rentMonthly: "25.000.000 ₫", // Added monthly price
    description: "Máy ảnh Nikon Z6, tình trạng tốt.",
  },
]

export default function ProductManagement() {
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [productRequests, setProductRequests] = useState<ProductRequest[]>(initialProductRequests)
  const [form] = Form.useForm()
  const pageSize = 5
  const [isMobile, setIsMobile] = useState(false)
  const [activeTab, setActiveTab] = useState("products")
  const router = useRouter();

  // Check if screen is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIfMobile()

    // Add event listener
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()))

  const paginatedProducts = filteredProducts.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  // Desktop columns
  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: Product) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Image
            alt={record.name}
            src={record.image || "/placeholder.svg"}
            preview={false}
            style={{
              width: "50px",
              height: "50px",
              marginRight: "16px",
              objectFit: "contain",
            }}
          />
          {text}
        </div>
      ),
    },
    {
      title: "Thuê ngày",
      dataIndex: "rentDaily",
      key: "rentDaily",
    },
    {
      title: "Thuê tuần",
      dataIndex: "rentWeekly",
      key: "rentWeekly",
    },
    {
      title: "Thuê tháng",
      dataIndex: "rentMonthly",
      key: "rentMonthly",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: Product["status"]) => <Badge color={statusColors[status]} text={status} />,
    },
    {
      title: "Trung bình đánh giá",
      dataIndex: "rating",
      key: "rating",
      render: (rating: number) => <Rate disabled allowHalf defaultValue={rating} />,
    },
  ]

  // Mobile columns (simplified)
  const mobileColumns = [
    {
      title: "Sản phẩm",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: Product) => (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Image
              alt={record.name}
              src={record.image || "/placeholder.svg"}
              preview={false}
              style={{
                width: "60px",
                height: "60px",
                objectFit: "contain",
              }}
            />
            <div>
              <div style={{ fontWeight: "bold", marginBottom: "4px" }}>{text}</div>
              <Badge color={statusColors[record.status]} text={record.status} />
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
            <div>
              <div>Ngày: {record.rentDaily}</div>
              <div>Tuần: {record.rentWeekly}</div>
              <div>Tháng: {record.rentMonthly}</div>
            </div>
            <div>
              <Rate disabled allowHalf defaultValue={record.rating} style={{ fontSize: "14px" }} />
            </div>
          </div>
        </div>
      ),
    },
  ]

  const requestColumns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Thuê ngày",
      dataIndex: "rentDaily",
      key: "rentDaily",
    },
    {
      title: "Thuê tuần",
      dataIndex: "rentWeekly",
      key: "rentWeekly",
    },
    {
      title: "Thuê tháng",
      dataIndex: "rentMonthly",
      key: "rentMonthly",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: ProductRequest["status"]) => (
        <Badge
          status={status === "Approved" ? "success" : status === "Rejected" ? "error" : "processing"}
          text={status === "Approved" ? "Đã duyệt" : status === "Rejected" ? "Bị từ chối" : "Đang chờ"}
        />
      ),
    },
    {
      title: "Ghi chú của Admin",
      dataIndex: "adminNote",
      key: "adminNote",
      render: (note: string) => note || "Không có ghi chú",
    },
  ]

  // Mobile request columns (simplified)
  const mobileRequestColumns = [
    {
      title: "Yêu cầu",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: ProductRequest) => (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ fontWeight: "bold" }}>{text}</div>

          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
            <Badge
              status={record.status === "Approved" ? "success" : record.status === "Rejected" ? "error" : "processing"}
              text={
                record.status === "Approved" ? "Đã duyệt" : record.status === "Rejected" ? "Bị từ chối" : "Đang chờ"
              }
            />
          </div>

          <div style={{ fontSize: "12px" }}>
            <div>Ngày: {record.rentDaily}</div>
            <div>Tuần: {record.rentWeekly}</div>
            <div>Tháng: {record.rentMonthly}</div>
          </div>

          <div style={{ fontSize: "12px" }}>
            <div style={{ fontWeight: "bold" }}>Ghi chú:</div>
            <div>{record.adminNote || "Không có ghi chú"}</div>
          </div>
        </div>
      ),
    },
  ]

  // Upload props for photos
  const uploadProps: UploadProps = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/")
      if (!isImage) {
        message.error("Bạn chỉ có thể tải lên file hình ảnh!")
      }
      return isImage || Upload.LIST_IGNORE
    },
    onChange: (info) => {
      if (info.file.status === "done") {
        message.success(`${info.file.name} tải lên thành công`)
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} tải lên thất bại`)
      }
    },
    multiple: true,
  }

  const handleAddProduct = (values: any) => {
    const newRequest: ProductRequest = {
      id: `REQ-${Date.now()}`,
      name: values.name,
      status: "Pending",
      realPhotos: values.realPhotos?.fileList || [],
      detailPhotos: values.detailPhotos?.fileList || [],
      originPhoto: values.originPhoto?.fileList || [],
      rentDaily: values.rentDaily,
      rentWeekly: values.rentWeekly,
      rentMonthly: values.rentMonthly,
      description: values.description,
    }

    setProductRequests([...productRequests, newRequest])
    message.success("Yêu cầu thêm sản phẩm đã được gửi, chờ admin duyệt.")
    setIsModalOpen(false)
    form.resetFields()
  }

  // Render mobile view
  const renderMobileView = () => (
    <>
      <div style={{ marginBottom: "16px" }}>
        <Title level={4} style={{ color: "#0052cc", marginBottom: "8px" }}>
          Quản lý sản phẩm
        </Title>
        <Paragraph style={{ color: "#0052cc", opacity: 0.7, fontSize: "14px", marginBottom: "16px" }}>
          Mọi sản phẩm sẽ được thông tin chi tiết để người cho thuê hoặc mượn dễ dàng quản lý và kiểm tra.
        </Paragraph>
      </div>

      <Card bodyStyle={{ padding: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "16px", gap: "8px" }}>
          <Avatar src={shop.avatar} size={32} />
          <span style={{ fontSize: "14px", color: "#0052cc" }}>{shop.name}</span>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <Input
            prefix={<SearchOutlined />}
            placeholder="Tìm kiếm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)} style={{ width: "100%" }}>
            Thêm sản phẩm mới
          </Button>
        </div>

        <Tabs activeKey={activeTab} onChange={setActiveTab} size="small" style={{ marginBottom: "16px" }}>
          <TabPane tab="Sản phẩm" key="products" />
          <TabPane tab="Yêu cầu" key="requests" />
        </Tabs>

        {activeTab === "products" ? (
          <Table
            columns={mobileColumns}
            dataSource={paginatedProducts}
            rowKey="id"
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: filteredProducts.length,
              onChange: (page) => setCurrentPage(page),
              showSizeChanger: false,
              size: "small",
            }}
            style={{ width: "100%" }}
            showHeader={false}
          />
        ) : (
          <Table
            columns={mobileRequestColumns}
            dataSource={productRequests}
            rowKey="id"
            pagination={false}
            showHeader={false}
          />
        )}
      </Card>
    </>
  )

  // Render desktop view
  const renderDesktopView = () => (
    <>
      <div style={{ marginBottom: "16px" }}>
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            color: "#0052cc",
          }}
        >
          Quản lý sản phẩm
        </h2>
        <p style={{ color: "#0052cc", opacity: 0.7 }}>
          Mọi sản phẩm sẽ được thông tin chi tiết để người cho thuê hoặc mượn dễ dàng quản lý và kiểm tra.
        </p>
      </div>
      <Card>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
            marginBottom: "16px",
          }}
        >
          <Input
            prefix={<SearchOutlined />}
            placeholder="Tìm kiếm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "100%", maxWidth: "300px" }}
          />
          <Space>
            <Avatar src={shop.avatar} size={40} />
            <span style={{ fontSize: "16px", color: "#0052cc" }}>{shop.name}</span>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => router.push('rental/new')}>
              Thêm sản phẩm mới
            </Button>
          </Space>
        </div>
        <Table
          columns={columns}
          dataSource={paginatedProducts}
          rowKey="id"
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: filteredProducts.length,
            onChange: (page) => setCurrentPage(page),
            showSizeChanger: false,
          }}
          style={{ width: "100%", marginBottom: "24px" }}
        />
        <div style={{ marginTop: "24px" }}>
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              color: "#0052cc",
            }}
          >
            Yêu cầu tạo sản phẩm
          </h3>
          <Table columns={requestColumns} dataSource={productRequests} rowKey="id" pagination={false} />
        </div>
      </Card>
    </>
  )

  return (
    <div>
      {isMobile ? renderMobileView() : renderDesktopView()}

      <Modal
        title="Thêm sản phẩm mới"
        open={isModalOpen}
        onOk={() => form.submit()}
        onCancel={() => {
          setIsModalOpen(false)
          form.resetFields()
        }}
        okText="Gửi yêu cầu"
        cancelText="Hủy"
        width={isMobile ? "100%" : 520}
        style={{ top: isMobile ? 0 : 20 }}
        bodyStyle={{ maxHeight: isMobile ? "calc(100vh - 200px)" : "auto", overflowY: "auto" }}
      >
        <Form form={form} layout="vertical" onFinish={handleAddProduct}>
          <Form.Item
            name="name"
            label="Tên sản phẩm"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên sản phẩm",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="rentDaily"
            label="Thuê ngày"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập giá thuê ngày",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="rentWeekly"
            label="Thuê tuần"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập giá thuê tuần",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="rentMonthly"
            label="Thuê tháng"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập giá thuê tháng",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="realPhotos"
            label="Ảnh thực tế của sản phẩm (Chụp chung với chủ shop)"
            rules={[
              {
                required: true,
                message: "Vui lòng tải lên ít nhất một ảnh thực tế",
              },
            ]}
          >
            <Upload {...uploadProps} listType="picture" accept="image/*">
              <Button icon={<UploadOutlined />}>Tải lên ảnh thực tế</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="detailPhotos"
            label="Ảnh chi tiết của sản phẩm"
            rules={[
              {
                required: true,
                message: "Vui lòng tải lên ít nhất một ảnh chi tiết",
              },
            ]}
          >
            <Upload {...uploadProps} listType="picture" accept="image/*">
              <Button icon={<UploadOutlined />}>Tải lên ảnh chi tiết</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô tả sản phẩm"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mô tả sản phẩm",
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="originPhoto"
            label="Ảnh nguồn gốc xuất xứ (Ví dụ: Hóa đơn mua sản phẩm)"
            rules={[
              {
                required: true,
                message: "Vui lòng tải lên ảnh nguồn gốc xuất xứ",
              },
            ]}
          >
            <Upload {...uploadProps} listType="picture" accept="image/*" maxCount={1}>
              <Button icon={<UploadOutlined />}>Tải lên ảnh nguồn gốc</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

