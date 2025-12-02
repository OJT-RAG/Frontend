import React, { useState } from 'react';
import { Form, Input, InputNumber, Button, Upload, notification } from 'antd';
import { UploadOutlined, UserOutlined, FileTextOutlined } from '@ant-design/icons';
import finalReportApi from '../../API/FinalReportAPI';
import './FinalReport.css';

const FinalReportPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Chuẩn hóa file list cho AntD Form
  const normFile = (e) => e?.fileList || [];

  const onFinish = async (values) => {
    if (!values.studentReportFile || values.studentReportFile.length === 0) {
      notification.error({ message: 'Vui lòng chọn file trước khi gửi!' });
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      // Các trường dữ liệu
      formData.append("userId", String(values.userId));
      formData.append("jobPositionId", String(values.jobPositionId));
      formData.append("semesterId", String(values.semesterId));
      formData.append("studentReportText", values.studentReportText);
      formData.append("companyFeedback", values.companyFeedback);
      formData.append("companyRating", String(values.companyRating));
      formData.append("companyEvaluator", values.companyEvaluator);

      // File
      const fileObj = values.studentReportFile[0].originFileObj;
      formData.append("studentReportFile", fileObj, fileObj.name);

      // Gọi API
      await finalReportApi.create(formData);

      notification.success({
        message: 'Gửi Thành Công',
        description: 'Báo cáo cuối kỳ đã được gửi thành công!',
      });

      form.resetFields();
    } catch (error) {
      console.error('Lỗi API:', error.response || error.message);
      notification.error({
        message: 'Gửi Báo Cáo Thất Bại',
        description: error.response?.data?.message || 'Không thể gửi dữ liệu',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="final-report-container">
      <h2 className="final-report-header">
        <FileTextOutlined /> Báo Cáo Cuối Kỳ Thực Tập
      </h2>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ companyRating: 0 }}
      >
        <div className="form-grid-3">
          <Form.Item
            label="ID Người Dùng"
            name="userId"
            rules={[{ required: true, message: 'Vui lòng nhập ID người dùng!' }]}
          >
            <InputNumber min={0} className="full-width" placeholder="User ID" />
          </Form.Item>

          <Form.Item
            label="ID Vị Trí Công Việc"
            name="jobPositionId"
            rules={[{ required: true, message: 'Vui lòng nhập ID vị trí!' }]}
          >
            <InputNumber min={0} className="full-width" placeholder="Job ID" />
          </Form.Item>

          <Form.Item
            label="ID Học Kỳ"
            name="semesterId"
            rules={[{ required: true, message: 'Vui lòng nhập ID học kỳ!' }]}
          >
            <InputNumber min={0} className="full-width" placeholder="Semester ID" />
          </Form.Item>
        </div>

        <Form.Item
          label="Nội Dung Báo Cáo (Tóm tắt)"
          name="studentReportText"
          rules={[{ required: true, message: 'Vui lòng nhập nội dung báo cáo!' }]}
        >
          <Input.TextArea rows={4} placeholder="Mô tả công việc, kết quả đạt được..." />
        </Form.Item>

        <Form.Item
          label="Tải Lên File Báo Cáo (*.pdf, *.doc, *.docx)"
          name="studentReportFile"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: 'Vui lòng tải lên file báo cáo!' }]}
        >
          <Upload
            listType="text"
            maxCount={1}
            beforeUpload={() => false} // Prevent auto upload
            accept=".pdf,.doc,.docx"
          >
            <Button icon={<UploadOutlined />}>Chọn File</Button>
          </Upload>
        </Form.Item>

        <div className="form-grid-2">
          <Form.Item
            label="Đánh Giá Công Ty (Thang 10)"
            name="companyRating"
            rules={[{ required: true, message: 'Vui lòng nhập điểm đánh giá!' }]}
          >
            <InputNumber min={0} max={10} step={0.1} className="full-width" />
          </Form.Item>

          <Form.Item
            label="Người Đánh Giá (Công Ty)"
            name="companyEvaluator"
            rules={[{ required: true, message: 'Vui lòng nhập tên người đánh giá!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Ví dụ: Nguyễn Văn A" />
          </Form.Item>
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            {loading ? 'Đang Gửi...' : 'Xác Nhận & Gửi Báo Cáo'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FinalReportPage;
