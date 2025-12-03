import React, { useState } from "react";
import { Form, Input, Button, Upload, notification } from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import finalReportApi from "../../API/FinalReportAPI";

import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

import "./FinalReport.css";

const FinalReportPage = () => {
  const [form] = Form.useForm();
  const [pdfUrl, setPdfUrl] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const layoutPlugin = defaultLayoutPlugin();

  const handleUpload = (info) => {
    const file = info.file.originFileObj;
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPdfUrl(url);
    setPdfFile(file);
  };

  const handleRemove = () => {
    setPdfUrl(null);
    setPdfFile(null);
    form.resetFields();
  };

  const onFinish = async (values) => {
    if (!pdfFile) {
      notification.error({ message: "Vui lòng upload file PDF!" });
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("studentReportText", values.studentReportText);
      formData.append("studentReportFile", pdfFile, pdfFile.name);

      await finalReportApi.create(formData);

      notification.success({ message: "Gửi báo cáo thành công!" });

      handleRemove();
    } catch (err) {
      notification.error({
        message: "Gửi thất bại",
        description: err?.response?.data?.message || "Không thể gửi",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="final-report-wrapper">
      <h2 className="final-report-header">Nộp Báo Cáo Cuối Kỳ</h2>

      <Upload
    beforeUpload={(file) => {
        // Chặn upload tự động
        const url = URL.createObjectURL(file);
        setPdfUrl(url);
        setPdfFile(file);
        return false; // Quan trọng: false = không upload tự động
    }}
    maxCount={1}
    accept=".pdf"
    showUploadList={false}
>
    <Button icon={<UploadOutlined />}>Chọn file PDF</Button>
</Upload>


      {pdfFile && (
        <div className="file-info">
          <span>{pdfFile.name}</span>
          <Button
            type="link"
            icon={<DeleteOutlined />}
            onClick={handleRemove}
          />
        </div>
      )}

      <div className="content-container">
        <div className="left-panel">
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Mô tả / Tóm tắt báo cáo"
              name="studentReportText"
              rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
            >
              <Input.TextArea
                rows={8}
                placeholder="Nhập nội dung báo cáo..."
              />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="submit-btn"
            >
              Gửi Báo Cáo
            </Button>
          </Form>
        </div>

        <div className="right-panel">
          {pdfUrl ? (
            <div className="pdf-viewer">
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                <Viewer key={pdfUrl} fileUrl={pdfUrl} plugins={[layoutPlugin]} />
              </Worker>
            </div>
          ) : (
            <div className="empty-viewer">Chưa có file PDF</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinalReportPage;
