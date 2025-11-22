import React, { useState } from 'react';
import { Form, Input, InputNumber, Button, Upload, notification } from 'antd';
import { UploadOutlined, UserOutlined, FileTextOutlined } from '@ant-design/icons';
// Import file CSS
import './FinalReport.css'; 
// Import API client của bạn
import finalReportApi from '../../API/FinalReportAPI'; 

const FinalReportPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    
    const formData = new FormData();

    // Thêm các trường dữ liệu text/number
    formData.append("userId", String(values.userId));
    formData.append("jobPositionId", String(values.jobPositionId));
    formData.append("semesterId", String(values.semesterId));
    formData.append("studentReportText", values.studentReportText);
    formData.append("companyFeedback", values.companyFeedback);
    formData.append("companyRating", String(values.companyRating));
    formData.append("companyEvaluator", values.companyEvaluator);

    // Thêm file
    const file = values.studentReportFile?.[0]?.originFileObj;
    if (file) {
      formData.append("studentReportFile", file, file.name); 
    }

    try {
      await finalReportApi.create(formData);

      notification.success({
        message: 'Gửi Thành Công',
        description: 'Báo cáo cuối kỳ đã được gửi thành công.',
        placement: 'topRight',
      });
      form.resetFields();
      
    } catch (error) {
      console.error('Lỗi khi gửi API:', error.response || error.message);
      
      const errorMessage = error.response?.data?.message || 'Lỗi: Không thể kết nối hoặc gửi dữ liệu thất bại.';

      notification.error({
        message: 'Gửi Báo Cáo Thất Bại',
        description: errorMessage,
        placement: 'topRight',
      });
    } finally {
      setLoading(false);
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <div className="final-report-container">
      <h2 className="final-report-header"><FileTextOutlined /> Báo Cáo Cuối Kỳ Thực Tập</h2>
      <Form
        form={form}
        name="final_report_form"
        onFinish={onFinish}
        layout="vertical"
        initialValues={{ companyRating: 0 }}
      >
        
        {/* Thông tin Định danh */}
        <div className="form-grid-3">
          <Form.Item label="ID Người Dùng" name="userId" rules={[{ required: true, message: 'Vui lòng nhập ID người dùng!' }]}>
            <InputNumber min={0} className="full-width" placeholder="User ID" />
          </Form.Item>
          
          <Form.Item label="ID Vị Trí Công Việc" name="jobPositionId" rules={[{ required: true, message: 'Vui lòng nhập ID vị trí!' }]}>
            <InputNumber min={0} className="full-width" placeholder="Job ID" />
          </Form.Item>

          <Form.Item label="ID Học Kỳ" name="semesterId" rules={[{ required: true, message: 'Vui lòng nhập ID học kỳ!' }]}>
            <InputNumber min={0} className="full-width" placeholder="Semester ID" />
          </Form.Item>
        </div>

        {/* Báo cáo của Sinh viên */}
        <Form.Item label="Nội Dung Báo Cáo (Tóm tắt)" name="studentReportText" rules={[{ required: true, message: 'Vui lòng nhập nội dung báo cáo!' }]}>
          <Input.TextArea rows={4} placeholder="Mô tả công việc, kết quả đạt được, và kinh nghiệm học hỏi..." />
        </Form.Item>

        <Form.Item
          label="Tải Lên File Báo Cáo (*.pdf, *.docx)"
          name="studentReportFile"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: 'Vui lòng tải lên file báo cáo!' }]}
        >
          <Upload name="file" listType="text" maxCount={1} beforeUpload={() => false} accept=".pdf,.doc,.docx"> 
            <Button icon={<UploadOutlined />}>Chọn File Báo Cáo (Chỉ 1 file)</Button>
          </Upload>
        </Form.Item>

        {/* Phản hồi của Công ty */}
        <Form.Item label="Phản Hồi/Nhận Xét Từ Công Ty" name="companyFeedback" rules={[{ required: true, message: 'Vui lòng nhập phản hồi!' }]}>
          <Input.TextArea rows={4} placeholder="Nhận xét của người hướng dẫn tại công ty..." />
        </Form.Item>

        <div className="form-grid-2">
            <Form.Item label="Đánh Giá Công Ty (Thang 10)" name="companyRating" rules={[{ required: true, message: 'Vui lòng nhập điểm đánh giá!' }]}>
                <InputNumber min={0} max={10} step={0.1} className="full-width" placeholder="Nhập điểm từ 0 đến 10" />
            </Form.Item>

            <Form.Item label="Người Đánh Giá (Công Ty)" name="companyEvaluator" rules={[{ required: true, message: 'Vui lòng nhập tên người đánh giá!' }]}>
                <Input prefix={<UserOutlined />} placeholder="Ví dụ: Nguyễn Văn A - Trưởng phòng Kỹ thuật" />
            </Form.Item>
        </div>

        {/* Nút Submit */}
        <Form.Item className="submit-group">
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loading} 
            className="submit-button"
          >
            {loading ? 'Đang Gửi Dữ Liệu...' : 'Xác Nhận & Gửi Báo Cáo'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FinalReportPage;