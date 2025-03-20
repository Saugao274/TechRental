"use client"
import { Card, Table, Button, Modal, message, Space, Tag, Row, Col, Typography, Drawer, List, Avatar } from "antd"
import { DollarOutlined, InfoCircleOutlined } from "@ant-design/icons"
import { useState, useEffect } from "react"

// Define the product interface
interface Product {
  id: string
  name: string
  image: string
  rentDaily: string
  rentWeekly: string
  rentMonthly: string
  status: "Sẵn phẩm" | "Đã cho thuê"
  rating: number
  priority?: "Basic" | "Premium" | null
}

// Mock product data (shared with ProductManagement)
const products: Product[] = [
  {
    id: "PROD-001",
    name: "Osmo Pocket 3",
    image: "https://tse2.mm.bing.net/th?id=OIP.5hLDtL7nBZlLotjnt_O0bwHaHB&pid=Api&P=0&h=220",
    rentDaily: "1.800.000 ₫",
    rentWeekly: "6.000.000 ₫",
    rentMonthly: "20.000.000 ₫",
    status: "Sẵn phẩm",
    rating: 4.5,
    priority: "Basic",
  },
  {
    id: "PROD-002",
    name: "Sony ZV-1",
    image: "https://tse4.mm.bing.net/th?id=OIP.Srmo4fBjCKCypHkXwFlAgAHaEK&pid=Api&P=0&h=220",
    rentDaily: "2.000.000 ₫",
    rentWeekly: "10.000.000 ₫",
    rentMonthly: "25.000.000 ₫",
    status: "Đã cho thuê",
    rating: 4.7,
    priority: "Premium",
  },
  {
    id: "PROD-003",
    name: "GoPro Hero 12 Black",
    image: "https://tse3.mm.bing.net/th?id=OIP.xEIm6Vk4yTA8G9YaGuoN6wHaHa&pid=Api&P=0&h=220",
    rentDaily: "1.000.000 ₫",
    rentWeekly: "6.000.000 ₫",
    rentMonthly: "15.000.000 ₫",
    status: "Đã cho thuê",
    rating: 4.6,
    priority: null,
  },
]

// Define the priority package interface
interface PriorityPackage {
  type: "Basic" | "Premium"
  name: string
  price: number
  description: string
  benefits: string[]
}

const priorityPackages: PriorityPackage[] = [
  {
    type: "Basic",
    name: "Gói cơ bản",
    price: 10000,
    description: "Đề xuất nhiều hơn cho khách hàng",
    benefits: ["Hiển thị sản phẩm ở vị trí cao hơn", "Tăng khả năng tiếp cận khách hàng", "Hỗ trợ quảng bá cơ bản"],
  },
  {
    type: "Premium",
    name: "Gói cao cấp",
    price: 50000,
    description: "Ưu tiên hiển thị cao nhất trên trang",
    benefits: [
      "Hiển thị sản phẩm ở đầu danh sách",
      'Gắn nhãn "Đề xuất" nổi bật',
      "Hỗ trợ quảng bá nâng cao",
      "Ưu tiên hiển thị trong tìm kiếm",
    ],
  },
]

