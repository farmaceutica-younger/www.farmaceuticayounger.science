import { ChangeEvent } from "react";
import { Field } from "react-final-form";

interface FeatureImageFieldProps {
  name: string;
  uploadImage: (file: Blob) => Promise<string>;
}

export const FeatureImageField = ({
  name,
  uploadImage,
}: FeatureImageFieldProps) => {
  const upload = async (
    e: ChangeEvent<HTMLInputElement>,
    onChange: (i: string) => void
  ) => {
    e.preventDefault();
    const file = e.target.files?.item(0);
    if (!file) {
      return;
    }
    const res = await uploadImage(file);
    onChange(res);
  };
  return (
    <div className="sm:col-span-6">
      <label
        htmlFor="cover-photo"
        className="block text-sm font-medium text-gray-700"
      >
        Immagine di anteprima
      </label>
      <Field
        name={name}
        render={(props) => (
          <div className="">
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                {props.input.value ? (
                  <img className="w-24 mx-auto" src={props.input.value} />
                ) : (
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                <div className="text-sm text-gray-600 text-center">
                  <label
                    htmlFor={props.input.name}
                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    {props.input.value ? (
                      <span>Cambia immagine</span>
                    ) : (
                      <span>Upload a file</span>
                    )}
                    <input
                      id={props.input.name}
                      name={props.input.name}
                      type="file"
                      className="sr-only"
                      onChange={(e) => upload(e, props.input.onChange)}
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>
        )}
      />
    </div>
  );
};
