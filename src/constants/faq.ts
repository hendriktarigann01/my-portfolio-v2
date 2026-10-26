export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export const FAQ_DATA_BY_LANG: Record<"id" | "en", FAQItem[]> = {
  id: [
    {
      question: "Apakah konsultasi dan tanya-tanya kena biaya?",
      answer:
        "Sama sekali tidak. Diskusi awal via WhatsApp atau Google Meet untuk membedah masalah, rekomendasi solusi, dan perkiraan biaya adalah 100% gratis. Biaya baru ada setelah Anda menyetujui penawaran tertulis.",
      category: "Konsultasi",
    },
    {
      question: "Bagaimana sistem pembayaran dan uang mukanya (DP)?",
      answer:
        "Sederhana dan transparan: 50% DP di awal setelah penawaran disetujui untuk mengunci alokasi waktu dan mulai pengerjaan. Sisa 50% pelunasan dibayarkan setelah sistem selesai, diuji bersama, dan Anda puas.",
      category: "Pembayaran",
    },
    {
      question: "Bagaimana jika ada error atau kendala setelah sistem selesai?",
      answer:
        "Semua pekerjaan dilengkapi garansi perbaikan bug gratis selama 14–30 hari setelah serah terima untuk fungsi dalam ruang lingkup awal. Anda tidak ditinggal lepas tangan setelah pembayaran.",
      category: "Garansi",
    },
    {
      question: "Apakah ada biaya langganan bulanan yang harus dibayar ke Mas Hendrik?",
      answer:
        "Tidak ada biaya sewa siluman. Sistem atau website yang dibuat bersifat beli putus (milik Anda). Untuk biaya pihak ketiga (seperti perpanjangan domain & hosting tahunan), Anda bayar langsung ke penyedia resminya atas nama Anda sendiri.",
      category: "Biaya",
    },
    {
      question: "Kata sandi, akun hosting, dan source code dipegang siapa?",
      answer:
        "100% diserahkan ke Anda saat serah terima. Saya tidak menahan akun atau aset digital klien agar Anda tidak terkunci (no vendor lock-in). Anda memiliki kendali penuh atas sistem bisnis Anda.",
      category: "Keamanan",
    },
    {
      question: "Apakah melayani pemesanan di luar Cikarang?",
      answer:
        "Tentu saja! Pengerjaan software, website, dan sistem operasional sepenuhnya bisa dikerjakan jarak jauh (remote) via WhatsApp dan Google Meet untuk klien di seluruh Indonesia.",
      category: "Layanan",
    },
    {
      question: "Kapan jam kerja dan respon pesan Mas Hendrik?",
      answer:
        "Jam kerja aktif: Senin–Jumat 18.00–21.00 WIB dan Sabtu–Minggu 08.00–21.00 WIB. Di luar jam kerja pesan tetap masuk dan akan dibalas di kesempatan pertama. Gangguan darurat pada proyek bergaransi direspon secepatnya.",
      category: "Operasional",
    },
  ],
  en: [
    {
      question: "Is the initial consultation free?",
      answer:
        "Yes, 100% free. Discussing your requirements, scoping solutions, and getting a price estimate via WhatsApp or Google Meet costs nothing. You only commit once you accept a written scope proposal.",
      category: "Consultation",
    },
    {
      question: "How does the payment and deposit (DP) schedule work?",
      answer:
        "Clear and fair: 50% down payment upon proposal sign-off to secure the schedule and commence development. The remaining 50% is paid after joint verification and your approval.",
      category: "Payment",
    },
    {
      question: "What happens if a bug or issue appears after delivery?",
      answer:
        "All projects include a 14–30 day complimentary bugfix warranty covering any issues within the agreed scope. You will never be left unsupported post-launch.",
      category: "Warranty",
    },
    {
      question: "Are there any hidden monthly subscription fees?",
      answer:
        "Zero hidden fees. Systems and websites are built as one-off assets that you own outright. Third-party infrastructure costs (like yearly domain/hosting) are paid directly to official providers in your own name.",
      category: "Pricing",
    },
    {
      question: "Who owns the source code, credentials, and hosting accounts?",
      answer:
        "100% transferred to you upon final handover. I never withhold credentials or lock clients in. You retain full autonomy and ownership of your digital assets.",
      category: "Ownership",
    },
    {
      question: "Do you work with clients outside Cikarang / internationally?",
      answer:
        "Yes! Software and web systems are built 100% remotely with seamless communication via WhatsApp, Slack, and Google Meet for clients across Indonesia and worldwide.",
      category: "Availability",
    },
    {
      question: "What are your active working and response hours?",
      answer:
        "Active hours: Monday–Friday 18:00–21:00 WIB and Saturday–Sunday 08:00–21:00 WIB. Messages sent outside these hours are answered at the earliest opportunity, with emergency warranty bugs handled promptly.",
      category: "Operations",
    },
  ],
};

export const FAQ_DATA = FAQ_DATA_BY_LANG.id;
