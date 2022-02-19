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
    <div className="flex align-middle gap-4">
      <Field
        name={name}
        render={({ input }) => (
          <Switch
            checked={input.value}
            onChange={(value) => input.onChange(value)}
            className={classNames(
              input.value ? "bg-indigo-600" : "bg-gray-200",
              "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            )}
          >
            <span className="sr-only">{label}</span>
            <span
              aria-hidden="true"
              className={classNames(
                input.value ? "translate-x-5" : "translate-x-0",
                "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
              )}
            />
          </Switch>
        )}
      ></Field>
      <span className="text-sm  "> {label} </span>
    </div>
  );
};
