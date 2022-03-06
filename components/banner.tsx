import React, { ComponentProps, FC } from "react";

interface BannterProps {
  long: string;
  short: string;
  btn: string;
  Icon: FC<ComponentProps<"svg">>;
  href: string;
}

export const Banner = ({ long, btn, short, Icon, href }: BannterProps) => {
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
            <div className="flex-shrink-0  mt-0 w-auto">
              <a
                href={href}
                className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-cyan-600 bg-white hover:bg-cyan-50"
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
