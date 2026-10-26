import type { ProcessStep } from "@/types";

export const PROCESS_STEPS_BY_LANG: Record<"id" | "en", ProcessStep[]> = {
  id: [
    {
      index: "01",
      title: "Konsultasi & Pemetaan Kebutuhan (Gratis)",
      body: "Ceritakan masalah Anda via WhatsApp atau Google Meet. Saya berikan saran solusi paling efisien dan estimasi biaya. Tahap ini 100% gratis tanpa komitmen apa pun.",
    },
    {
      index: "02",
      title: "Penawaran Tertulis & Kunci Lingkup Kerja",
      body: "Ruang lingkup fitur, harga jasa, dan jadwal pengerjaan disepakati di awal secara tertulis. Tidak ada biaya siluman di tengah jalan. DP 50% mengunci jadwal mulai pengerjaan.",
    },
    {
      index: "03",
      title: "Pengerjaan Transparan & Kabar Berkala",
      body: "Dikerjakan di jam kerja aktif (Senin–Jumat 18–21 WIB, Sabtu–Minggu 08–21 WIB). Anda mendapat kabar progres berkala secara teratur, bukan menghilang lalu tiba-tiba muncul di akhir.",
    },
    {
      index: "04",
      title: "Uji Bersama, Pelunasan & Garansi 30 Hari",
      body: "Kita uji fungsi bersama sampai Anda yakin berjalan lancar. Setelah pelunasan 50%, seluruh akses (source code, hosting, akun) diserahkan penuh. Didukung garansi bugfix gratis 14–30 hari.",
    },
  ],
  en: [
    {
      index: "01",
      title: "Alignment & Requirement Discovery",
      body: "We start by mapping the problem and business goals before touching any code. Free consultation via WhatsApp or Google Meet to agree on the best technical path.",
    },
    {
      index: "02",
      title: "Clear Scope & Fixed Pricing",
      body: "Deliverables, timeline, and exact pricing are locked upfront in writing. No hidden surprises. A 50% down payment confirms your milestone and kicks off development.",
    },
    {
      index: "03",
      title: "Transparent Execution & Progress Updates",
      body: "Active working hours (Mon–Fri 18–21 WIB, Sat–Sun 08–21 WIB). Development proceeds with regular milestone demos so you always know where things stand.",
    },
    {
      index: "04",
      title: "Joint Testing, Handover & 30-Day Warranty",
      body: "We test the system together until verified. Once finalized, 100% of credentials, source code, and assets are handed over to you, backed by a 30-day bugfix warranty.",
    },
  ],
};

export const OPERATIONAL_HOURS = {
  id: {
    title: "Jam Kerja & Komitmen Respon",
    weekdays: "Senin – Jumat: 18.00 – 21.00 WIB",
    weekends: "Sabtu – Minggu: 08.00 – 21.00 WIB",
    note: "Pesan di luar jam kerja tetap diterima dan dibalas di kesempatan pertama. Gangguan darurat pada pekerjaan yang masih bergaransi direspon secepatnya.",
  },
  en: {
    title: "Working Hours & Response Policy",
    weekdays: "Monday – Friday: 18:00 – 21:00 WIB",
    weekends: "Saturday – Sunday: 08:00 – 21:00 WIB",
    note: "Messages outside active hours are answered at the earliest opportunity. Critical bug alerts during warranty periods are handled promptly.",
  },
};

export const PROCESS_STEPS: ProcessStep[] = PROCESS_STEPS_BY_LANG.id;
