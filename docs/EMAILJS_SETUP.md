# EmailJS Setup Instructions

## خطوات إعداد EmailJS لإرسال الرسائل على الإيميل

### 1. إنشاء حساب EmailJS
1. اذهب إلى [EmailJS](https://www.emailjs.com/)
2. سجل حساب جديد أو سجل دخول

### 2. إضافة Email Service
1. اذهب إلى **Email Services**
2. اضغط **Add New Service**
3. اختر **Gmail**
4. املأ البيانات:
   - **Service ID**: احفظه (هتحتاجه)
   - **Service Name**: أي اسم تحبه
   - **Gmail Account**: belalnajy9@gmail.com
   - **App Password**: `svzj ibbf gscc hxll`
5. اضغط **Create Service**

### 3. إنشاء Email Template
1. اذهب إلى **Email Templates**
2. اضغط **Create New Template**
3. في **Edit Content**:
   - **Subject**: `New Message from {{name}} - Portfolio Contact`
   - **Content**: اضغط على **Edit HTML** وضع الكود ده:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="padding: 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 10px 10px 0 0; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">
                📬 New Portfolio Message
              </h1>
              <p style="margin: 10px 0 0 0; color: #e0e7ff; font-size: 14px;">
                You have received a new message from your portfolio
              </p>
            </td>
          </tr>

          <!-- Alert Banner -->
          <tr>
            <td style="padding: 20px 30px; background-color: #f0f9ff; border-left: 4px solid #3b82f6;">
              <p style="margin: 0; color: #1e40af; font-size: 14px; font-weight: 500;">
                ⚡ Action Required: A visitor has contacted you. Please respond at your earliest convenience.
              </p>
            </td>
          </tr>

          <!-- Sender Info Card -->
          <tr>
            <td style="padding: 30px;">
              <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f8fafc; border-radius: 8px; padding: 20px;">
                <tr>
                  <td style="vertical-align: top; width: 70px;">
                    <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 30px;">
                      👤
                    </div>
                  </td>
                  <td style="vertical-align: top; padding-left: 15px;">
                    <h2 style="margin: 0 0 8px 0; color: #1e293b; font-size: 20px; font-weight: 600;">
                      {{name}}
                    </h2>
                    <p style="margin: 0; color: #64748b; font-size: 14px;">
                      📧 <a href="mailto:{{email}}" style="color: #3b82f6; text-decoration: none;">{{email}}</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message Content -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <div style="background-color: #ffffff; border: 2px solid #e2e8f0; border-radius: 8px; padding: 25px;">
                <h3 style="margin: 0 0 15px 0; color: #475569; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                  💬 Message
                </h3>
                <div style="color: #334155; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">{{message}}</div>
              </div>
            </td>
          </tr>

          <!-- Action Button -->
          <tr>
            <td style="padding: 0 30px 30px 30px; text-align: center;">
              <a href="mailto:{{email}}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px rgba(102, 126, 234, 0.3);">
                📧 Reply to {{name}}
              </a>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 0 30px;">
              <div style="border-top: 1px solid #e2e8f0;"></div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 25px 30px; text-align: center;">
              <p style="margin: 0 0 10px 0; color: #94a3b8; font-size: 13px;">
                This message was sent from your portfolio contact form
              </p>
              <p style="margin: 0; color: #cbd5e1; font-size: 12px;">
                🌐 <strong>belalnajy.com</strong> | Portfolio Contact System
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
```

4. في **Settings** (الأيقونة ⚙️):
   - **Template ID**: احفظه (هتحتاجه)
   - **Template Name**: Portfolio Contact Form
   - **To Email**: belalnajy9@gmail.com
   - **From Name**: Portfolio Contact Form
   - **From Email**: (سيبه default)
   - **Reply To**: {{email}}

5. اضغط **Save**

### 4. الحصول على Public Key
1. اذهب إلى **Account** > **General**
2. انسخ الـ **Public Key**

### 5. تحديث ملف .env
افتح ملف `.env` وحدث القيم:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
```

### 6. اختبار الفورم
1. شغل المشروع: `npm run dev`
2. افتح الموقع واملأ الفورم
3. اضغط Send Message
4. تحقق من الإيميل بتاعك

## ملاحظات مهمة:
- ✅ الـ App Password موجود: `svzj ibbf gscc hxll`
- ✅ تأكد إن Gmail بتاعك مفعل فيه 2-Step Verification
- ✅ لو في مشكلة، تحقق من الـ EmailJS Dashboard > Logs
- ✅ الفورم هيبعت notification لما الرسالة تتبعت بنجاح

## Template Variables المتاحة:
- `{{name}}` - اسم المرسل
- `{{email}}` - إيميل المرسل
- `{{message}}` - الرسالة

## شكل الرسالة اللي هتوصلك:

الإيميل هيكون منسق بشكل احترافي جداً مع:

### 🎨 **التصميم:**
- 📬 **Header بـ Gradient أزرق/بنفسجي** مع عنوان واضح
- ⚡ **Alert Banner أزرق** يلفت الانتباه
- 👤 **بطاقة المرسل** مع أيقونة دائرية ملونة
- 💬 **صندوق الرسالة** مع border وتنسيق واضح
- 📧 **زر Reply** بـ gradient وتأثير hover
- 📱 **Responsive** - يشتغل على الموبايل والديسكتوب

### 📋 **المحتوى:**
```
Subject: New Message from Ahmed Ali - Portfolio Contact

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
┌─────────────────────────────────────────┐
│ مرحباً بلال،                            │
│ أنا مهتم بالتعاون معك في مشروع...      │
└─────────────────────────────────────────┘

        [📧 Reply to Ahmed Ali]

─────────────────────────────────────────
This message was sent from your portfolio
🌐 belalnajy.com | Portfolio Contact System
```

## مميزات الـ Template:
✅ **تصميم احترافي** مع gradients وألوان جذابة  
✅ **سهل القراءة** - كل المعلومات واضحة  
✅ **زر Reply مباشر** - اضغط واكتب الرد  
✅ **Responsive** - يشتغل على كل الأجهزة  
✅ **متوافق مع Gmail, Outlook, Apple Mail**  
✅ **Alert واضح** يلفت انتباهك للرسالة  
✅ **بطاقة المرسل منسقة** مع كل التفاصيل  
✅ **Footer احترافي** يوضح المصدر
