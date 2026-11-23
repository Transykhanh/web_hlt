# Website Học Lập Trình (web_hlt)

Backend API cho website học lập trình, xây dựng bằng Node.js, Express và MongoDB. Dự án hiện cung cấp API trang chủ và xác thực tài khoản; dữ liệu mẫu MongoDB nằm trong thư mục `database/`.

## Công nghệ

- Node.js và npm
- Express 5, Mongoose
- MongoDB
- `dotenv` để đọc cấu hình môi trường

## Yêu cầu

Cài đặt Node.js (kèm npm) và chạy MongoDB trên máy hoặc chuẩn bị một MongoDB connection string. Nếu dùng MongoDB Atlas, hãy tạo database và cho phép máy của bạn kết nối trong phần Network Access.

## Chạy dự án lần đầu

1. Clone repository và vào thư mục dự án:

   ```bash
   git clone https://github.com/Transykhanh/web_hlt.git
   cd web_hlt
   ```

2. Tạo file `backend/.env` (không đưa file này lên GitHub):

   ```env
   PORT=3000
   MONGO_URI=mongodb://127.0.0.1:27017/learncode
   ```

   Thay `MONGO_URI` bằng connection string của MongoDB nếu không chạy MongoDB cục bộ.

3. Cài dependencies và khởi động backend:

   ```bash
   cd backend
   npm install
   npm run dev
   ```

   Chạy `npm start` thay cho `npm run dev` khi muốn khởi động không dùng nodemon.

4. Kiểm tra server tại <http://localhost:3000/>. Kết quả mong đợi là JSON báo API đang hoạt động. Backend kết nối MongoDB khi khởi động; cần cấu hình `MONGO_URI` hợp lệ trước khi chạy.

## Cập nhật dự án sau khi đã clone (pull)

Mở terminal tại thư mục `web_hlt`:

```bash
git pull origin main
cd backend
npm install
npm run dev
```

`npm install` giúp đồng bộ dependencies nếu phiên bản mới có thay đổi. Giữ file `backend/.env` trên máy cá nhân; Git bỏ qua file này.

## API hiện có

| Method | Endpoint | Mô tả |
|---|---|---|
| `GET` | `/` | Kiểm tra trạng thái API |
| `GET` | `/api/home` | Lấy dữ liệu trang chủ |
| `POST` | `/auth/register` | Đăng ký tài khoản |
| `POST` | `/auth/login` | Đăng nhập |

Các endpoint đăng ký và đăng nhập nhận JSON. Ví dụ:

```json
{
  "email": "student@example.com",
  "password": "your-password"
}
```

## Dữ liệu mẫu MongoDB (tùy chọn)

Các file JSON seed và mô tả dữ liệu nằm trong `database/`. Nếu đã cài MongoDB Database Tools (`mongoimport`), từ thư mục `database` có thể import dữ liệu vào database `learncode`:

```bash
MONGO_URI="mongodb://127.0.0.1:27017/learncode" ./import.sh
```

Trong Windows PowerShell có thể chạy từng collection, ví dụ:

```powershell
mongoimport --uri "mongodb://127.0.0.1:27017/learncode" --collection courses --file courses.json --jsonArray --drop
```

Chạy lệnh tương tự cho các file collection khác trong `database/`. Tùy chọn `--drop` xóa collection hiện tại trước khi import; chỉ dùng trên database phù hợp. Chi tiết dữ liệu mẫu và tài khoản demo được ghi trong [`database/db.md`](database/db.md). Tài khoản và mật khẩu trong seed chỉ dành cho môi trường demo.

## Cấu trúc thư mục

```text
web_hlt/
├── backend/
│   ├── src/
│   │   ├── config/       # Kết nối MongoDB
│   │   ├── controllers/  # Xử lý nghiệp vụ API
│   │   ├── models/       # Mongoose models
│   │   └── routes/       # Khai báo endpoint
│   ├── .env              # Cấu hình cục bộ, không commit
│   ├── package.json
│   └── server.js
└── database/             # JSON seed và hướng dẫn dữ liệu
```

## Đưa thay đổi lên GitHub

Sau khi cập nhật mã nguồn, từ thư mục dự án:

```bash
git add .
git commit -m "Mô tả thay đổi"
git push origin main
```

Không commit `backend/.env` hoặc `backend/node_modules/`. File `.gitignore` trong backend đã loại trừ các mục này.
