import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { Footer } from "components/footer";
import { FileImageField } from "components/forms/files";
import { Header } from "components/header";
import arrayMutators from "final-form-arrays";
import dynamic from "next/dynamic";
import { Fragment } from "react";
import { Field, Form, FormSpy } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import { silvia } from "components/video/cv/silvia";

const Video = dynamic(() => import("components/video/cv/player"), {
  ssr: false,
});

const CVPage = () => {
  return (
    <>
      <Header />

      <div className="p-2">
        <MyForm />
      </div>
      <Footer />
    </>
  );
};

export default CVPage;

const MyForm = ({ debug }: { debug?: boolean }) => {
  const downloadFile = (data: any) => {
    // Create a blob with the data we want to download as a file
    const blob = new Blob([JSON.stringify(data)], { type: "json" });
    // Create an anchor element and dispatch a click event on it
    // to trigger a download
    const a = document.createElement("a");
    a.download = "form.json";
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  };

  return (
    <Form
      onSubmit={(value) => downloadFile(value)}
      mutators={{
        ...arrayMutators,
      }}
      initialValues={{
        name: "Il tuo nome",
        color: colors[0],
        positions: [],
        motto: "il tuo motto",
        bio: "sono molto bravo",
      }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className="lg:grid lg:grid-cols-2">
          <div className="space-y-8 divide-y divide-gray-200">
            <div className="space-y-8 divide-y divide-gray-200">
              <div>
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    My CV
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Ti basterà compilare il form in basso e in pochi istanti
                    otterrai il tuo personalissimo e originalissimo video CV.
                  </p>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Nome e Cognome
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <Field
                        component="input"
                        type="text"
                        name="name"
                        id="name"
                        autoComplete="name"
                        className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label
                      htmlFor="bio"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Presentazione
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <Field
                        component="input"
                        type="text"
                        name="bio"
                        id="bio"
                        autoComplete="bio"
                        className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                      />
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      Scrivi una breve presentazione che ti descrive.
                    </p>
                  </div>
                  <div className="sm:col-span-6">
                    <label
                      htmlFor="motto"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Motto
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <Field
                        component="input"
                        type="text"
                        name="motto"
                        id="motto"
                        autoComplete="motto"
                        className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                      />
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      Qual è il tuo motto che ti descrive?
                    </p>
                  </div>

                  <div className="sm:col-span-6">
                    <label
                      htmlFor="image"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Immagine di Profilo
                    </label>
                    <div className="mt-1 flex items-center">
                      <FileImageField name="image" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 ">
                <ColorPicker name="color" />
              </div>

              <div className="pt-8">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Posizioni Lavorative
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Inserisci i dati delle tue posizioni lavorative che
                    appariranno nel cv!
                  </p>
                </div>
                <FieldArray name="positions">
                  {({ fields }) => (
                    <div>
                      {fields.map((name, index) => (
                        <div key={name}>
                          <div className="mt-5 sm:col-span-4">
                            <label
                              htmlFor={`${name}.description`}
                              className="block text-sm font-medium text-gray-700"
                            >
                              Descrizione della posizione
                            </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                              <Field
                                component="input"
                                type="text"
                                name={`${name}.description`}
                                id={`${name}.description`}
                                autoComplete={`${name}.description`}
                                className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                              />
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <div className="sm:col-span-4">
                              <label
                                htmlFor={`${name}.from`}
                                className="mt-4 block text-sm font-medium text-gray-700"
                              >
                                Inizio
                              </label>
                              <div className="mt-1 flex rounded-md shadow-sm">
                                <Field
                                  component="input"
                                  type="text"
                                  name={`${name}.from`}
                                  id={`${name}.from`}
                                  autoComplete={`${name}.from`}
                                  className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                                />
                              </div>
                            </div>
                            <div className="sm:col-span-4">
                              <label
                                htmlFor={`${name}.to`}
                                className="mt-4 block text-sm font-medium text-gray-700"
                              >
                                Fine
                              </label>
                              <div className="mt-1 flex rounded-md shadow-sm">
                                <Field
                                  component="input"
                                  type="text"
                                  name={`${name}.to`}
                                  id={`${name}.to`}
                                  autoComplete={`${name}.to`}
                                  className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 sm:col-span-3">
                            <label
                              htmlFor={`${name}.company`}
                              className="block text-sm font-medium text-gray-700"
                            >
                              Azienda
                            </label>
                            <div className="mt-1">
                              <Field
                                component="input"
                                type="text"
                                name={`${name}.company`}
                                id={`${name}.company`}
                                autoComplete={`${name}.company`}
                                className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                              />
                            </div>
                          </div>
                          <div className="mt-4 sm:col-span-3">
                            <label
                              htmlFor={`${name}.location`}
                              className="block text-sm font-medium text-gray-700"
                            >
                              Luogo di Lavoro
                            </label>
                            <div className="mt-1">
                              <Field
                                component="input"
                                type="text"
                                name={`${name}.location`}
                                id={`${name}.location`}
                                autoComplete={`${name}.location`}
                                className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-6">
                            <label
                              htmlFor={`${name}.image`}
                              className="block text-sm font-medium text-gray-700"
                            >
                              Immagine
                            </label>
                            <FileImageField name={`${name}.image`} />
                          </div>
                          <div className="pt-5">
                            <div className="flex justify-end">
                              <button
                                className="inline-flex justify-center rounded-md border border-transparent bg-red-600 py-1 px-2 text-xs font-medium text-white shadow-sm hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                                onClick={() => fields.remove(index)}
                                type="button"
                              >
                                Rimuovi
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="pt-5">
                        <div className="flex justify-end">
                          <button
                            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-pink-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                            type="button"
                            onClick={(e) => {
                              fields.push({
                                description: "La mia posizione",
                                company: "Azienda S.p.A.",
                                from: "Gennaio 2020",
                                to: "Marzo 2021",
                                location: "Milano",
                              });
                            }}
                          >
                            Aggiungi
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </FieldArray>
              </div>
            </div>

            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  type="button"
                  className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-pink-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
          <div>
            <FormSpy
              render={({ values }) => (
                <div className="grid justify-center">
                  <Video
                    name={values.name}
                    motto={values.motto}
                    positions={values.positions || []}
                    image={values.image}
                    color={values.color}
                    bio={values.bio}
                    qrcode="/qrcode-fy.png"
                  />
                </div>
              )}
            />
          </div>
          {debug && (
            <FormSpy
              render={({ values, valid }) => (
                <div className="fixed top-0 left-0 bottom-0 h-full">
                  <pre>{JSON.stringify({ values, valid }, null, 2)}</pre>
                </div>
              )}
            />
          )}
        </form>
      )}
    />
  );
};

const colors = [
  { id: "red", from: "from-red-400", to: "to-red-600" },
  { id: "orange", from: "from-orange-400", to: "to-orange-600" },
  { id: "amber", from: "from-amber-400", to: "to-amber-600" },
  { id: "lime", from: "from-lime-400", to: "to-lime-600" },
  { id: "emerald", from: "from-emerald-400", to: "to-emerald-600" },
  { id: "teal", from: "from-teal-400", to: "to-teal-600" },
  { id: "sky", from: "from-sky-400", to: "to-sky-600" },
  { id: "blue", from: "from-blue-400", to: "to-blue-600" },
  { id: "indigo", from: "from-indigo-400", to: "to-indigo-600" },
  { id: "violet", from: "from-violet-400", to: "to-violet-600" },
  { id: "fuchsia", from: "from-fuchsia-400", to: "to-fuchsia-600" },
  { id: "rose", from: "from-rose-400", to: "to-rose-600" },
  { id: "slate", from: "from-slate-400", to: "to-slate-600" },
];
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const ColorPicker = ({ name }: { name: string }) => {
  return (
    <Field
      name={name}
      render={({ input, meta }) => (
        <Listbox value={input.value} onChange={input.onChange}>
          {({ open }) => (
            <>
              <Listbox.Label className="block text-sm font-medium text-gray-700">
                Colore principale
              </Listbox.Label>
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                  <div className="flex gap-2 align-middle">
                    <div
                      className={classNames(
                        "h-5 w-5 rounded-full bg-gradient-to-r",
                        input.value.from,
                        input.value.to
                      )}
                    ></div>
                    <span className="block truncate">{input.value.id}</span>
                  </div>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <SelectorIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>

                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {colors.map((color) => (
                      <Listbox.Option
                        key={color.id}
                        className={({ active }) =>
                          classNames(
                            active
                              ? "bg-indigo-600 text-white"
                              : "text-gray-900",
                            "relative cursor-default select-none py-2 pl-3 pr-9"
                          )
                        }
                        value={color}
                      >
                        {({ selected, active }) => (
                          <div className="flex gap-2">
                            <div
                              className={classNames(
                                "h-5 w-5 rounded-full bg-gradient-to-r",
                                color.from,
                                color.to
                              )}
                            ></div>
                            <span
                              className={classNames(
                                selected ? "font-semibold" : "font-normal",
                                "block truncate"
                              )}
                            >
                              {color.id}
                            </span>

                            {selected ? (
                              <span
                                className={classNames(
                                  active ? "text-white" : "text-indigo-600",
                                  "absolute inset-y-0 right-0 flex items-center pr-4"
                                )}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </div>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
      )}
    />
  );
};
