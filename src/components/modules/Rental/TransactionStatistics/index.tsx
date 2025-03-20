"use client"
import ButtonCommon from "@/components/core/common/ButtonCommon"
import {
  Card,
  Col,
  DatePicker,
  Grid,
  Row,
  Select,
  Space,
  Statistic,
  Table,
  Tabs,
  Tag,
  Typography,
  Drawer,
  Button,
} from "antd"
import { ArrowDown, ArrowUp, CreditCard, DollarSign, Download, User, Filter } from "lucide-react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { useState, useEffect } from "react"

const { Title, Text } = Typography
const { TabPane } = Tabs

// Dữ liệu mẫu cho biểu đồ
const revenueData = [
  { month: "T1", revenue: 2500000, transactions: 5 },
  { month: "T2", revenue: 3200000, transactions: 7 },
  { month: "T3", revenue: 4100000, transactions: 9 },
  { month: "T4", revenue: 3800000, transactions: 8 },
  { month: "T5", revenue: 5200000, transactions: 12 },
  { month: "T6", revenue: 4700000, transactions: 10 },
  { month: "T7", revenue: 6100000, transactions: 15 },
  { month: "T8", revenue: 5800000, transactions: 13 },
  { month: "T9", revenue: 7200000, transactions: 18 },
  { month: "T10", revenue: 6500000, transactions: 16 },
  { month: "T11", revenue: 8100000, transactions: 20 },
  { month: "T12", revenue: 9500000, transactions: 25 },
]

const categoryData = [
  { name: "Máy ảnh", value: 35 },
  { name: "Ống kính", value: 25 },
  { name: "Thiết bị âm thanh", value: 20 },
  { name: "Phụ kiện", value: 15 },
  { name: "Khác", value: 5 },
]

const transactionData = [
  {
    key: "1",
    id: "TR12345",
    date: "15/03/2023",
    customer: "Nguyễn Văn A",
    product: "Máy ảnh Canon EOS 5D Mark IV",
    amount: "2.500.000đ",
    status: "completed",
  },
  {
    key: "2",
    id: "TR12346",
    date: "18/03/2023",
    customer: "Trần Thị B",
    product: "Ống kính Sony 24-70mm",
    amount: "1.800.000đ",
    status: "completed",
  },
  {
    key: "3",
    id: "TR12347",
    date: "20/03/2023",
    customer: "Lê Văn C",
    product: "Máy quay GoPro Hero 10",
    amount: "3.200.000đ",
    status: "pending",
  },
  {
    key: "4",
    id: "TR12348",
    date: "22/03/2023",
    customer: "Phạm Thị D",
    product: "Chân máy Manfrotto",
    amount: "950.000đ",
    status: "completed",
  },
  {
    key: "5",
    id: "TR12349",
    date: "25/03/2023",
    customer: "Hoàng Văn E",
    product: "Đèn LED Godox",
    amount: "1.200.000đ",
    status: "cancelled",
  },
]

const topProductsData = [
  { name: "Máy ảnh Canon EOS 5D Mark IV", value: 25 },
  { name: "Ống kính Sony 24-70mm", value: 18 },
  { name: "Máy quay GoPro Hero 10", value: 15 },
  { name: "Chân máy Manfrotto", value: 12 },
  { name: "Đèn LED Godox", value: 10 },
  { name: "Ống kính Canon 70-200mm", value: 8 },
  { name: "Máy ảnh Sony A7 III", value: 7 },
  { name: "Microphone Rode", value: 6 },
  { name: "Gimbal DJI", value: 5 },
  { name: "Đèn flash Godox", value: 4 },
]

const topCustomersData = [
  { key: "1", name: "Nguyễn Văn A", transactions: 12, total: "12.500.000đ" },
  { key: "2", name: "Trần Thị B", transactions: 10, total: "9.800.000đ" },
  { key: "3", name: "Lê Văn C", transactions: 8, total: "8.200.000đ" },
  { key: "4", name: "Phạm Thị D", transactions: 7, total: "7.500.000đ" },
  { key: "5", name: "Hoàng Văn E", transactions: 6, total: "6.300.000đ" },
]

const customerDistributionData = [
  { name: "TP. Hồ Chí Minh", value: 45 },
  { name: "Hà Nội", value: 25 },
  { name: "Đà Nẵng", value: 15 },
  { name: "Các tỉnh khác", value: 15 },
]

// Màu sắc cho biểu đồ
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

