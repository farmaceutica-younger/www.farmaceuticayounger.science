import { Event } from "@prisma/client";
import Link from "next/link";
import { resizeCloudinaryImage } from "utils/cloudinary-url";
import {
  formatDate,
  formatDateTime,
  formatTime,
  getEventDate,
} from "utils/dates";

export interface EventCTAProps {
  event: Pick<
    Event,
    | "description"
    | "startDate"
    | "endDate"
    | "title"
    | "location"
    | "featuredImage"
    | "slug"
  >;
}

export const EventCTA = ({ event }: EventCTAProps) => {
  return (
    <div className="relative bg-white py-16">
      <div
        className="absolute inset-x-0 top-0 hidden h-1/2 bg-gray-50 lg:block"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-7xl bg-pink-600 lg:bg-transparent lg:px-8">
        <div className="lg:grid lg:grid-cols-12">
          <div className="relative z-10 lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:bg-transparent lg:py-16">
            <div
              className="absolute inset-x-0 h-1/2 bg-gray-50 lg:hidden"
              aria-hidden="true"
            />
            <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-none lg:p-0">
              <div className="aspect-w-10 aspect-h-6 sm:aspect-w-2 sm:aspect-h-1 lg:aspect-w-1">
                <img
                  className="rounded-3xl object-cover object-center shadow-2xl"
                  src={resizeCloudinaryImage(event.featuredImage, 800)}
                  alt={event.title}
                />
              </div>
            </div>
          </div>

          <div className="relative bg-pink-600 lg:col-span-10 lg:col-start-3 lg:row-start-1 lg:grid lg:grid-cols-10 lg:items-center lg:rounded-3xl">
            <div
              className="absolute inset-0 hidden overflow-hidden rounded-3xl lg:block"
              aria-hidden="true"
            >
              <svg
                className="absolute bottom-full left-full translate-y-1/3 -translate-x-2/3 transform xl:bottom-auto xl:top-0 xl:translate-y-0"
                width={404}
                height={384}
                fill="none"
                viewBox="0 0 404 384"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x={0}
                      y={0}
                      width={4}
                      height={4}
                      className="text-pink-500"
                      fill="currentColor"
                    />
                  </pattern>
                </defs>
                <rect
                  width={404}
                  height={384}
                  fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)"
                />
              </svg>
              <svg
                className="absolute top-full -translate-y-1/3 -translate-x-1/3 transform xl:-translate-y-1/2"
                width={404}
                height={384}
                fill="none"
                viewBox="0 0 404 384"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x={0}
                      y={0}
                      width={4}
                      height={4}
                      className="text-pink-500"
                      fill="currentColor"
                    />
                  </pattern>
                </defs>
                <rect
                  width={404}
                  height={384}
                  fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)"
                />
              </svg>
            </div>
            <div className="relative mx-auto max-w-md space-y-6 py-12 px-4 sm:max-w-3xl sm:py-16 sm:px-6 lg:col-span-6 lg:col-start-4 lg:max-w-none lg:p-0">
              <div>
                <h2
                  className="text-4xl font-extrabold text-white"
                  id="join-heading"
                >
                  {event.title}
                </h2>
                <h3 className="mt-4 text-xl font-normal text-white">
                  📍 {event.location}
                </h3>
                <h3 className="text-xl italic text-white">
                  📅 {getEventDate(event.startDate, event.endDate)}
                </h3>
              </div>
              <p className="text-lg text-white">{event.description}</p>
              <Link href={`/events/${event.slug}`}>
                <a className="block w-full rounded-md border border-transparent bg-white py-3 px-5 text-center text-base font-medium text-pink-700 shadow-md hover:bg-gray-50 sm:inline-block sm:w-auto">
                  Scopri di più
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
