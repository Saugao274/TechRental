"use client"

import { useState } from "react"
import { Typography, Card, Form, Input, Button, Alert, Space, Divider } from "antd"
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle, Key } from "lucide-react"
import Link from "next/link"

const { Title, Text } = Typography

export default function ChangePassword() {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const onFinish = (values: any) => {
    setLoading(true)
    setError("")

    // Giả lập API call
    setTimeout(() => {
      if (values.currentPassword === "123456") {
        setSuccess(true)
        form.resetFields()
      } else {
        setError("Mật khẩu hiện tại không chính xác. Vui lòng thử lại.")
      }
      setLoading(false)
    }, 1500)
  }

  const validateConfirmPassword = (_: any, value: string) => {
    const newPassword = form.getFieldValue("newPassword")
    if (!value || newPassword === value) {
      return Promise.resolve()
    }
    return Promise.reject(new Error("Mật khẩu xác nhận không khớp với mật khẩu mới!"))
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "24px" }}>
        {/* <Key size={24} style={{ marginRight: "12px", color: "#1890ff" }} /> */}
        <p className="text-primary text-2xl font-bold">
          Thay đổi mật khẩu
        </p>
      </div>

      <Card>
        {success && (
          <Alert
            message="Thay đổi mật khẩu thành công"
            description="Mật khẩu của bạn đã được cập nhật. Vui lòng sử dụng mật khẩu mới cho lần đăng nhập tiếp theo."
            type="success"
            showIcon
            icon={<CheckCircle size={16} />}
            style={{ marginBottom: "24px" }}
            closable
            onClose={() => setSuccess(false)}
          />
        )}

        {error && (
          <Alert
            message="Lỗi"
            description={error}
            type="error"
            showIcon
            icon={<AlertCircle size={16} />}
            style={{ marginBottom: "24px" }}
            closable
            onClose={() => setError("")}
          />
        )}

        <Text type="secondary" style={{ display: "block", marginBottom: "24px" }}>
          Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu với người khác.
        </Text>

        <Form form={form} layout="vertical" onFinish={onFinish} requiredMark={false}>
          <Form.Item
            name="currentPassword"
            label="Mật khẩu hiện tại"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu hiện tại!" }]}
          >
            <Input
              prefix={<Lock size={16} style={{ color: "#bfbfbf" }} />}
              type={showCurrentPassword ? "text" : "password"}
              placeholder="Nhập mật khẩu hiện tại"
              suffix={
                <div onClick={() => setShowCurrentPassword(!showCurrentPassword)} style={{ cursor: "pointer" }}>
                  {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </div>
              }
            />
          </Form.Item>

          <Divider />

          <Form.Item
            name="newPassword"
            label="Mật khẩu mới"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu mới!" },
              { min: 8, message: "Mật khẩu phải có ít nhất 8 ký tự!" },
              { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, message: "Mật khẩu phải chứa chữ hoa, chữ thường và số!" },
            ]}
          >
            <Input
              prefix={<Lock size={16} style={{ color: "#bfbfbf" }} />}
              type={showNewPassword ? "text" : "password"}
              placeholder="Nhập mật khẩu mới"
              suffix={
                <div onClick={() => setShowNewPassword(!showNewPassword)} style={{ cursor: "pointer" }}>
                  {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </div>
              }
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Xác nhận mật khẩu mới"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu mới!" },
              { validator: validateConfirmPassword },
            ]}
          >
            <Input
              prefix={<Lock size={16} style={{ color: "#bfbfbf" }} />}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Nhập lại mật khẩu mới"
              suffix={
                <div onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{ cursor: "pointer" }}>
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </div>
              }
            />
          </Form.Item>

          <div style={{ marginTop: "24px" }}>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading}>
                Cập nhật mật khẩu
              </Button>
              <Button>
                <Link href="/trang-ca-nhan">Hủy</Link>
              </Button>
            </Space>
          </div>
        </Form>
      </Card>
    </div>
  )
}

