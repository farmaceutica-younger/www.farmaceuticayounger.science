import { z, ZodLazy } from "zod";

const _baseQuestionSchemaContent = {
  cuid: z.string(),
  description: z.string().max(200),
  required: z.boolean().default(false),
} as const;

export const ShortQuestionSchema = z.object({
  type: z.literal("short"),
  ..._baseQuestionSchemaContent,
});

export const LongQuestionSchema = z.object({
  type: z.literal("long"),
  ..._baseQuestionSchemaContent,
});

export const MultipleChoiceSchema = z.object({
  type: z.literal("multiple_choice"),
  ..._baseQuestionSchemaContent,
  options: z.string().max(40).array().min(1),
});

export const SingleChoiceSchema = z.object({
  type: z.literal("single_choice"),
  ..._baseQuestionSchemaContent,
  options: z.string().max(40).array().min(1),
});

const QuestionSchema = z.discriminatedUnion("type", [
  ShortQuestionSchema,
  LongQuestionSchema,
  MultipleChoiceSchema,
  SingleChoiceSchema,
]);

export const QuestionairreSchema = z.object({
  questions: QuestionSchema.array(),
});

export type Questionairre = z.TypeOf<typeof QuestionairreSchema>;
export type Question = z.TypeOf<typeof QuestionSchema>;
export type ShortQuestion = z.TypeOf<typeof ShortQuestionSchema>;
export type LongQuestion = z.TypeOf<typeof LongQuestionSchema>;
export type MultipleChoice = z.TypeOf<typeof MultipleChoiceSchema>;
export type SingleChoice = z.TypeOf<typeof SingleChoiceSchema>;

export const BuildQuestionairreSchema = (questions: Question[]) => {
  const schema: { [k: string]: z.Schema } = {};
  for (let q of questions) {
    if (q.type === "short") {
      let s: z.ZodSchema = z
        .string({
          description: q.description,
        })
        .max(200);
      if (!q.required) {
        s = s.optional();
      }
      schema[q.cuid] = s;
    }
    if (q.type === "long") {
      let s: z.ZodSchema = z.string({
        description: q.description,
      });
      if (!q.required) {
        s = s.optional();
      }
      schema[q.cuid] = s;
    }
    if (q.type === "multiple_choice") {
      let s: z.ZodSchema = z
        .string({
          description: q.description,
        })
        .array();
      if (!q.required) {
        s = s.optional();
      }
      schema[q.cuid] = s;
    }
    if (q.type === "single_choice") {
      let s: z.ZodSchema = z.string({
        description: q.description,
      });
      if (!q.required) {
        s = s.optional();
      }
      schema[q.cuid] = s;
    }
  }
  return z.object(schema);
};
