"use client"
import { Card, Row, Col, Table, Typography, Statistic, Modal, Button } from 'antd';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { getRequest } from '@/request';
import { userEndpoint, orderEndpoint } from '@/settings/endpoints';
import SectionCommon from '@/components/core/common/SectionCommon';
import { UserOutlined, ShoppingCartOutlined, CheckCircleOutlined } from '@ant-design/icons';

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

  useEffect(() => {
    getRequest(userEndpoint.COUNT).then(res => setUserCount(res.data.count));
    getRequest(userEndpoint.WITH_PRODUCTS).then(res => setUsersWithProducts(res.data));
    getRequest(orderEndpoint.COMPLETED).then(res => setCompletedOrders(res.data));
  }, []);

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
      console.log('API response:', res);
      const users = Array.isArray(res.data?.users)
        ? res.data.users
        : (Array.isArray(res.users) ? res.users : []);
      setAllUsers(users);
      console.log('All users:', users);
    }
    setUserModalOpen(true);
  };

  const allUserColumns = [
    { title: 'Tên', dataIndex: 'name', render: (v: string) => v || 'Không rõ' },
    { title: 'Email', dataIndex: 'email', render: (v: string) => v || 'Không rõ' },
    { title: 'Vai trò', dataIndex: 'roles', render: (roles: string[]) => Array.isArray(roles) ? roles.join(', ') : 'user' },
    { title: 'Trạng thái', dataIndex: 'isActive', render: (active: boolean) => active === false ? 'Khoá' : 'Hoạt động' },
  ];

  return (
    <SectionCommon className="flex flex-col items-center gap-12 !pb-4 bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen">
      <Title level={2} style={{ marginTop: 24, fontWeight: 700 }}>Thống kê hệ thống</Title>
      <Row gutter={[24, 24]} className="w-full max-w-5xl">
        <Col xs={24} md={8}>
          <Card
            style={{ borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)', cursor: 'pointer' }}
            onClick={handleShowAllUsers}
            hoverable
          >
            <Statistic
              title={<span style={{ fontWeight: 500 }}>Tổng số tài khoản</span>}
              value={userCount}
              valueStyle={{ fontSize: 32, fontWeight: 700 }}
              prefix={<UserOutlined style={{ color: '#1890ff', fontSize: 28, marginRight: 8 }} />}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card style={{ borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <Statistic
              title={<span style={{ fontWeight: 500 }}>Tài khoản có sản phẩm</span>}
              value={usersWithProducts?.length}
              valueStyle={{ fontSize: 32, fontWeight: 700 }}
              prefix={<ShoppingCartOutlined style={{ color: '#52c41a', fontSize: 28, marginRight: 8 }} />}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card style={{ borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <Statistic
              title={<span style={{ fontWeight: 500 }}>Đơn hàng đã hoàn thành</span>}
              value={completedOrders?.length}
              valueStyle={{ fontSize: 32, fontWeight: 700 }}
              prefix={<CheckCircleOutlined style={{ color: '#faad14', fontSize: 28, marginRight: 8 }} />}
            />
          </Card>
        </Col>
      </Row>

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