import { RadioGroup } from "@headlessui/react";
import { useCallback, useState } from "react";
import { Field, Form, FormSpy } from "react-final-form";
import { zodValidate } from "utils/zod-validate";
import {
  CheckedMultipleChoiseIcon,
  CheckedSingleChoiseIcon,
  MultipleChoiceIcon,
  SingleChoiseIcon,
} from "./icons";
import {
  BuildQuestionairreSchema,
  LongQuestion,
  MultipleChoice,
  Question,
  Questionairre,
  ShortQuestion,
  SingleChoice,
} from "./schema";

interface QuestionairreFormProps {
  questionairre: Questionairre;
  title: string;
  submitText: string;
  onSumbit: (value: any) => Promise<void>;
}

export const QuestionairreForm = ({
  questionairre,
  title,
  submitText,
  onSumbit,
}: QuestionairreFormProps) => {
  const schema = BuildQuestionairreSchema(questionairre.questions);
  const [loading, setLoading] = useState(false);

  const submit = async (value: any) => {
    setLoading(true);
    value = schema.parse(value);
    await onSumbit(value);
    setLoading(false);
  };

  return (
    <div>
      <h2 className="text-bold text-xl">{title}</h2>
      <Form
        onSubmit={submit}
        validate={zodValidate(schema)}
        render={({ handleSubmit, invalid }) => {
          return (
            <form onSubmit={handleSubmit}>
              {questionairre.questions.map((question) => (
                <div key={question.cuid} className="mt-4">
                  <QuestionField {...question} />
                </div>
              ))}
              {loading ? (
                <button className="btn loading btn-primary mt-4 w-full"></button>
              ) : (
                <button
                  className="btn btn-primary mt-4 w-full"
                  disabled={invalid}
                  type="submit"
                >
                  {submitText}
                </button>
              )}
            </form>
          );
        }}
      />
    </div>
  );
};

const QuestionField = (question: Question) => {
  if (question.type === "short") {
    return <ShortQuestionField key={question.cuid} {...question} />;
  }
  if (question.type === "long") {
    return <LongQuestionField key={question.cuid} {...question} />;
  }
  if (question.type === "multiple_choice") {
    return <MultipleChoiceField key={question.cuid} {...question} />;
  }
  if (question.type === "single_choice") {
    return <SingleChoiceField key={question.cuid} {...question} />;
  }
  return <></>;
};

const ShortQuestionField = ({ cuid, description, required }: ShortQuestion) => {
  return (
    <div className="">
      <Field
        type="text"
        name={cuid}
        render={({ input, meta }) => {
          return (
            <div>
              <div className="mb-2 flex justify-between">
                <label
                  htmlFor={cuid}
                  className="block font-medium text-gray-700"
                >
                  {description}
                  {required && <span className="ml-2 text-red-500">*</span>}
                </label>
              </div>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  className="block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  {...input}
                />
              </div>
              <div className="mt-1 flex h-5 justify-between text-xs">
                <span className="text-sm text-red-400">{meta.error}</span>
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};

const LongQuestionField = ({ cuid, description, required }: LongQuestion) => {
  return (
    <div className="">
      <Field
        type="text"
        name={cuid}
        render={({ input, meta }) => {
          return (
            <div>
              <div className="mb-2 flex justify-between">
                <label
                  htmlFor={cuid}
                  className="block font-medium text-gray-700"
                >
                  {description}
                  {required && <span className="ml-2 text-red-500">*</span>}
                </label>
              </div>
              <div className="mt-1 flex rounded-md shadow-sm">
                <textarea
                  className="block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  rows={4}
                  {...input}
                />
              </div>
              <div className="mt-1 flex h-5 justify-between text-xs">
                <span className="text-sm text-red-400">{meta.error}</span>
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};

const MultipleChoiceField = ({
  options,
  description,
  cuid,
  required,
}: MultipleChoice) => {
  const isChecked = (values: string[], current: string) => {
    return values.includes(current);
  };

  const add = (values: string[], current: string) => {
    return Array.from(new Set([...values, current]));
  };

  const remove = (values: string[], current: string) => {
    return values.filter((v) => v !== current);
  };

  const toggle = (values: string[], current: string) => {
    if (isChecked(values, current)) {
      return remove(values, current);
    }
    return add(values, current);
  };

  return (
    <Field<string[]>
      name={cuid}
      type="text"
      render={({ input, meta }) => {
        return (
          <div>
            <div className="mb-2 flex justify-between">
              <label htmlFor={cuid} className="block font-medium text-gray-700">
                {description}
                {required && <span className="ml-2 text-red-500">*</span>}
              </label>
            </div>
            <div>
              {options.map((option, idx) => (
                <div key={idx}>
                  <button
                    onClick={() => input.onChange(toggle(input.value, option))}
                    className="flex cursor-pointer space-x-2"
                  >
                    <div className="flex cursor-pointer space-x-2">
                      {isChecked(input.value, option) ? (
                        <CheckedMultipleChoiseIcon />
                      ) : (
                        <MultipleChoiceIcon />
                      )}
                      <span className="">{option}</span>
                    </div>
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-1 flex h-5 justify-between text-xs">
              <span className="text-sm text-red-400">{meta.error}</span>
            </div>
          </div>
        );
      }}
    />
  );
};

const SingleChoiceField = ({
  options,
  description,
  required,
  cuid,
}: SingleChoice) => {
  return (
    <Field
      name={cuid}
      type="text"
      render={({ input, meta }) => {
        return (
          <RadioGroup value={input.value} onChange={input.onChange}>
            <RadioGroup.Label>
              <div className="mb-2 flex justify-between">
                <label
                  htmlFor={cuid}
                  className="block font-medium text-gray-700"
                >
                  {description}
                  {required && <span className="ml-2 text-red-500">*</span>}
                </label>
              </div>
            </RadioGroup.Label>
            {options.map((option, idx) => (
              <RadioGroup.Option value={option} key={idx}>
                {({ checked }) => (
                  <div className="flex cursor-pointer space-x-2">
                    {checked ? (
                      <CheckedSingleChoiseIcon />
                    ) : (
                      <SingleChoiseIcon />
                    )}
                    <span className="">{option}</span>
                  </div>
                )}
              </RadioGroup.Option>
            ))}
            <div className="mt-1 flex h-5 justify-between text-xs">
              <span className="text-sm text-red-400">{meta.error}</span>
            </div>
          </RadioGroup>
        );
      }}
    />
  );
};
