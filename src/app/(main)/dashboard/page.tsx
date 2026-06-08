"use client"
import { Card, Row, Col, Table, Typography, Statistic, Modal, Button, message, Spin } from 'antd';
import dynamic from 'next/dynamic';
import { useEffect, useState, useContext, useRef } from 'react';
import { getRequest } from '@/request';
import { userEndpoint, orderEndpoint } from '@/settings/endpoints';
import SectionCommon from '@/components/core/common/SectionCommon';
import { UserOutlined, ShoppingCartOutlined, CheckCircleOutlined, DollarOutlined, CloseCircleOutlined, RiseOutlined, UserAddOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import AuthContext from '@/context/AuthContext';

const { Title } = Typography;

// @ts-ignore
const Pie: any = dynamic(() => import('@ant-design/charts').then(mod => mod.Pie), { ssr: false });
// @ts-ignore
const Bar: any = dynamic(() => import('@ant-design/charts').then(mod => mod.Bar), { ssr: false });

interface UserWithProducts {
  user: { _id: string; name: string; email: string };
  shopId: string;
  productCount: number;
}
interface CompletedOrder {
  _id: string;
  customerId?: { name?: string };
  products?: { productId?: { title?: string } }[];
  totalPrice?: number;
}

interface User {
  _id: string;
  name: string;
  email: string;
  roles?: string[];
  isActive?: boolean;
}

export default function Dashboard() {
  const [userCount, setUserCount] = useState(0);
  const [usersWithProducts, setUsersWithProducts] = useState<UserWithProducts[]>([]);
  const [completedOrders, setCompletedOrders] = useState<CompletedOrder[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [summary, setSummary] = useState<any>(null);
  const [loadingSummary, setLoadingSummary] = useState(true);
  const router = useRouter();
  const { user, loading } = useContext(AuthContext) || {};
const [isAdmin, setIsAdmin] = useState(true)
  const hasWarned = useRef(false);
  // Kiểm tra quyền admin, nếu không phải thì redirect về home (chỉ 1 lần)
  useEffect(() => {
    if (!loading && user && (!user.roles || !user.roles.includes('admin'))) {
      if (!hasWarned.current) {
        message.warning('Bạn không có quyền truy cập trang này!');
        hasWarned.current = true;
        router.replace('/');
      }
    }
  }, [user, loading, router]);

  // Gọi API thống kê tổng hợp
  async function fetchSummary(setSummary: any, setLoadingSummary: any) {
    setLoadingSummary(true);
    try {
      const res = await getRequest('/api/admin/summary');
      setSummary(res);
    } catch (err) {
      message.error('Không thể tải thống kê tổng hợp!');
    } finally {
      setLoadingSummary(false);
    }
  }

  // Chỉ gọi API khi là admin
  useEffect(() => {
    if (!loading && user && user.roles && user.roles.includes('admin')) {
      getRequest(userEndpoint.COUNT).then(res => setUserCount(res.data.count));
      getRequest(userEndpoint.WITH_PRODUCTS).then(res => setUsersWithProducts(res.data));
      getRequest(orderEndpoint.COMPLETED).then(res => setCompletedOrders(res.data));
      fetchSummary(setSummary, setLoadingSummary);
    }
  }, [user, loading]);

  const productPieData = Array.isArray(usersWithProducts)
    ? usersWithProducts
        .filter(u => u.productCount > 0 && u.user?.name)
        .map(u => ({
          type: u.user.name,
          value: u.productCount,
        }))
    : [];

  const orderBarData = completedOrders?.map(o => ({
    name: o.customerId?.name || 'Không tên',
    value: o.products ? o.products.length : 0,
  }));

  const userColumns = [
    { title: 'Tên', dataIndex: ['user', 'name'] },
    { title: 'Email', dataIndex: ['user', 'email'] },
    { title: 'Số sản phẩm', dataIndex: 'productCount' },
  ];

  const orderColumns = [
    { title: 'Mã đơn', dataIndex: '_id' },
    { title: 'Khách hàng', render: (_: any, r: CompletedOrder) => r.customerId?.name },
    { title: 'Sản phẩm', render: (_: any, r: CompletedOrder) => r.products?.map(p => p.productId?.title).join(', ') },
    { title: 'Tổng tiền', dataIndex: 'totalPrice', render: (value: number) => value ? value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : '' },
  ];

  const handleShowAllUsers = async () => {
    if (!Array.isArray(allUsers) || allUsers.length === 0) {
      const res = await getRequest(userEndpoint.ALL);
      const users = Array.isArray(res.data?.users)
        ? res.data.users
        : (Array.isArray(res.users) ? res.users : []);
      setAllUsers(users);
    }
    setUserModalOpen(true);
  };

  const allUserColumns = [
    { title: 'Tên', dataIndex: 'name', render: (v: string) => v || 'Không rõ' },
    { title: 'Email', dataIndex: 'email', render: (v: string) => v || 'Không rõ' },
    { title: 'Vai trò', dataIndex: 'roles', render: (roles: string[]) => Array.isArray(roles) ? roles.join(', ') : 'user' },
    { title: 'Trạng thái', dataIndex: 'isActive', render: (active: boolean) => active === false ? 'Khoá' : 'Hoạt động' },
  ];

  if (loading) {
    return <Spin size="large" />;
  }

  if (user && (!user.roles || !user.roles.includes('admin'))) {
    return null;
  }

  return (
    <SectionCommon className="flex flex-col items-center gap-12 !pb-4  min-h-screen">
      <Title level={2} style={{ marginTop: 24, fontWeight: 700 }}>Thống kê hệ thống</Title>
      <Row gutter={[24, 24]} className="w-full max-w-5xl">
        {/* Thống kê tổng hợp mới */}
        <Col xs={24} md={6}>
          <Card style={{ borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <Statistic
              title={<span style={{ fontWeight: 500 }}>Tổng doanh thu (30%)</span>}
              value={summary?.totalRevenue || 0}
              valueStyle={{ fontSize: 28, fontWeight: 700, color: '#27ae60' }}
              prefix={<DollarOutlined style={{ color: '#27ae60', fontSize: 24, marginRight: 8 }} />}
              suffix="₫"
              loading={loadingSummary}
            />
          </Card>
        </Col>
        <Col xs={24} md={6}>
          <Card style={{ borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <Statistic
              title={<span style={{ fontWeight: 500 }}>Sản phẩm đang cho thuê</span>}
              value={summary?.productsRented || 0}
              valueStyle={{ fontSize: 28, fontWeight: 700, color: '#1890ff' }}
              prefix={<RiseOutlined style={{ color: '#1890ff', fontSize: 24, marginRight: 8 }} />}
              loading={loadingSummary}
            />
          </Card>
        </Col>
        <Col xs={24} md={6}>
          <Card style={{ borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <Statistic
              title={<span style={{ fontWeight: 500 }}>Đơn hàng bị huỷ</span>}
              value={summary?.ordersCanceled || 0}
              valueStyle={{ fontSize: 28, fontWeight: 700, color: '#e74c3c' }}
              prefix={<CloseCircleOutlined style={{ color: '#e74c3c', fontSize: 24, marginRight: 8 }} />}
              loading={loadingSummary}
            />
          </Card>
        </Col>
        <Col xs={24} md={6}>
          <Card style={{ borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <Statistic
              title={<span style={{ fontWeight: 500 }}>User mới trong tháng</span>}
              value={summary?.newUsersThisMonth || 0}
              valueStyle={{ fontSize: 28, fontWeight: 700, color: '#faad14' }}
              prefix={<UserAddOutlined style={{ color: '#faad14', fontSize: 24, marginRight: 8 }} />}
              loading={loadingSummary}
            />
          </Card>
        </Col>
        <Col xs={24} md={6}>
          <Card style={{ borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <Statistic
              title={<span style={{ fontWeight: 500 }}>Tổng số user</span>}
              value={summary?.totalUsers || 0}
              valueStyle={{ fontSize: 28, fontWeight: 700, color: '#1890ff' }}
              prefix={<UserOutlined style={{ color: '#1890ff', fontSize: 24, marginRight: 8 }} />}
              loading={loadingSummary}
            />
          </Card>
        </Col>
      </Row>

      {/* Các thống kê cũ giữ nguyên */}
      <Row gutter={[24, 24]} className="w-full max-w-5xl">
        <Col xs={24} md={12}>
          <Card title={<b>Phân bố sản phẩm theo tài khoản</b>} style={{ borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            {productPieData && productPieData.length > 0 && productPieData.some(d => d.value > 0) ? (
              <Pie
                data={productPieData}
                angleField="value"
                colorField="type"
                labelField="type"
                radius={0.8}
                label={{
                  formatter: (item: any) => {
                    if (!item || typeof item !== 'object') return '';
                    const name = item.type || 'Không rõ';
                    const total = productPieData.reduce((sum, d) => sum + (d.value ?? 0), 0);
                    const value = item.value ?? 0;
                    const percent = total > 0 ? ((value / total) * 100).toFixed(1) : '0';
                    return `${name} ${percent}%`;
                  }
                }}
              />
            ) : (
              <div style={{ textAlign: 'center', color: '#aaa', padding: 32 }}>Không có dữ liệu</div>
            )}
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title={<b>Số lượng sản phẩm đã thuê theo khách hàng</b>} style={{ borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <Bar
              data={orderBarData}
              xField="value"
              yField="name"
              seriesField="name"
              legend={false}
              style={{ minHeight: 300 }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]} className="w-full max-w-5xl">
        <Col xs={24}>
          <Card title={<b>Tài khoản có sản phẩm</b>} style={{ borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <Table dataSource={usersWithProducts} columns={userColumns} rowKey={r => r.user?._id} pagination={{ pageSize: 5 }} />
          </Card>
        </Col>
        <Col xs={24}>
          <Card title={<b>Đơn hàng đã hoàn thành</b>} style={{ borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <Table dataSource={completedOrders} columns={orderColumns} rowKey="_id" pagination={{ pageSize: 5 }} />
          </Card>
        </Col>
      </Row>

      <Modal
        open={userModalOpen}
        onCancel={() => setUserModalOpen(false)}
        title="Danh sách tất cả tài khoản"
        footer={null}
        width={700}
      >
        <Table
          dataSource={allUsers}
          columns={allUserColumns}
          rowKey={r => r._id || Math.random()}
          pagination={{ pageSize: 8 }}
        />
      </Modal>
    </SectionCommon>
  );
} 