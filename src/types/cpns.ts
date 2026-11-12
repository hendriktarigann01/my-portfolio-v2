export type QuestionCategory = "TWK" | "TIU" | "TKP";

export interface QuestionOption {
  label: "A" | "B" | "C" | "D" | "E";
  text: string;
  points: number;
}

export interface Question {
  id: string;
  category: QuestionCategory;
  subCategory: string;
  question: string;
  image: string | null;
  options: QuestionOption[];
  explanation: string;
}

export interface PackageMeta {
  id: string;
  number: number;
  title: string;
  totalQuestions: number;
  durationMinutes: number;
  passingGrade: {
    twk: number;
    tiu: number;
    tkp: number;
  };
}

export interface QuestionAnswerState {
  selectedLabel: "A" | "B" | "C" | "D" | "E" | null;
  isDoubtful: boolean;
}

export interface ExamSession {
  packageId: string;
  startedAt: number;
  timeRemainingSeconds: number;
  answers: Record<string, QuestionAnswerState>;
  isFinished: boolean;
  lastActiveIndex: number;
}

export interface CategoryResult {
  category: QuestionCategory;
  score: number;
  maxScore: number;
  passingGrade: number;
  isPassed: boolean;
  totalQuestions: number;
}

export interface ExamResult {
  packageId: string;
  completedAt: number;
  timeSpentSeconds: number;
  totalScore: number;
  isPassed: boolean;
  scores: {
    twk: CategoryResult;
    tiu: CategoryResult;
    tkp: CategoryResult;
  };
  answers: Record<string, QuestionAnswerState>;
}

export interface ExamHistoryRecord {
  packageId: string;
  lastAttemptAt: number;
  totalScore: number;
  isPassed: boolean;
  scores: {
    twk: number;
    tiu: number;
    tkp: number;
  };
}
