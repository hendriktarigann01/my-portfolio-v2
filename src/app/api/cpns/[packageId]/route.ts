import { NextResponse } from "next/server";
import { getPackageQuestions } from "@/lib/cpns-server";
import { getPackageMeta } from "@/lib/cpns";

export async function GET(
  _request: Request,
  context: { params: Promise<{ packageId: string }> }
) {
  const { packageId } = await context.params;
  const meta = getPackageMeta(packageId);

  if (!meta) {
    return NextResponse.json({ error: "Package not found" }, { status: 404 });
  }

  const questions = await getPackageQuestions(packageId);
  if (!questions) {
    return NextResponse.json(
      { error: "Questions data not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    meta,
    questions,
  });
}
