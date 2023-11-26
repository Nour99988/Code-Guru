const express = require("express");
const cookieParser = require("cookie-parser"); // استيراد مكتبة تحليل الكوكيز
const verifyTokenMiddleware = require("./middleware/auth"); // استيراد الميدلوير الخاص بالتحقق
const routes = require("./routes/user");

const app = express();
const PORT = process.env.PORT || 4000;
const connectDB = require("./utils/connectDB");

// توصيل قاعدة البيانات
connectDB();

// إضافة middleware للمعالجة الأساسية
// const express = require("express");
// const app = express();

// Middleware للتعامل مع CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // يمكن تغيير الرمز النجمي (*) بالموقع الذي تقدم فيه النص الأصلي.
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(
  express.urlencoded({
    extended: true,
  })
);

// باقي الكود

app.use(express.json());

app.use(cookieParser()); // استخدام مكتبة تحليل الكوكيز

// إضافة وسيلة التحقق إلى كل طلب
// app.use("/home", verifyTokenMiddleware);

// إضافة مسارات
app.use("/api", routes);

// بدء الخادم
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
