import { notFound } from "next/navigation";
import { ALL_WORK_ENTRIES } from "@/constants";
import { WorkDetailView } from "@/views/WorkDetailView";

export function generateStaticParams() {
  return ALL_WORK_ENTRIES.map((entry) => ({ slug: entry.slug }));
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = ALL_WORK_ENTRIES.find((e) => e.slug === slug);

  if (!entry) {
    notFound();
  }

  return <WorkDetailView entry={entry} />;
}
