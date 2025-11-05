# 📧 Email Template Documentation

## نظرة عامة
هذا الـ Template مصمم خصيصاً لإرسال رسائل Contact Form بشكل احترافي وجميل.

## 🎨 مكونات التصميم

### 1. **Header (الرأس)**
- Background: Gradient أزرق → بنفسجي
- يحتوي على: 📬 أيقونة + عنوان + وصف
- اللون: أبيض على خلفية ملونة

### 2. **Alert Banner (شريط التنبيه)**
- Background: أزرق فاتح
- Border: أزرق على اليسار (4px)
- يحتوي على: ⚡ أيقونة + نص تنبيه

### 3. **Sender Card (بطاقة المرسل)**
- Background: رمادي فاتح جداً
- يحتوي على:
  - أيقونة دائرية بـ gradient (👤)
  - اسم المرسل (خط عريض)
  - إيميل المرسل (قابل للنقر)

### 4. **Message Box (صندوق الرسالة)**
- Border: رمادي فاتح (2px)
- يحتوي على:
  - عنوان "💬 MESSAGE"
  - نص الرسالة (يحافظ على التنسيق)

### 5. **Reply Button (زر الرد)**
- Background: Gradient أزرق → بنفسجي
- Shadow: ظل ملون
- يفتح: برنامج الإيميل مباشرة للرد

### 6. **Footer (التذييل)**
- نص صغير يوضح المصدر
- اسم الموقع: belalnajy.com

## 🔧 Variables المستخدمة

| Variable | الوصف | مثال |
|----------|-------|------|
| `{{name}}` | اسم المرسل | Ahmed Ali |
| `{{email}}` | إيميل المرسل | ahmed@example.com |
| `{{message}}` | نص الرسالة | مرحباً، أنا مهتم... |

## 📱 Responsive Design

الـ Template متوافق مع:
- ✅ Gmail (Desktop & Mobile)
- ✅ Outlook (Desktop & Web)
- ✅ Apple Mail (Mac & iOS)
- ✅ Yahoo Mail
- ✅ ProtonMail
- ✅ أي Email Client آخر

## 🎯 المميزات

### تصميم احترافي
- Gradients جميلة
- ألوان متناسقة
- Typography واضح

### سهولة الاستخدام
- كل المعلومات واضحة
- زر Reply مباشر
- تنسيق منظم

### متوافق
- يشتغل على كل الأجهزة
- يشتغل على كل برامج الإيميل
- يحافظ على التنسيق

## 📋 كيفية الاستخدام

### في EmailJS:
1. اذهب إلى Email Templates
2. اضغط Create New Template
3. اضغط Edit HTML
4. انسخ محتوى ملف `email-template.html`
5. الصقه في المحرر
6. احفظ

### في الكود:
الـ Variables تتملأ تلقائياً من الفورم:
```javascript
{
  name: "Ahmed Ali",
  email: "ahmed@example.com",
  message: "مرحباً..."
}
```

## 🎨 الألوان المستخدمة

| اللون | الاستخدام | Hex Code |
|-------|-----------|----------|
| أزرق | Primary | #667eea |
| بنفسجي | Secondary | #764ba2 |
| أزرق فاتح | Alert | #3b82f6 |
| رمادي غامق | Text | #1e293b |
| رمادي فاتح | Borders | #e2e8f0 |
| أبيض | Background | #ffffff |

## 📸 Preview

```
┌─────────────────────────────────────────────────┐
│                                                 │
│     📬 New Portfolio Message                    │
│  You have received a new message from your      │
│                  portfolio                      │
│                                                 │
├─────────────────────────────────────────────────┤
│ ⚡ Action Required: A visitor has contacted you │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌──────────────────────────────────────────┐  │
│  │ 👤  Ahmed Ali                            │  │
│  │     📧 ahmed@example.com                 │  │
│  └──────────────────────────────────────────┘  │
│                                                 │
│  ┌──────────────────────────────────────────┐  │
│  │ 💬 MESSAGE                               │  │
│  │                                          │  │
│  │ مرحباً بلال،                             │  │
│  │ أنا مهتم بالتعاون معك في مشروع...       │  │
│  └──────────────────────────────────────────┘  │
│                                                 │
│         [📧 Reply to Ahmed Ali]                 │
│                                                 │
├─────────────────────────────────────────────────┤
│  This message was sent from your portfolio      │
│  🌐 belalnajy.com | Portfolio Contact System    │
└─────────────────────────────────────────────────┘
```

## 🔒 الأمان

- ✅ لا يحتوي على JavaScript
- ✅ لا يحتوي على External Resources
- ✅ كل الـ Styles inline
- ✅ آمن 100%

## 📝 ملاحظات

1. **Subject Line**: يُفضل استخدام:
   ```
   New Message from {{name}} - Portfolio Contact
   ```

2. **Reply To**: يجب ضبطه على:
   ```
   {{email}}
   ```

3. **From Name**: يُفضل:
   ```
   Portfolio Contact Form
   ```

## 🚀 التحسينات المستقبلية

يمكن إضافة:
- [ ] صورة شخصية للمرسل (إذا متوفرة)
- [ ] رقم الهاتف (إذا تم إضافته للفورم)
- [ ] الوقت والتاريخ
- [ ] IP Address (للأمان)
- [ ] Browser & Device Info

---

**تم التصميم بواسطة:** Belal Nagy  
**التاريخ:** 2025  
**الإصدار:** 1.0
