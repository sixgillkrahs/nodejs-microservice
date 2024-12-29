import { Button } from "react-daisyui";
import { Link } from "react-router-dom";

const NoFoundPage = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1 style={{ fontSize: "100px", margin: 0 }}>404</h1>
      <h2>Trang không tìm thấy</h2>
      <p>Xin lỗi, trang bạn đang tìm kiếm không tồn tại.</p>
      <Link to="/">
        <Button>Trở về trang chủ</Button>
      </Link>
    </div>
  );
};

export default NoFoundPage;