// Component định dạng tooltip cho biểu đồ
const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: any
  label?: string
}) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "4px",
        }}
      >
        <p style={{ margin: 0 }}>{`${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} style={{ margin: 0, color: entry.color }}>
            {`${entry.name}: ${entry.value.toLocaleString("vi-VN")}${entry.name === "Doanh thu" ? "đ" : ""}`}
          </p>
        ))}
      </div>
    )
  }

  return null
}

// Component định dạng tooltip cho biểu đồ tròn
const PieTooltip = ({
  active,
  payload,
}: {
  active?: boolean
  payload?: any
}) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "4px",
        }}
      >
        <p style={{ margin: 0, color: payload[0].color }}>{`${payload[0].name}: ${payload[0].value}`}</p>
      </div>
    )
  }

  return null
}

export default function TransactionStatistics() {
  const { useBreakpoint } = Grid
  const screens = useBreakpoint()
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [chartHeight, setChartHeight] = useState(350)

  // Check if screen is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)

      // Adjust chart height based on screen size
      if (window.innerWidth < 576) {
        setChartHeight(250)
      } else {
        setChartHeight(350)
      }
    }

    // Initial check
    checkIfMobile()

    // Add event listener
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  // Cấu hình bảng giao dịch
  const transactionColumns = [
    {
      title: "Mã giao dịch",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Ngày",
      dataIndex: "date",
      key: "date",
      responsive: ["md"],
    },
    {
      title: "Khách hàng",
      dataIndex: "customer",
      key: "customer",
      responsive: ["sm"],
    },
    {
      title: "Sản phẩm",
      dataIndex: "product",
      key: "product",
      ellipsis: true,
    },
    {
      title: "Số tiền",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "completed" ? "success" : status === "pending" ? "warning" : "error"}>
          {status === "completed" ? "Hoàn thành" : status === "pending" ? "Đang xử lý" : "Đã hủy"}
        </Tag>
      ),
    },
  ]

  // Mobile transaction columns (simplified)
  const mobileTransactionColumns = [
    {
      title: "Giao dịch",
      dataIndex: "id",
      key: "id",
      render: (id: string, record: any) => (
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <div style={{ fontWeight: "bold" }}>{id}</div>
          <div style={{ fontSize: "12px" }}>{record.product}</div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
            <div>{record.amount}</div>
            <Tag color={record.status === "completed" ? "success" : record.status === "pending" ? "warning" : "error"}>
              {record.status === "completed" ? "Hoàn thành" : record.status === "pending" ? "Đang xử lý" : "Đã hủy"}
            </Tag>
          </div>
        </div>
      ),
    },
  ]

  // Cấu hình bảng khách hàng thân thiết
  const topCustomersColumns = [
    {
      title: "Khách hàng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số giao dịch",
      dataIndex: "transactions",
      key: "transactions",
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
    },
  ]

  // Định dạng số tiền
  const formatCurrency = (value: any) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }

  // Filter drawer for mobile
  const renderFilterDrawer = () => (
    <Drawer
      title="Bộ lọc"
      placement="right"
      onClose={() => setIsFilterDrawerOpen(false)}
      open={isFilterDrawerOpen}
      width={300}
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        <div>
          <Text>Chọn tháng</Text>
          <DatePicker picker="month" placeholder="Chọn tháng" style={{ width: "100%", marginTop: 8 }} />
        </div>

        <div style={{ marginTop: 16 }}>
          <Text>Loại giao dịch</Text>
          <Select
            size="middle"
            defaultValue="all"
            style={{ width: "100%", marginTop: 8 }}
            options={[
              { value: "all", label: "Tất cả giao dịch" },
              { value: "rental", label: "Cho thuê" },
              { value: "return", label: "Trả hàng" },
              { value: "deposit", label: "Đặt cọc" },
            ]}
          />
        </div>

        <div style={{ marginTop: 24 }}>
          <ButtonCommon type="primary" style={{ width: "100%" }}>
            Áp dụng
          </ButtonCommon>
        </div>
      </Space>
    </Drawer>
  )

  return (
    <div style={{ padding: isMobile ? "12px" : "16px" }}>
      <div
        style={{
          marginBottom: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <p className="text-xl md:text-2xl !font-bold !text-primary">Thống kê giao dịch</p>

        {isMobile ? (
          <Space>
            <Button icon={<Filter size={16} />} onClick={() => setIsFilterDrawerOpen(true)}>
              Bộ lọc
            </Button>
            <Button type="primary" icon={<Download size={16} />} />
          </Space>
        ) : (
          <Space wrap>
            <DatePicker picker="month" placeholder="Chọn tháng" style={{ width: 150 }} />

            <Select
              size="middle"
              defaultValue="all"
              style={{ width: 180 }}
              options={[
                { value: "all", label: "Tất cả giao dịch" },
                { value: "rental", label: "Cho thuê" },
                { value: "return", label: "Trả hàng" },
                { value: "deposit", label: "Đặt cọc" },
              ]}
            />

            <ButtonCommon type="primary" icon={<Download size={16} />}>
              Xuất báo cáo
            </ButtonCommon>
          </Space>
        )}
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24} sm={8}>
          <Card bodyStyle={{ padding: isMobile ? "12px" : "24px" }}>
            <Statistic
              title="Tổng doanh thu"
              value={65700000}
              precision={0}
              valueStyle={{ color: "#3f8600" }}
              prefix={<DollarSign size={16} />}
              suffix="đ"
              formatter={(value) => {
                return `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`
              }}
            />
            <div style={{ marginTop: 8 }}>
              <Text type="success">
                <ArrowUp size={14} style={{ verticalAlign: "middle" }} /> 12.5%
              </Text>
              <Text type="secondary" style={{ marginLeft: 8, fontSize: isMobile ? "12px" : "14px" }}>
                So với tháng trước
              </Text>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={8}>
          <Card bodyStyle={{ padding: isMobile ? "12px" : "24px" }}>
            <Statistic
              title="Tổng giao dịch"
              value={158}
              valueStyle={{ color: "#1890ff" }}
              prefix={<CreditCard size={16} />}
            />
            <div style={{ marginTop: 8 }}>
              <Text type="success">
                <ArrowUp size={14} style={{ verticalAlign: "middle" }} /> 8.2%
              </Text>
              <Text type="secondary" style={{ marginLeft: 8, fontSize: isMobile ? "12px" : "14px" }}>
                So với tháng trước
              </Text>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={8}>
          <Card bodyStyle={{ padding: isMobile ? "12px" : "24px" }}>
            <Statistic
              title="Khách hàng mới"
              value={24}
              valueStyle={{ color: "#cf1322" }}
              prefix={<User size={16} />}
            />
            <div style={{ marginTop: 8 }}>
              <Text type="danger">
                <ArrowDown size={14} style={{ verticalAlign: "middle" }} /> 3.1%
              </Text>
              <Text type="secondary" style={{ marginLeft: 8, fontSize: isMobile ? "12px" : "14px" }}>
                So với tháng trước
              </Text>
            </div>
          </Card>
        </Col>
      </Row>

      <Tabs defaultActiveKey="overview" style={{ marginBottom: "24px" }} size={isMobile ? "small" : "middle"}>
        <TabPane tab="Tổng quan" key="overview">
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card title="Doanh thu theo tháng" bodyStyle={{ padding: isMobile ? "8px" : "24px" }}>
                <div style={{ width: "100%", height: chartHeight }}>
                  <ResponsiveContainer>
                    <AreaChart
                      data={revenueData}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        name="Doanh thu"
                        stroke="#8884d8"
                        fill="#8884d8"
                        fillOpacity={0.3}
                      />
                      <Line type="monotone" dataKey="transactions" name="Giao dịch" stroke="#82ca9d" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card title="Phân loại sản phẩm" bodyStyle={{ padding: isMobile ? "8px" : "24px" }}>
                <div style={{ width: "100%", height: chartHeight }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={!isMobile}
                        outerRadius={isMobile ? 80 : 120}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={isMobile ? undefined : ({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip content={<PieTooltip />} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="Sản phẩm" key="products">
          <Card title="Sản phẩm được thuê nhiều nhất" bodyStyle={{ padding: isMobile ? "8px" : "24px" }}>
            <div style={{ width: "100%", height: isMobile ? 300 : 400 }}>
              <ResponsiveContainer>
                <BarChart
                  layout="vertical"
                  data={isMobile ? topProductsData.slice(0, 5) : topProductsData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: isMobile ? 100 : 150,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={isMobile ? 100 : 150}
                    tick={{ fontSize: isMobile ? 10 : 12 }}
                  />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" name="Số lần thuê" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            {isMobile && topProductsData.length > 5 && (
              <div style={{ textAlign: "center", marginTop: "12px" }}>
                <Text type="secondary">Hiển thị 5/{topProductsData.length} sản phẩm</Text>
              </div>
            )}
          </Card>
        </TabPane>

        <TabPane tab="Khách hàng" key="customers">
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card title="Khách hàng thân thiết" bodyStyle={{ padding: isMobile ? "8px" : "24px" }}>
                <Table
                  columns={topCustomersColumns}
                  dataSource={topCustomersData}
                  pagination={false}
                  size={isMobile ? "small" : "middle"}
                  scroll={{ x: isMobile ? 500 : undefined }}
                />
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card title="Phân bố khách hàng" bodyStyle={{ padding: isMobile ? "8px" : "24px" }}>
                <div style={{ width: "100%", height: isMobile ? 250 : 300 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={customerDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={!isMobile}
                        outerRadius={isMobile ? 70 : 100}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={isMobile ? undefined : ({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {customerDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip content={<PieTooltip />} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>

      <Card title="Giao dịch gần đây" bodyStyle={{ padding: isMobile ? "8px" : "24px" }}>
        <Table
          columns={isMobile ? mobileTransactionColumns : transactionColumns as any}
          dataSource={transactionData}
          pagination={{ pageSize: 5, size: isMobile ? "small" : "default" }}
          scroll={{ x: screens.xxl ? 800 : 320 }}
          sticky
          size={isMobile ? "small" : "middle"}
        />
      </Card>

      {renderFilterDrawer()}
    </div>
  )
}

