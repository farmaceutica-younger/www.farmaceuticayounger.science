import { DatePickerField } from "components/form/date-picker";
import { Field, Form } from "react-final-form";
import { zodValidate } from "utils/zod-validate";
import { z } from "zod";

export const CreateEventSchema = z.object({
  title: z.string().max(100),
  description: z.string().max(500),
  location: z.string().max(200),
  startDate: z.date(),
  endDate: z.date(),
});

export type CreateEvent = z.TypeOf<typeof CreateEventSchema>;

interface EventFormProps {
  onSubmit: (values: CreateEvent) => void;
  abort: () => void;
}

export const CreateEventForm = ({ onSubmit, abort }: EventFormProps) => {
  return (
    <Form
      validate={zodValidate(CreateEventSchema)}
      onSubmit={onSubmit}
      render={({ handleSubmit, invalid }) => (
        <form onSubmit={handleSubmit}>
          <div className="space-y-8 divide-y divide-gray-200">
            <div>
              <Field
                type="text"
                name="title"
                id="title"
                autoComplete="title"
                render={({ input, meta }) => {
                  return (
                    <div>
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Titolo del Event
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          {...input}
                        />
                      </div>
                      <div className="mt-1 flex h-5 justify-between text-xs">
                        <span className="text-sm text-red-400">
                          {meta.error}
                        </span>
                        <span className={"text-stone-400"}>
                          {input.value.length} / 100
                        </span>
                      </div>
                    </div>
                  );
                }}
              />

              <div className="mt-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Inizio dell&apos;evento
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <DatePickerField name="startDate" />
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Fine dell&apos;evento
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <DatePickerField name="endDate" />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Field
                  id="location"
                  name="location"
                  type="text"
                  render={({ input, meta }) => (
                    <div>
                      <label
                        htmlFor="location"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Luogo dell&apos;evento
                      </label>
                      <div className="mt-1">
                        <input
                          {...input}
                          className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div className="mt-1 flex h-5 justify-between text-xs">
                        <span className="text-sm text-red-400">
                          {meta.error}
                        </span>
                        <span className={"text-stone-400"}>
                          {input.value.length} / 200
                        </span>
                      </div>
                    </div>
                  )}
                />
              </div>

              <div className="mt-6">
                <Field
                  id="description"
                  name="description"
                  type="text"
                  render={({ input, meta }) => (
                    <div>
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Descrizione
                      </label>
                      <div className="mt-1">
                        <textarea
                          {...input}
                          rows={10}
                          className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div className="mt-1 flex h-5 justify-between text-xs">
                        <span className="text-sm text-red-400">
                          {meta.error}
                        </span>
                        <span className={"text-stone-400"}>
                          {input.value.length} / 500
                        </span>
                      </div>
                    </div>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="pt-5">
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={abort}
                className="btn btn-ghost btn-sm"
              >
                Annulla
              </button>
              <button
                type="submit"
                disabled={invalid}
                className="btn btn-outline btn-primary btn-sm"
              >
                Salva
              </button>
            </div>
          </div>
        </form>
      )}
    />
  );
};
