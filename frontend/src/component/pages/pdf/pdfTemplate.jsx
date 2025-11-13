import React from 'react';


const PdfTemplate = () => {
  return (
    // ID này RẤT quan trọng. Nó là mục tiêu mà html2canvas sẽ chụp lại.
    <div id="pdf-content" className="pdf-document"> 
      <header className="pdf-header">
        <h1>BÁO CÁO KẾT QUẢ KINH DOANH</h1>
        <p>Tháng 11 năm 2025</p>
        <p>Người lập: Trợ lý AI Gemini</p>
      </header>

      <section className="summary">
        <h2>📊 Tóm tắt Tổng thể</h2>
        <p>Hiệu suất trong tháng 11 vượt trội, đạt **105%** so với dự kiến. Sự tăng trưởng mạnh mẽ nhất đến từ khu vực Châu Á Thái Bình Dương, chiếm 45% tổng doanh thu.</p>
      </section>

      <section className="details">
        <h2>📋 Chi tiết Dữ liệu</h2>
        <table>
          <thead>
            <tr>
              <th>Hạng mục</th>
              <th>Mục tiêu (VND)</th>
              <th>Thực hiện (VND)</th>
              <th>Tỷ lệ (%)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Doanh thu Ròng</td>
              <td>1,000,000,000</td>
              <td>1,050,000,000</td>
              <td>105%</td>
            </tr>
            <tr>
              <td>Lợi nhuận Gộp</td>
              <td>400,000,000</td>
              <td>425,000,000</td>
              <td>106%</td>
            </tr>
            <tr>
              <td>Chi phí Vận hành</td>
              <td>150,000,000</td>
              <td>145,000,000</td>
              <td>96.7%</td>
            </tr>
          </tbody>
        </table>
      </section>
      
      <section className="notes">
          <h2>📝 Ghi chú</h2>
          <ul>
              <li>Cần theo dõi chi phí marketing trong quý tới.</li>
              <li>Đẩy mạnh chiến dịch sản phẩm mới.</li>
          </ul>
      </section>

      <footer className="pdf-footer">
        <p>--- Tài liệu này được tạo tự động bởi hệ thống báo cáo. ---</p>
      </footer>
    </div>
  );
};

export default PdfTemplate;