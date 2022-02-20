import Link from "next/link";
import React from "react";

interface PaginationPros {
  pageCount: number;
  currentPage: number;
  basePath: string;
}

function getPage(nextPage: number, basePath: string) {
  if (nextPage === 1) {
    return `/${basePath}`;
  } else {
    return `/${basePath}/page/${nextPage}`;
  }
}

export const Pagination = (props: PaginationPros) => {
  const hasPreviousPage = props.currentPage > 0;
  const hasNextPage = props.currentPage < props.pageCount;

  let pages: (number | "...")[] = [];
  if (props.pageCount <= 6) {
    pages = Array.from(new Array(props.pageCount)).map((_, i) => i + 1);
  } else {
    pages = [
      1,
      2,
      3,
      "...",
      props.pageCount - 2,
      props.pageCount - 1,
      props.pageCount,
    ];
  }
  return (
    <nav className="border-t m-auto max-w-xl border-gray-200 px-4 flex items-center justify-between sm:px-0">
      <div className="w-0 flex-1 flex">
        {hasPreviousPage ? (
          <Link href={getPage(props.currentPage - 1, props.basePath)}>
            <a className="-mt-px border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm leading-5 font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-400 transition ease-in-out duration-150">
              <svg
                className="mr-3 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Previous
            </a>
          </Link>
        ) : null}
      </div>
      <div className="hidden md:flex">
        {pages.map((p) => {
          if (p === "...") {
            return (
              <div
                key="..."
                className={`-mt-px border-t-2 border-transparent pt-4 px-4 inline-flex items-center text-sm leading-5 font-medium text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 focus:border-gray-400 transition ease-in-out duration-150`}
              >
                ...
              </div>
            );
          }
          return (
            <Link key={p} href={getPage(p, props.basePath)}>
              <a
                className={`-mt-px border-t-2 ${
                  p === props.currentPage
                    ? "border-indigo-500"
                    : "border-transparent"
                } pt-4 px-4 inline-flex items-center text-sm leading-5 font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-400 transition ease-in-out duration-150`}
              >
                {p}
              </a>
            </Link>
          );
        })}
      </div>
      {hasNextPage ? (
        <div className="w-0 flex-1 flex justify-end">
          <Link href={getPage(props.currentPage + 1, props.basePath)}>
            <a className="-mt-px border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm leading-5 font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-400 transition ease-in-out duration-150">
              Next
              <svg
                className="ml-3 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </Link>
        </div>
      ) : (
        <div className="w-0 flex-1 flex justify-end"></div>
      )}
    </nav>
  );
};
