import type { ProcessStep } from "@/types";

export const PROCESS_STEPS_BY_LANG: Record<"id" | "en", ProcessStep[]> = {
  id: [
    {
      index: "01",
      title: "Konsultasi Kebutuhan (Gratis)",
      body: "Diskusi via WhatsApp atau Google Meet untuk memetakan solusi paling efisien dan estimasi biaya tanpa komitmen.",
    },
    {
      index: "02",
      title: "Kesepakatan Lingkup & Biaya",
      body: "Fitur, biaya, dan jadwal disepakati tertulis di awal tanpa biaya tersembunyi. DP 50% untuk mulai pengerjaan.",
    },
    {
      index: "03",
      title: "Pengerjaan & Update Berkala",
      body: "Pengerjaan sesuai jadwal dengan kabar progres teratur agar Anda selalu tahu perkembangan proyek.",
    },
    {
      index: "04",
      title: "Uji Coba, Serah Terima & Garansi",
      body: "Pengujian bersama sampai tuntas, serah terima kode dan akses 100%, serta garansi bug 30 hari.",
    },
  ],
  en: [
    {
      index: "01",
      title: "Free Consultation",
      body: "Quick discussion via WhatsApp or Google Meet to map out the most efficient solution and price estimate.",
    },
    {
      index: "02",
      title: "Fixed Scope & Pricing",
      body: "Deliverables, timeline, and pricing agreed upfront in writing with zero hidden costs. 50% down payment to kick off.",
    },
    {
      index: "03",
      title: "Execution & Regular Updates",
      body: "Development proceeds on schedule with regular progress updates so you always stay informed.",
    },
    {
      index: "04",
      title: "Handover & 30-Day Warranty",
      body: "Joint testing, full handover of source code and credentials, backed by a 30-day bug warranty.",
    },
  ],
};

export const OPERATIONAL_HOURS = {
  id: {
    title: "Jam Kerja",
    weekdays: "Senin - Jumat: 18.00 - 21.00 WIB",
    weekends: "Sabtu - Minggu: 08.00 - 21.00 WIB",
    note: "Pesan di luar jam kerja dibalas pada kesempatan pertama. Bug darurat direspon secepatnya.",
  },
  en: {
    title: "Working Hours",
    weekdays: "Monday - Friday: 18:00 - 21:00 WIB",
    weekends: "Saturday - Sunday: 08:00 - 21:00 WIB",
    note: "Messages outside active hours are answered promptly. Critical bug alerts handled with priority.",
  },
};

export const PROCESS_STEPS: ProcessStep[] = PROCESS_STEPS_BY_LANG.id;
