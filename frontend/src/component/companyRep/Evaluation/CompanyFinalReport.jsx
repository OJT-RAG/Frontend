import React, { useState } from "react";
import "./CompanyFinalReport.css";
import Report from "../../assets/Bao_Cao_Mau_AI_Generated.pdf";

export default function CompanyFinalReport() {
  const [rating, setRating] = useState("");
  const [feedback, setFeedback] = useState("");
  const [evaluator, setEvaluator] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      companyRating: Number(rating),
      companyFeedback: feedback,
      companyEvaluator: evaluator,
      studentReportFile: Report
    };

    console.log("Submit payload:", payload);

    // TODO: Gọi API update FinalReport
  };

  return (
    <div className="report-container">
      <h2 className="title">Chấm điểm Final Report</h2>

      {/* KHU VỰC HIỂN THỊ FILE */}
      <div className="file-section">
        <label className="file-label">Tệp báo cáo của sinh viên:</label>

        <div className="file-view">
          <p className="file-name">{Report.split("/").pop()}</p>

          {/* Nút xem PDF */}
          <a
            href={Report}
            target="_blank"
            rel="noopener noreferrer"
            className="view-btn"
          >
            Xem báo cáo
          </a>

          {/* Nút tải xuống */}
          <a
            href={Report}
            download
            className="download-btn"
          >
            Tải xuống
          </a>
        </div>
      </div>

      {/* FORM ĐÁNH GIÁ */}
      <form className="report-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Điểm (1 - 5):</label>
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="select-input"
            required
          >
            <option value="">Chọn điểm</option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Người chấm:</label>
          <input
            type="text"
            value={evaluator}
            onChange={(e) => setEvaluator(e.target.value)}
            className="text-input"
            placeholder="Nhập tên người chấm"
            required
          />
        </div>

        <div className="form-group">
          <label>Nhận xét của công ty:</label>
          <textarea
            className="textarea-input"
            rows="5"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Nhập nhận xét..."
          />
        </div>

        <button type="submit" className="submit-btn">
          Gửi đánh giá
        </button>
      </form>
    </div>
  );
}
