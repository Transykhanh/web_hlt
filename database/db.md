# Database mẫu – Website học lập trình

Dữ liệu seed cho MongoDB, định dạng Extended JSON (`$oid`, `$date`) nên `mongoimport` giữ đúng kiểu ObjectId/Date.

| File | Collection | Số bản ghi |
|---|---|---|
| users.json | users | 5 (1 admin, 4 student – 1 bị khóa) |
| categories.json | categories | 5 |
| courses.json | courses | 6 (2 miễn phí, 3 trả phí, 1 draft) |
| chapters.json | chapters | 11 |
| lessons.json | lessons | 33 (isPreview = true ở bài đầu mỗi khóa) |
| orders.json | orders | 6 (paid / pending / expired / cancelled) |
| payments.json | payments | 4 (3 success, 1 failed) |
| enrollments.json | enrollments | 8 (có 1 cancelled) |
| quizzes.json / questions.json | quizzes / questions | 5 / 15 (single_choice, multiple, true_false) |
| quiz_results.json | quiz_results | 7 (có attempt, passed) |
| reviews.json | reviews | 5 |
| lesson_progress.json | lesson_progress | 22 |
| _indexes.json | (mô tả index cần tạo) | 16 |

Tài khoản demo (mật khẩu chung `Password@123`, đã hash bcrypt):
`admin@codelearn.vn` (admin), `an.nguyen@example.com`, `binh.tran@example.com`, `cuong.le@example.com` (student), `dung.pham@example.com` (student, locked).

Import: `MONGO_URI="mongodb://localhost:27017/learncode" ./import.sh`

Lưu ý: `qrToken` trong orders là chuỗi ngẫu nhiên mẫu; đơn `pending` có `expiresAt` cố định nên sẽ hết hạn sau khi seed – tạo đơn mới để thử luồng QR.

Bản 1.1: thêm slug/isDeleted/studentCount (courses), attachments (lessons), passScore/timeLimit/maxAttempts (quizzes), type/points (questions), attempt/passed (quiz_results), failReason (payments), completedAt (enrollments), avatar/lastLoginAt (users), collection reviews và các index mới.
