import fs from "fs/promises";
import path from "path";
import type { Question } from "@/types/cpns";

export async function getPackageQuestions(
  packageId: string
): Promise<Question[] | null> {
  const match = packageId.match(/^paket-([1-9]|1[0-9]|20)$/);
  if (!match) return null;

  try {
    const filePath = path.join(
      process.cwd(),
      "src",
      "data",
      "cpns",
      `${packageId}.json`
    );
    const rawData = await fs.readFile(filePath, "utf-8");
    return JSON.parse(rawData) as Question[];
  } catch {
    return null;
  }
}
