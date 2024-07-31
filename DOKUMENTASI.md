# Panduan Menjalankan Aplikasi

## Cara Menjalankan Server (Jalankan ini terlebih dahulu)

1. **Clone Repository**:

   - Jalankan perintah berikut pada terminal:
     ```bash
     git clone https://github.com/0wenB/ifabula-backend.git
     ```

2. **Masuk ke Directory Server**:

   - Pindah ke directory server yang telah di-clone:
     ```bash
     cd ifabula-backend/server
     ```

3. **Install Dependencies**:

   - Jalankan command berikut untuk menginstall dependencies:
     ```bash
     npm install
     ```

4. **Buat File Environment (.env)**:

   - Buat file `.env` baru di folder server dan masukkan:
     ```
     SECRET_KEY=ini_terserah_anda_mau_taro_apa
     ```

5. **Konfigurasi Database Lokal**:

   - **Install Software Relational Databases**:
     - Download software relational databases (misalnya DBeaver).
   - **Install Postgres**:
     - Download dan install Postgres (terpisah dari DBeaver).
   - **Konfigurasi/Koneksi ke Database**:
     - Buat koneksi ke database menggunakan Postgres.

6. **Ubah Konfigurasi Database**:

   - Setelah terkoneksi, ubah kode di `server/config/config.json` pada bagian development:
     ```json
     "development": {
       "username": "postgres",
       "password": "",
       "database": "online_library_dev",
       "host": "127.0.0.1",
       "dialect": "postgres"
     }
     ```
   - Sesuaikan `username`, `password`, dan `database` dengan konfigurasi akun Postgres yang telah terhubung.
   - Gunakan `dialect` sebagai `postgres` karena menggunakan PostgreSQL.

7. **Membuat Database dan Memigrasi Data**:

   - Jalankan perintah berikut secara berurutan untuk membuat database dan mempopulasi data:
     ```bash
     npx sequelize db:create
     npx sequelize db:migrate
     npx sequelize db:seed:all
     ```

8. **Menjalankan Server**:
   - Jalankan server dengan command:
     ```bash
     npx nodemon app.js
     ```
   - Server sekarang sudah berjalan dan siap digunakan.

## Cara Menjalankan Client (Jalankan setelah server)

1. **Masuk ke Directory Client**:

   - Pindah ke directory client pada terminal (gunakan tab terminal baru, biarkan server tetap berjalan):
     ```bash
     cd ifabula-backend/client
     ```

2. **Install Dependencies**:

   - Jalankan command berikut untuk menginstall dependencies:
     ```bash
     npm install
     ```

3. **Menjalankan Aplikasi**:

   - Jalankan aplikasi dengan perintah:
     ```bash
     npm run dev
     ```

4. **Aplikasi Siap Digunakan**

## Catatan:

- Jika ingin masuk sebagai admin, detail akun admin dapat ditemukan pada `users.json` (lokasi: `server > data > users.json`).
