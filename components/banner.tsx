import React, { ComponentProps, FC } from "react";

interface BannterProps {
  long: string;
  short: string;
  btn: string;
  Icon: FC<ComponentProps<"svg">>;
}

export const Banner = ({ long, btn, short, Icon }: BannterProps) => {
  return (
    <div className="mb-4">
      <div className="">
        <div className="p-2 bg-cyan-600 shadow-lg sm:p-3">
          <div className="flex items-center justify-between flex-wrap">
            <div className="w-0 flex-1 flex items-center">
              <span className="flex p-2 rounded-lg bg-cyan-800">
                <Icon className="h-6 w-6 text-white" aria-hidden="true" />
              </span>
              <p className="ml-3 font-medium text-white truncate">
                <span className="md:hidden">{short}</span>
                <span className="hidden md:inline">{long}</span>
              </p>
            </div>
            <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
              <a
                href="#"
                className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50"
              >
                {btn}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
