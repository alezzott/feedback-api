export interface feedbacksCreateData {
  type: string;
  comment: string;
  screenshot?: string;
}

export interface feedbacksRepository {
  create: (data: feedbacksCreateData) => Promise<void>;
}
