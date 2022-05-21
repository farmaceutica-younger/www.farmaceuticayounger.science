import { InputHTMLAttributes, useRef } from "react";
import { Field } from "react-final-form";
import Compress from "compress.js";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

export const FileImageField = ({ name, ...props }: Props) => {
  const inputRef = useRef<any>(null);
  return (
    <Field<string> name={name}>
      {({ input: { value, onChange, ...input } }) => {
        return (
          <div className="flex gap-5">
            {value ? (
              <img
                className="h-12 w-12 overflow-hidden rounded-full "
                src={value}
              />
            ) : (
              <span className="h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                <svg
                  className="h-12 w-12 text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </span>
            )}
            <input
              ref={inputRef}
              className="hidden"
              {...input}
              type="file"
              accept="image/*"
              onChange={async ({ target }) => {
                const file = (target.files as FileList)[0];
                onChange(await blobToBase64(file));
              }} // instead of the default target.value
              {...props}
            />
            <button type="button" onClick={() => inputRef.current?.click()}>
              Cambia Immagine
            </button>
          </div>
        );
      }}
    </Field>
  );
};

async function blobToBase64(file: File) {
  const cmp = new Compress();
  const [resized] = await cmp.compress([file], {
    size: 1,
    quality: 0.75,
    maxWidth: 500,
    maxHeight: 500,
    resize: true,
  });
  return resized.prefix + resized.data;
}
