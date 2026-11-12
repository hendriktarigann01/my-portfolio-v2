import type {
  PackageMeta,
  Question,
  QuestionAnswerState,
  ExamResult,
  ExamSession,
  ExamHistoryRecord,
} from "@/types/cpns";

export const TOTAL_PACKAGES = 20;
export const EXAM_DURATION_MINUTES = 100;
export const EXAM_DURATION_SECONDS = EXAM_DURATION_MINUTES * 60;

export const PASSING_GRADES = {
  twk: 65,
  tiu: 80,
  tkp: 166,
} as const;

export const MAX_SCORES = {
  twk: 150,
  tiu: 175,
  tkp: 225,
  total: 550,
} as const;

export const CPNS_PACKAGES: PackageMeta[] = Array.from(
  { length: TOTAL_PACKAGES },
  (_, i) => {
    const num = i + 1;
    return {
      id: `paket-${num}`,
      number: num,
      title: `Paket SKD ${String(num).padStart(2, "0")}`,
      totalQuestions: 110,
      durationMinutes: EXAM_DURATION_MINUTES,
      passingGrade: { ...PASSING_GRADES },
    };
  }
);

export function getPackageMeta(packageId: string): PackageMeta | undefined {
  return CPNS_PACKAGES.find((pkg) => pkg.id === packageId);
}

export function getCpnsImageUrl(imagePath: string | null): string | null {
  if (!imagePath) return null;
  const filename = imagePath.replace(/^images\//, "");
  return `/assets/cpns/${filename}`;
}

export function formatTimeDisplay(totalSeconds: number): string {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  const seconds = safeSeconds % 60;

  if (hours > 0) {
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function calculateExamResult(
  packageId: string,
  questions: Question[],
  answers: Record<string, QuestionAnswerState>,
  timeSpentSeconds: number
): ExamResult {
  let twkScore = 0;
  let tiuScore = 0;
  let tkpScore = 0;
  let twkCount = 0;
  let tiuCount = 0;
  let tkpCount = 0;

  for (const q of questions) {
    const ans = answers[q.id];
    const selectedOption = q.options.find(
      (opt) => opt.label === ans?.selectedLabel
    );
    const points = selectedOption ? selectedOption.points : 0;

    if (q.category === "TWK") {
      twkScore += points;
      twkCount++;
    } else if (q.category === "TIU") {
      tiuScore += points;
      tiuCount++;
    } else if (q.category === "TKP") {
      tkpScore += points;
      tkpCount++;
    }
  }

  const scores = {
    twk: {
      category: "TWK" as const,
      score: twkScore,
      maxScore: MAX_SCORES.twk,
      passingGrade: PASSING_GRADES.twk,
      isPassed: twkScore >= PASSING_GRADES.twk,
      totalQuestions: twkCount,
    },
    tiu: {
      category: "TIU" as const,
      score: tiuScore,
      maxScore: MAX_SCORES.tiu,
      passingGrade: PASSING_GRADES.tiu,
      isPassed: tiuScore >= PASSING_GRADES.tiu,
      totalQuestions: tiuCount,
    },
    tkp: {
      category: "TKP" as const,
      score: tkpScore,
      maxScore: MAX_SCORES.tkp,
      passingGrade: PASSING_GRADES.tkp,
      isPassed: tkpScore >= PASSING_GRADES.tkp,
      totalQuestions: tkpCount,
    },
  };

  const isPassed =
    scores.twk.isPassed && scores.tiu.isPassed && scores.tkp.isPassed;
  const totalScore = twkScore + tiuScore + tkpScore;

  return {
    packageId,
    completedAt: Date.now(),
    timeSpentSeconds,
    totalScore,
    isPassed,
    scores,
    answers,
  };
}

export const STORAGE_KEYS = {
  session: (packageId: string) => `cat_session_${packageId}`,
  result: (packageId: string) => `cat_result_${packageId}`,
  history: "cat_history",
} as const;

export function loadStoredSession(packageId: string): ExamSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.session(packageId));
    if (!raw) return null;
    return JSON.parse(raw) as ExamSession;
  } catch {
    return null;
  }
}

export function saveStoredSession(session: ExamSession): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      STORAGE_KEYS.session(session.packageId),
      JSON.stringify(session)
    );
  } catch {
    // quota exceeded or storage disabled
  }
}

export function clearStoredSession(packageId: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEYS.session(packageId));
  } catch {
    // ignore
  }
}

export function loadStoredResult(packageId: string): ExamResult | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.result(packageId));
    if (!raw) return null;
    return JSON.parse(raw) as ExamResult;
  } catch {
    return null;
  }
}

export function saveStoredResult(result: ExamResult): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      STORAGE_KEYS.result(result.packageId),
      JSON.stringify(result)
    );

    const history = loadStoredHistory();
    history[result.packageId] = {
      packageId: result.packageId,
      lastAttemptAt: result.completedAt,
      totalScore: result.totalScore,
      isPassed: result.isPassed,
      scores: {
        twk: result.scores.twk.score,
        tiu: result.scores.tiu.score,
        tkp: result.scores.tkp.score,
      },
    };
    localStorage.setItem(STORAGE_KEYS.history, JSON.stringify(history));
  } catch {
    // ignore
  }
}

export function loadStoredHistory(): Record<string, ExamHistoryRecord> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.history);
    if (!raw) return {};
    return JSON.parse(raw) as Record<string, ExamHistoryRecord>;
  } catch {
    return {};
  }
}
