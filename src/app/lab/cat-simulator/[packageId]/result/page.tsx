import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPackageMeta } from "@/lib/cpns";
import { getPackageQuestions } from "@/lib/cpns-server";
import { ResultClientView } from "@/components/cpns/ResultClientView";

interface ResultPageProps {
  params: Promise<{ packageId: string }>;
}

export async function generateMetadata({
  params,
}: ResultPageProps): Promise<Metadata> {
  const { packageId } = await params;
  const meta = getPackageMeta(packageId);

  if (!meta) {
    return { title: "Hasil Tidak Ditemukan | CAT Simulator" };
  }

  return {
    title: `Hasil & Pembahasan ${meta.title} - CAT Simulator | HT Solution`,
    description: `Tinjauan skor kelulusan passing grade dan pembahasan lengkap 110 butir soal SKD untuk ${meta.title}.`,
  };
}

export default async function ResultPage({ params }: ResultPageProps) {
  const { packageId } = await params;
  const meta = getPackageMeta(packageId);

  if (!meta) {
    notFound();
  }

  const questions = await getPackageQuestions(packageId);

  if (!questions || questions.length === 0) {
    notFound();
  }

  return <ResultClientView packageMeta={meta} questions={questions} />;
}
