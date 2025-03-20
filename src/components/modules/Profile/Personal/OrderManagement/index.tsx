"use client"
import { Card, Tabs, Table, Input, Badge, Button, Typography, Grid, Dropdown } from "antd"
import { SearchOutlined, FilterOutlined } from "@ant-design/icons"
import { useState, useEffect } from "react"

const { Title, Text } = Typography
const { TabPane } = Tabs

const orders = [
  {
    id: "ORD-001",
    product: "Máy ảnh Canon EOS R5",
    date: "01/01/2023",
    duration: "5 ngày",
    status: "Đã hoàn thành",
    total: "2.500.000 ₫",
  },
  {
    id: "ORD-002",
    product: "Laptop MacBook Pro",
    date: "15/02/2023",
    duration: "7 ngày",
    status: "Đã hoàn thành",
    total: "3.200.000 ₫",
  },
  {
    id: "ORD-004",
    product: "Drone DJI Mini 3",
    date: "05/04/2023",
    duration: "3 ngày",
    status: "Chờ xác nhận",
    total: "1.500.000 ₫",
  },
  {
    id: "ORD-005",
    product: "Máy quay Sony FX3",
    date: "10/04/2023",
    duration: "10 ngày",
    status: "Đang xử lý",
    total: "5.000.000 ₫",
  },
]

const statusColors = {
  "Đã hoàn thành": "green",
  "Chờ xác nhận": "orange",
  "Đang xử lý": "blue",
  "Đã hủy": "red",
}

