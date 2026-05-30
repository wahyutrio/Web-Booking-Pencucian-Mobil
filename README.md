# 🚗 Cuci Kinclong — Aplikasi Booking Cuci Mobil

Aplikasi web booking cuci mobil lengkap berbasis Laravel 11, Tailwind CSS, Alpine.js, dan Midtrans payment gateway.

## Tech Stack

- **Backend:** Laravel 11 (PHP 8.2+)
- **Frontend:** Blade + Tailwind CSS v3 + Alpine.js
- **Database:** MySQL
- **Payment:** Midtrans Snap
- **QR Code:** simplesoftwareio/simple-qrcode
- **PDF:** barryvdh/laravel-dompdf
- **WA Notifikasi:** Fonnte API (opsional)

---

## Persyaratan Sistem

- PHP >= 8.2
- Composer
- Node.js >= 18 & npm
- MySQL 8+
- PHP Extensions: GD, mbstring, openssl, pdo_mysql

---

## Instalasi

### 1. Clone & Install Dependencies

```bash
git clone <repo-url> cucikinclong
cd cucikinclong
composer install
npm install
```

### 2. Konfigurasi Environment

```bash
cp .env.example .env
php artisan key:generate
```

Edit file `.env`:

```env
APP_NAME="Cuci Kinclong"
APP_URL=https://royalgloss.web.id

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=royalgloss
DB_USERNAME=root
DB_PASSWORD=your_password

# Midtrans
MIDTRANS_SERVER_KEY=SB-Mid-server-xxxxxxxxxxxx
MIDTRANS_CLIENT_KEY=SB-Mid-client-xxxxxxxxxxxx
MIDTRANS_IS_PRODUCTION=false

# WhatsApp via Fonnte (opsional)
FONNTE_API_KEY=your_fonnte_key
FONNTE_ENABLED=false
```

### 3. Buat Database MySQL

```sql
CREATE DATABASE cucikinclong CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 4. Jalankan Migration & Seeder

```bash
php artisan migrate --seed
```

Seeder akan membuat:
- 4 paket layanan (Cuci Basic, Cuci Salon, Cuci Premium, Full Detailing)
- 1 admin: `admin@royalgloss.web.id` / password: `admin123`
- Pengaturan toko default
- 5 testimoni contoh

### 5. Build Assets & Storage Link

```bash
npm run build
php artisan storage:link
```

### 6. Jalankan Aplikasi

```bash
php artisan serve
```

Akses di: http://localhost:8000

---

## Konfigurasi Midtrans

### Sandbox (Testing)

1. Daftar di [sandbox.midtrans.com](https://sandbox.midtrans.com)
2. Masuk ke menu **Settings → Access Keys**
3. Salin **Server Key** dan **Client Key** ke `.env`

```env
MIDTRANS_SERVER_KEY=SB-Mid-server-xxxxxxxxxxxx
MIDTRANS_CLIENT_KEY=SB-Mid-client-xxxxxxxxxxxx
MIDTRANS_IS_PRODUCTION=false
```

### Webhook (Notifikasi Pembayaran)

Untuk menerima notifikasi pembayaran dari Midtrans:

1. Di dashboard Midtrans, buka **Settings → Configuration**
2. Set **Payment Notification URL** ke:
   ```
   https://yourdomain.com/payment/notification
   ```
3. Untuk testing lokal, gunakan [ngrok](https://ngrok.com):
   ```bash
   ngrok http 8000
   # Lalu set URL ngrok di dashboard Midtrans
   ```

### Kartu Test (Sandbox)

| Kartu | Nomor | CVV | Expiry |
|-------|-------|-----|--------|
| Visa (Sukses) | 4811 1111 1111 1114 | 123 | 01/25 |
| Mastercard | 5264 2210 3887 4015 | 123 | 01/25 |
| Gagal | 4911 1111 1111 1113 | 123 | 01/25 |

---

## Konfigurasi WhatsApp (Fonnte)

1. Daftar di [fonnte.com](https://fonnte.com)
2. Hubungkan nomor WhatsApp
3. Salin API Key ke `.env`:
   ```env
   FONNTE_API_KEY=your_api_key
   FONNTE_ENABLED=true
   ```

---

## Scheduler (Auto-expire Booking)

Tambahkan cron job di server:

```bash
* * * * * cd /path/to/project && php artisan schedule:run >> /dev/null 2>&1
```

Atau jalankan secara manual:

```bash
php artisan bookings:expire      # Expire booking > 15 menit
php artisan bookings:reminders   # Kirim reminder H-1
```

---

## Akun Default

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@royalgloss.web.id | admin123 |

**Ganti password** setelah instalasi pertama!

---

## Halaman-halaman

### Customer (Publik)
| URL | Deskripsi |
|-----|-----------|
| `/` | Landing page |
| `/booking/create` | Form booking |
| `/booking/{code}/payment` | Halaman pembayaran |
| `/booking/{code}/success` | QR Code & konfirmasi |
| `/booking/check` | Cek status booking |
| `/booking/{code}/feedback` | Form rating |

### Admin (Butuh Login)
| URL | Deskripsi |
|-----|-----------|
| `/admin/login` | Login admin |
| `/admin/dashboard` | Dashboard statistik |
| `/admin/bookings` | Kelola semua booking |
| `/admin/scanner` | QR Scanner check-in |
| `/admin/services` | CRUD paket layanan |
| `/admin/testimonials` | Moderasi testimoni |
| `/admin/settings` | Pengaturan toko |
| `/admin/reports` | Laporan & export PDF |

---

## Struktur Direktori Penting

```
app/
├── Http/Controllers/
│   ├── BookingController.php      # Booking publik
│   ├── PaymentController.php      # Midtrans handler
│   └── Admin/
│       ├── DashboardController.php
│       ├── BookingController.php
│       ├── ScannerController.php
│       ├── ServiceController.php
│       ├── TestimonialController.php
│       ├── SettingController.php
│       └── ReportController.php
├── Models/
│   ├── Booking.php
│   ├── Service.php
│   ├── Payment.php
│   ├── Testimonial.php
│   ├── Setting.php
│   └── Admin.php
└── Services/
    ├── MidtransService.php
    ├── QrCodeService.php
    └── WhatsAppService.php
```

---

## Fitur Lengkap

- ✅ Landing page dengan hero, layanan, cara kerja, testimoni slider, CTA
- ✅ Form booking dengan slot time management (max 3 booking/jam)
- ✅ Pembayaran via Midtrans Snap (semua metode)
- ✅ Timer countdown 15 menit untuk pembayaran
- ✅ Auto-expire booking via scheduler
- ✅ QR Code otomatis setelah pembayaran
- ✅ Download & share QR via WhatsApp
- ✅ Cek status booking (kode / no HP)
- ✅ Admin dashboard dengan Chart.js
- ✅ QR Scanner dengan html5-qrcode
- ✅ CRUD paket layanan
- ✅ Moderasi testimoni
- ✅ Export CSV & PDF laporan
- ✅ Print struk booking
- ✅ WhatsApp notifikasi via Fonnte
- ✅ Form feedback customer
- ✅ Dark theme navy + aksen biru
- ✅ Responsive mobile-first
- ✅ Animasi scroll reveal

---

## License

MIT
