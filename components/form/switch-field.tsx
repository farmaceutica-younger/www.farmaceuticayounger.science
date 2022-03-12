import { Switch } from "@headlessui/react";
import { Field } from "react-final-form";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface SwitchFieldProps {
  name: string;
  label: string;
}

export const SwitchField = ({ name, label }: SwitchFieldProps) => {
  return (
    <div className="flex gap-4 align-middle">
      <Field
        name={name}
        render={({ input }) => (
          <Switch
            checked={input.value}
            onChange={(value) => input.onChange(value)}
            className={classNames(
              input.value ? "bg-indigo-600" : "bg-gray-200",
              "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            )}
          >
            <span className="sr-only">{label}</span>
            <span
              aria-hidden="true"
              className={classNames(
                input.value ? "translate-x-5" : "translate-x-0",
                "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
              )}
            />
          </Switch>
        )}
      ></Field>
      <span className="text-sm  "> {label} </span>
    </div>
  );
};
