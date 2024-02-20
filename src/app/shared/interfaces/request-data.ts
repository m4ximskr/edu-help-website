export interface RequestOrderData {
  name: string;
  email: string;
  number: number;
  description: string;
  files: {filename: string, path: string}[];
}

export interface RequestQuestionData {
  number: number;
  question: string;
}

export interface RequestTutoringData {
  name: string;
  number: number;
  message: string;
}
