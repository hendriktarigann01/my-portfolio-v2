import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPackageMeta } from "@/lib/cpns";
import { getPackageQuestions } from "@/lib/cpns-server";
import { ExamClientView } from "@/components/cpns/ExamClientView";

interface ExamPageProps {
  params: Promise<{ packageId: string }>;
}

export async function generateMetadata({
  params,
}: ExamPageProps): Promise<Metadata> {
  const { packageId } = await params;
  const meta = getPackageMeta(packageId);

  if (!meta) {
    return { title: "Paket Tidak Ditemukan | CAT Simulator" };
  }

  return {
    title: `${meta.title} - CAT Simulator (SKD BKN) | HT Solution`,
    description: `Simulasi ujian SKD CPNS standar CAT BKN untuk ${meta.title}. 110 butir soal lengkap TWK, TIU, TKP dengan timer 100 menit.`,
  };
}

export default async function ExamPage({ params }: ExamPageProps) {
  const { packageId } = await params;
  const meta = getPackageMeta(packageId);

  if (!meta) {
    notFound();
  }

  const questions = await getPackageQuestions(packageId);

  if (!questions || questions.length === 0) {
    notFound();
  }

  return <ExamClientView packageMeta={meta} questions={questions} />;
}
