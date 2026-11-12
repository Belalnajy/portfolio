# إعداد EmailJS - خطوات سريعة 🚀

## الخطوات المطلوبة:

### 1️⃣ إنشاء حساب
- روح على https://www.emailjs.com/
- سجل حساب جديد

### 2️⃣ إضافة Gmail Service
1. Email Services → Add New Service
2. اختر Gmail
3. حط البيانات دي:
   - Gmail: `belalnajy9@gmail.com`
   - App Password: `svzj ibbf gscc hxll`
4. احفظ الـ **Service ID**

### 3️⃣ إنشاء Template
1. Email Templates → Create New Template
2. Subject: `New Message from {{name}} - Portfolio Contact`
3. اضغط Edit HTML وحط الكود من ملف `EMAILJS_SETUP.md`
4. في Settings:
   - To Email: `belalnajy9@gmail.com`
   - Reply To: `{{email}}`
5. احفظ الـ **Template ID**

### 4️⃣ نسخ Public Key
- Account → General
- انسخ الـ **Public Key**

### 5️⃣ تحديث .env
افتح ملف `.env` وحط القيم:
```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

### 6️⃣ اختبار
```bash
npm run dev
```
افتح الموقع وجرب الفورم!

---

## معلومات مهمة:
- ✅ App Password جاهز: `svzj ibbf gscc hxll`
- ✅ الإيميل: `belalnajy9@gmail.com`
- ✅ الفورم هيبعت notification لما الرسالة تتبعت
- ✅ لو في مشكلة، شوف EmailJS Dashboard → Logs

## للـ Deployment على Vercel:
1. Vercel Dashboard → Settings → Environment Variables
2. أضف الـ 3 متغيرات:
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
3. Redeploy

---

## 📧 شكل الإيميل اللي هيوصلك:

### التصميم الاحترافي يشمل:
- 📬 **Header بـ Gradient** أزرق/بنفسجي جميل
- ⚡ **Alert Banner** يلفت انتباهك
- 👤 **بطاقة المرسل** مع أيقونة دائرية
- 💬 **صندوق الرسالة** منسق وواضح
- 📧 **زر Reply مباشر** للرد بسرعة
- 📱 **Responsive** على كل الأجهزة

```
┌─────────────────────────────────────────┐
│     📬 New Portfolio Message            │
│  You have received a new message        │
└─────────────────────────────────────────┘

⚡ Action Required: A visitor has contacted you.

┌─────────────────────────────────────────┐
│ 👤  Ahmed Ali                           │
│     📧 ahmed@example.com                │
└─────────────────────────────────────────┘

💬 MESSAGE:
مرحباً بلال، أنا مهتم بالتعاون معك...

        [📧 Reply to Ahmed Ali]
```

---

✨ **جاهز! الفورم دلوقتي هيبعت على الإيميل بتاعك مباشرة**

### الـ Template ده احترافي وهيخلي:
✅ الرسائل واضحة وسهل تقراها  
✅ تقدر ترد بسرعة من زر واحد  
✅ الإيميل يبان professional جداً  
✅ يشتغل على Gmail, Outlook, Apple Mail
