export interface ClientQuestion {
  question: string;
  askedBy: string;
  answer: string;
  answeredBy: string;
}

export interface ClientQuestionDB {
  questions: ClientQuestion[];
}
