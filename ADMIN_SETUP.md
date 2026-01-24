# Admin Panel Setup Guide

Bu dokümantasyon, Cervus Labs Admin Panelinin kurulumu ve kullanımı hakkında bilgi içerir.

## Ön Gereksinimler

1. Supabase projesi oluşturulmuş olmalı
2. Supabase proje URL'i ve anon key'e sahip olmalısınız

## Kurulum Adımları

### 1. Environment Variables

Proje kök dizininde `.env.local` dosyası oluşturun ve aşağıdaki değişkenleri ekleyin:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Supabase Storage Bucket Oluşturma

Supabase Dashboard'da Storage bölümüne gidin ve `portfolio-images` adında bir bucket oluşturun:

1. Supabase Dashboard → Storage
2. "New bucket" butonuna tıklayın
3. Bucket name: `portfolio-images`
4. Public bucket: ✅ (işaretleyin)
5. "Create bucket" butonuna tıklayın

### 3. İlk Admin Kullanıcısı Oluşturma

Supabase Dashboard'da Authentication bölümüne gidin:

1. Supabase Dashboard → Authentication → Users
2. "Add user" butonuna tıklayın
3. Email ve password girin
4. "Create user" butonuna tıklayın

**Not:** İlk kullanıcıyı oluşturduktan sonra, email doğrulaması gerekebilir. Development ortamında email doğrulamasını devre dışı bırakabilirsiniz (Settings → Auth → Email Auth → Confirm email: OFF).

### 4. Veritabanı Tablosu

`projects` tablosu otomatik olarak oluşturulmuştur. Tablo yapısı:

- `id` (UUID, Primary Key)
- `title` (Text)
- `category` (Text)
- `year` (Text)
- `description` (Text)
- `slug` (Text, Unique)
- `image_url` (Text)
- `image_alt` (Text, Optional)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

## Kullanım

### Admin Paneline Erişim

1. Tarayıcınızda `/admin` adresine gidin
2. Eğer giriş yapmadıysanız, otomatik olarak `/login` sayfasına yönlendirileceksiniz
3. Oluşturduğunuz admin kullanıcısının email ve password'ü ile giriş yapın

### Proje Ekleme

1. Admin panelinde "Add Project" butonuna tıklayın
2. Formu doldurun:
   - **Title:** Proje başlığı
   - **Slug:** URL-friendly slug (otomatik oluşturulur)
   - **Category:** Proje kategorisi (örn: AUTOMATION, SAAS)
   - **Year:** Proje yılı
   - **Description:** Proje açıklaması
   - **Image:** Proje görseli (max 5MB)
   - **Image Alt Text:** Görsel alt metni (opsiyonel)
3. "Create Project" butonuna tıklayın

### Proje Düzenleme

1. Admin panelindeki tabloda düzenlemek istediğiniz projenin yanındaki "Edit" butonuna tıklayın
2. Formu güncelleyin
3. "Update Project" butonuna tıklayın

### Proje Silme

1. Admin panelindeki tabloda silmek istediğiniz projenin yanındaki "Delete" butonuna tıklayın
2. Onay mesajını kabul edin

## Özellikler

- ✅ Güvenli kimlik doğrulama (Supabase Auth)
- ✅ Proje CRUD işlemleri (Create, Read, Update, Delete)
- ✅ Görsel yükleme (Supabase Storage)
- ✅ Responsive tasarım
- ✅ Dark mode desteği
- ✅ Real-time veri güncelleme
- ✅ Otomatik slug oluşturma
- ✅ Form validasyonu

## Sorun Giderme

### "Failed to upload image" Hatası

- Supabase Storage'da `portfolio-images` bucket'ının oluşturulduğundan emin olun
- Bucket'ın public olduğundan emin olun
- Görsel boyutunun 5MB'dan küçük olduğundan emin olun

### "Authentication failed" Hatası

- Environment variable'ların doğru ayarlandığından emin olun
- Supabase Dashboard'da kullanıcının oluşturulduğundan emin olun
- Email doğrulamasının tamamlandığından emin olun (veya devre dışı bırakın)

### "A project with this slug already exists" Hatası

- Her proje için benzersiz bir slug kullanın
- Mevcut projelerin slug'larını kontrol edin

## Güvenlik Notları

- Admin paneli sadece giriş yapmış kullanıcılar tarafından erişilebilir
- Middleware ile `/admin` rotaları korunmaktadır
- Server Actions ile tüm veritabanı işlemleri güvenli bir şekilde yapılmaktadır
- Görseller Supabase Storage'da güvenli bir şekilde saklanmaktadır
