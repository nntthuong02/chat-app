# Ứng dụng Chat Realtime

## Mô tả

Đây là một ứng dụng chat realtime hoàn chỉnh, được xây dựng bằng ReactJS cho phía client, Node.js và Socket.io cho phía server, cùng với MongoDB để lưu trữ dữ liệu người dùng và tin nhắn.

## Chức năng

- **Đăng nhập và Đăng ký:** Người dùng có thể đăng nhập bằng tài khoản hiện có hoặc tạo mới một tài khoản để sử dụng ứng dụng.

- **Chat 1-1 và Nhóm:** Gửi và nhận tin nhắn ngay lập tức với người dùng khác trong chế độ 1-1 hoặc tham gia vào các nhóm chát.

- **Cuộc Gọi Video:** Thực hiện cuộc gọi video với người dùng khác và trải nghiệm giao tiếp trực tuyến.

- **Tạo Nhóm:** Người dùng có thể tạo nhóm chát, mời người khác tham gia và chia sẻ thông tin trong nhóm.

- **Gửi File:** Chia sẻ file với người khác trong cuộc trò chuyện.

- **Tùy Chỉnh Giao Diện:** Tính năng tùy chỉnh giao diện để người dùng có thể điều chỉnh theo sở thích cá nhân.

## Công nghệ sử dụng

- **Frontend:** Xây dựng bằng ReactJS, sử dụng thư viện [Socket.io-client] để giao tiếp với server.

- **Backend:** Xây dựng bằng Node.js, sử dụng framework [Express](https://expressjs.com/) và thư viện [Socket.io](https://socket.io/) để tạo kết nối realtime.

- **Database:** Sử dụng MongoDB để lưu trữ thông tin người dùng và tin nhắn.

## Cài đặt và Chạy

1. **Clone Repository:**
   ```bash
   git clone https://github.com/your-username/realtime-chat-app.git
   ```
2. **Cài đặt thư viện**
   ```bash
    cd realtime-chat-app
    npm install
   ```
3. **Cấu hình Database**
   ```bash
   Tạo một cơ sở dữ liệu MongoDB và cung cấp URL kết nối trong file và key_Token .env.
   ```
4. **Chạy Ứng dụng**
   ```bash
   npm run dev
   ```

## Tác giả

Ứng dụng được phát triển bởi:

- **[Cao Văn Thiện](https://github.com/CVThien2k2)**
  - [Facebook](https://www.facebook.com/caovanthien09102002/)