export default function OrderManagement() {
  const [search, setSearch] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [isMobile, setIsMobile] = useState(false)

  const { useBreakpoint } = Grid
  const screens = useBreakpoint()

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize() // Set initial value
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const filteredOrders = orders.filter(
    (order) =>
      order.product.toLowerCase().includes(search.toLowerCase()) ||
      order.id.toLowerCase().includes(search.toLowerCase()),
  )

  // Filter orders based on active tab
  const tabFilteredOrders =
    activeTab === "all"
      ? filteredOrders
      : filteredOrders.filter((order) => {
          switch (activeTab) {
            case "pending":
              return order.status === "Chờ xác nhận"
            case "processing":
              return order.status === "Đang xử lý"
            case "completed":
              return order.status === "Đã hoàn thành"
            case "cancelled":
              return order.status === "Đã hủy"
            default:
              return true
          }
        })

  // Desktop columns configuration
  const desktopColumns = [
    { title: "Mã đơn hàng", dataIndex: "id", key: "id" },
    { title: "Sản phẩm", dataIndex: "product", key: "product" },
    { title: "Ngày đặt", dataIndex: "date", key: "date" },
    { title: "Thời gian thuê", dataIndex: "duration", key: "duration" },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) => <Badge color={statusColors[status as keyof typeof statusColors]} text={status} />,
    },
    { title: "Tổng tiền", dataIndex: "total", key: "total" },
    {
      title: "",
      key: "action",
      render: () => (
        <Button type="link" className="!text-primary">
          Chi tiết
        </Button>
      ),
    },
  ]

  // Mobile columns configuration (simplified)
  const mobileColumns = [
    {
      title: "Đơn hàng",
      key: "order",
      render: (record: any) => (
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <Text strong>{record.id}</Text>
            <Badge color={statusColors[record.status as keyof typeof statusColors]} text={record.status} />
          </div>
          <Text>{record.product}</Text>
          <div className="flex justify-between items-center text-gray-500">
            <Text type="secondary">{record.date}</Text>
            <Text type="secondary">{record.duration}</Text>
          </div>
          <div className="flex justify-between items-center mt-1">
            <Text strong>{record.total}</Text>
            <Button type="link" className="!text-primary !p-0">
              Chi tiết
            </Button>
          </div>
        </div>
      ),
    },
  ]

  // Mobile tab items for dropdown
  const tabItems = [
    { key: "all", label: "Tất cả" },
    { key: "pending", label: "Chờ xác nhận" },
    { key: "processing", label: "Đang xử lý" },
    { key: "completed", label: "Đã hoàn thành" },
    { key: "cancelled", label: "Đã hủy" },
  ]

  return (
    <div className="flex flex-col gap-5">
      <div className="px-4 md:px-0">
        <Title level={isMobile ? 4 : 3} className="!text-primary !mb-1">
          Quản lý đơn hàng
        </Title>
        <Text type="secondary" className="!text-primary">
          Quản lý các đơn hàng thuê sản phẩm của bạn
        </Text>
      </div>

      <Card bodyStyle={{ padding: isMobile ? 12 : 24 }}>
        <div className={`flex ${isMobile ? "flex-col gap-3" : "justify-between items-center"} mb-4`}>
          <div>
            <Title level={isMobile ? 5 : 4} className="!mb-0">
              Đơn hàng của bạn
            </Title>
            {!isMobile && <Text>Danh sách các đơn hàng thuê sản phẩm</Text>}
          </div>

          <div className={`flex ${isMobile ? "flex-col gap-2" : ""} items-center`}>
            {isMobile && (
              <div className="flex justify-between w-full">
                <Text>Danh sách các đơn hàng thuê sản phẩm</Text>
                <Dropdown
                  menu={{
                    items: tabItems,
                    onClick: (e) => setActiveTab(e.key),
                    selectedKeys: [activeTab],
                  }}
                  trigger={["click"]}
                >
                  <Button icon={<FilterOutlined />}>{tabItems.find((item) => item.key === activeTab)?.label}</Button>
                </Dropdown>
              </div>
            )}

            <Input
              prefix={<SearchOutlined />}
              placeholder="Tìm kiếm đơn hàng..."
              style={{ width: isMobile ? "100%" : 300 }}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {isMobile ? (
          <div className="mt-4">
            <Table
              columns={mobileColumns}
              dataSource={tabFilteredOrders}
              rowKey="id"
              pagination={{
                size: "small",
                pageSize: 5,
                showSizeChanger: false,
                showTotal: (total) => `${total} đơn hàng`,
              }}
            />
          </div>
        ) : (
          <Tabs defaultActiveKey="all" onChange={setActiveTab} className="order-tabs">
            <TabPane tab="Tất cả" key="all">
              <Table
                columns={desktopColumns}
                dataSource={filteredOrders}
                rowKey="id"
                sticky
                pagination={{
                  showSizeChanger: true,
                  showTotal: (total) => `Tổng ${total} đơn hàng`,
                }}
              />
            </TabPane>
            <TabPane tab="Chờ xác nhận" key="pending">
              <Table
                columns={desktopColumns}
                dataSource={filteredOrders.filter((o) => o.status === "Chờ xác nhận")}
                rowKey="id"
                pagination={{
                  showSizeChanger: true,
                  showTotal: (total) => `Tổng ${total} đơn hàng`,
                }}
              />
            </TabPane>
            <TabPane tab="Đang xử lý" key="processing">
              <Table
                columns={desktopColumns}
                dataSource={filteredOrders.filter((o) => o.status === "Đang xử lý")}
                rowKey="id"
                pagination={{
                  showSizeChanger: true,
                  showTotal: (total) => `Tổng ${total} đơn hàng`,
                }}
              />
            </TabPane>
            <TabPane tab="Đã hoàn thành" key="completed">
              <Table
                columns={desktopColumns}
                dataSource={filteredOrders.filter((o) => o.status === "Đã hoàn thành")}
                rowKey="id"
                pagination={{
                  showSizeChanger: true,
                  showTotal: (total) => `Tổng ${total} đơn hàng`,
                }}
              />
            </TabPane>
            <TabPane tab="Đã hủy" key="cancelled">
              <Table
                columns={desktopColumns}
                dataSource={filteredOrders.filter((o) => o.status === "Đã hủy")}
                rowKey="id"
                pagination={{
                  showSizeChanger: true,
                  showTotal: (total) => `Tổng ${total} đơn hàng`,
                }}
              />
            </TabPane>
          </Tabs>
        )}
      </Card>

      <style jsx global>{`
                @media (max-width: 767px) {
                    .ant-table-cell {
                        padding: 8px !important;
                    }
                    
                    .ant-card-body {
                        padding: 12px !important;
                    }
                    
                    .ant-tabs-nav {
                        margin-bottom: 8px !important;
                    }
                    
                    .ant-pagination {
                        margin-top: 8px !important;
                    }
                }
            `}</style>
    </div>
  )
}