export default function RentalPolicyPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)
  const [detailProduct, setDetailProduct] = useState<Product | null>(null)

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

  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: Product) => (
        <Space>
          <img
            src={record.image || "/placeholder.svg"}
            alt={record.name}
            style={{
              width: "50px",
              height: "50px",
              objectFit: "contain",
              marginRight: "16px",
            }}
          />
          {text}
        </Space>
      ),
    },
    {
      title: "Thuê ngày",
      dataIndex: "rentDaily",
      key: "rentDaily",
      responsive: ["md"],
    },
    {
      title: "Thuê tuần",
      dataIndex: "rentWeekly",
      key: "rentWeekly",
      responsive: ["lg"],
    },
    {
      title: "Thuê tháng",
      dataIndex: "rentMonthly",
      key: "rentMonthly",
      responsive: ["lg"],
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: Product["status"]) => <Tag color={status === "Sẵn phẩm" ? "green" : "red"}>{status}</Tag>,
    },
    {
      title: "Ưu tiên hiện tại",
      dataIndex: "priority",
      key: "priority",
      responsive: ["md"],
      render: (priority: Product["priority"]) =>
        priority ? (
          <Tag color={priority === "Premium" ? "gold" : "blue"}>
            {priority === "Premium" ? "Ưu tiên cao cấp" : "Ưu tiên cơ bản"}
          </Tag>
        ) : (
          "Không ưu tiên"
        ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: Product) => (
        <Space>
          {isMobile && (
            <Button
              type="text"
              icon={<InfoCircleOutlined />}
              onClick={() => {
                setDetailProduct(record)
                setIsProductDetailOpen(true)
              }}
            />
          )}
          <Button
            type="primary"
            icon={<DollarOutlined />}
            onClick={() => {
              setSelectedProduct(record)
              setIsModalOpen(true)
            }}
            disabled={record.status === "Đã cho thuê"} // Vô hiệu hóa nếu sản phẩm đang được thuê
            size={isMobile ? "small" : "middle"}
          >
            {isMobile ? "" : "Mua gói ưu tiên"}
          </Button>
        </Space>
      ),
    },
  ]

  // Mobile list rendering
  const renderMobileList = () => (
    <List
      itemLayout="horizontal"
      dataSource={products}
      renderItem={(item) => (
        <List.Item
          actions={[
            <Button
              key="info"
              type="text"
              icon={<InfoCircleOutlined />}
              onClick={() => {
                setDetailProduct(item)
                setIsProductDetailOpen(true)
              }}
            />,
            <Button
              key="buy"
              type="primary"
              icon={<DollarOutlined />}
              onClick={() => {
                setSelectedProduct(item)
                setIsModalOpen(true)
              }}
              disabled={item.status === "Đã cho thuê"}
              size="small"
            />,
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar src={item.image} size={50} />}
            title={item.name}
            description={
              <Space direction="vertical" size={1}>
                <Tag color={item.status === "Sẵn phẩm" ? "green" : "red"}>{item.status}</Tag>
                {item.priority && (
                  <Tag color={item.priority === "Premium" ? "gold" : "blue"}>
                    {item.priority === "Premium" ? "Ưu tiên cao cấp" : "Ưu tiên cơ bản"}
                  </Tag>
                )}
              </Space>
            }
          />
        </List.Item>
      )}
    />
  )

  const handlePurchasePriority = (packageType: "Basic" | "Premium") => {
    if (!selectedProduct) return

    const packagePrice = packageType === "Premium" ? 50000 : 10000

    // Cập nhật trạng thái ưu tiên của sản phẩm
    const updatedProducts = products.map((product) =>
      product.id === selectedProduct.id ? { ...product, priority: packageType } : product,
    )

    message.success(
      `Đã mua gói ${packageType === "Premium" ? "Ưu tiên cao cấp" : "Ưu tiên cơ bản"} cho sản phẩm ${selectedProduct.name}`,
    )
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  // Product detail drawer for mobile
  const renderProductDetailDrawer = () => (
    <Drawer
      title="Chi tiết sản phẩm"
      placement="right"
      onClose={() => setIsProductDetailOpen(false)}
      open={isProductDetailOpen}
      width={300}
    >
      {detailProduct && (
        <Space direction="vertical" style={{ width: "100%" }}>
          <div style={{ textAlign: "center", marginBottom: "16px" }}>
            <img
              src={detailProduct.image || "/placeholder.svg"}
              alt={detailProduct.name}
              style={{
                width: "150px",
                height: "150px",
                objectFit: "contain",
              }}
            />
            <Typography.Title level={4} style={{ marginTop: "8px" }}>
              {detailProduct.name}
            </Typography.Title>
          </div>

          <Typography.Text strong>Giá thuê:</Typography.Text>
          <ul style={{ paddingLeft: "20px" }}>
            <li>Ngày: {detailProduct.rentDaily}</li>
            <li>Tuần: {detailProduct.rentWeekly}</li>
            <li>Tháng: {detailProduct.rentMonthly}</li>
          </ul>

          <div style={{ marginTop: "16px" }}>
            <Typography.Text strong>Trạng thái:</Typography.Text>
            <div style={{ marginTop: "8px" }}>
              <Tag color={detailProduct.status === "Sẵn phẩm" ? "green" : "red"}>{detailProduct.status}</Tag>
            </div>
          </div>

          <div style={{ marginTop: "16px" }}>
            <Typography.Text strong>Ưu tiên hiện tại:</Typography.Text>
            <div style={{ marginTop: "8px" }}>
              {detailProduct.priority ? (
                <Tag color={detailProduct.priority === "Premium" ? "gold" : "blue"}>
                  {detailProduct.priority === "Premium" ? "Ưu tiên cao cấp" : "Ưu tiên cơ bản"}
                </Tag>
              ) : (
                "Không ưu tiên"
              )}
            </div>
          </div>

          <div style={{ marginTop: "24px" }}>
            <Button
              type="primary"
              icon={<DollarOutlined />}
              onClick={() => {
                setSelectedProduct(detailProduct)
                setIsModalOpen(true)
                setIsProductDetailOpen(false)
              }}
              disabled={detailProduct.status === "Đã cho thuê"}
              style={{ width: "100%" }}
            >
              Mua gói ưu tiên
            </Button>
          </div>
        </Space>
      )}
    </Drawer>
  )

  return (
    <div style={{ padding: isMobile ? "12px" : "16px" }}>
      <div style={{ marginBottom: "16px" }}>
        <h2
          style={{
            fontSize: isMobile ? "20px" : "24px",
            fontWeight: "bold",
            color: "#0052cc",
          }}
        >
          Chính sách cho thuê
        </h2>
        <p style={{ color: "#0052cc", opacity: 0.7, fontSize: isMobile ? "14px" : "16px" }}>
          Mua gói ưu tiên để sản phẩm của bạn được hiển thị nổi bật hơn tới khách hàng.
        </p>
      </div>
      <Card bodyStyle={{ padding: isMobile ? "12px" : "24px" }}>
        {isMobile ? (
          renderMobileList()
        ) : (
          <Table
            columns={columns as any}
            dataSource={products}
            rowKey="id"
            pagination={false}
            style={{ marginBottom: "24px" }}
            scroll={{ x: 300 }}
          />
        )}
      </Card>

      {/* Modal để mua gói ưu tiên */}
      <Modal
        title={
          <Typography.Title level={isMobile ? 4 : 3} style={{ color: "#0052cc", textAlign: "center" }}>
            {`Mua gói ưu tiên cho sản phẩm ${selectedProduct?.name}`}
          </Typography.Title>
        }
        open={isModalOpen}
        footer={null}
        onCancel={() => {
          setIsModalOpen(false)
          setSelectedProduct(null)
        }}
        centered
        width={isMobile ? "95%" : "80%"}
        style={{
          maxWidth: "900px",
        }}
        bodyStyle={{
          background: "linear-gradient(135deg, #f0faff 0%, #e6f0ff 100%)",
          borderRadius: "12px",
          padding: isMobile ? "16px" : "24px",
        }}
      >
        <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
          {priorityPackages.map((pkg) => (
            <Col xs={24} sm={12} key={pkg.type}>
              <Card
                hoverable
                style={{
                  borderRadius: "12px",
                  border: pkg.type === "Premium" ? "2px solid #ffd700" : "2px solid #40c4ff",
                  background:
                    pkg.type === "Premium"
                      ? "linear-gradient(135deg, #fff9e6 0%, #fff3c2 100%)"
                      : "linear-gradient(135deg, #e6faff 0%, #d6eaff 100%)",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  position: "relative",
                  overflow: "hidden",
                }}
                styles={{
                  body: {
                    padding: isMobile ? "16px" : "24px",
                  },
                }}
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    ;(e.currentTarget as HTMLElement).style.transform = "scale(1.03)"
                    ;(e.currentTarget as HTMLElement).style.boxShadow = "0 6px 18px rgba(0, 0, 0, 0.15)"
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) {
                    ;(e.currentTarget as HTMLElement).style.transform = "scale(1)"
                    ;(e.currentTarget as HTMLElement).style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)"
                  }
                }}
              >
                {/* Gắn nhãn "Đề xuất" cho gói Premium */}
                {pkg.type === "Premium" && (
                  <div
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      background: "#ffd700",
                      color: "#fff",
                      padding: "4px 12px",
                      borderRadius: "12px",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    Đề xuất
                  </div>
                )}
                <Typography.Title
                  level={isMobile ? 5 : 4}
                  style={{
                    marginBottom: "12px",
                    color: pkg.type === "Premium" ? "#d4a017" : "#1890ff",
                    textAlign: "center",
                  }}
                >
                  {pkg.name}
                </Typography.Title>
                <Typography.Text
                  strong
                  style={{
                    fontSize: isMobile ? "20px" : "24px",
                    color: pkg.type === "Premium" ? "#d4a017" : "#1890ff",
                    display: "block",
                    textAlign: "center",
                    marginBottom: "12px",
                  }}
                >
                  {pkg.price.toLocaleString()} ₫
                </Typography.Text>
                <Typography.Paragraph
                  style={{
                    margin: "12px 0",
                    color: "#595959",
                    textAlign: "center",
                    fontSize: isMobile ? "14px" : "16px",
                  }}
                >
                  {pkg.description}
                </Typography.Paragraph>
                <ul
                  style={{
                    paddingLeft: "20px",
                    marginBottom: "24px",
                    color: "#595959",
                    fontSize: isMobile ? "12px" : "14px",
                  }}
                >
                  {pkg.benefits.map((benefit, index) => (
                    <li key={index} style={{ marginBottom: "8px" }}>
                      {benefit}
                    </li>
                  ))}
                </ul>
                <Button
                  type="primary"
                  block
                  onClick={() => handlePurchasePriority(pkg.type)}
                  style={{
                    borderRadius: "8px",
                    height: isMobile ? "40px" : "48px",
                    fontSize: isMobile ? "14px" : "16px",
                    background:
                      pkg.type === "Premium"
                        ? "linear-gradient(90deg, #ffd700 0%, #d4a017 100%)"
                        : "linear-gradient(90deg, #40c4ff 0%, #1890ff 100%)",
                    border: "none",
                    color: "#fff",
                    transition: "background 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!isMobile) {
                      ;(e.currentTarget as HTMLElement).style.background =
                        pkg.type === "Premium"
                          ? "linear-gradient(90deg, #d4a017 0%, #ffd700 100%)"
                          : "linear-gradient(90deg, #1890ff 0%, #40c4ff 100%)"
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isMobile) {
                      ;(e.currentTarget as HTMLElement).style.background =
                        pkg.type === "Premium"
                          ? "linear-gradient(90deg, #ffd700 0%, #d4a017 100%)"
                          : "linear-gradient(90deg, #40c4ff 0%, #1890ff 100%)"
                    }
                  }}
                >
                  Chọn gói
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </Modal>

      {/* Product detail drawer for mobile */}
      {renderProductDetailDrawer()}
    </div>
  )
}

