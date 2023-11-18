export default function App() {
  return (
    <div className="bg-white font-inter text-dyte-grey py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="mb-10 md:mb-16">
          <h2 className="font-plus-jakarta-sans text-dyte-blue mb-4 text-center text-2xl font-bold md:mb-6 lg:text-3xl">
            Log Ingestor and Query Interface
          </h2>

          <p className="mx-auto max-w-screen-md text-center md:text-lg">
            Log ingestor and query interface for efficient log data management.
            Ingest logs over HTTP and seamlessly query logs with full-text
            search and various field filters.
          </p>
        </div>
        <form className="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label
              for="search"
              className="mb-2 inline-block text-sm text-dyte-grey sm:text-base"
            >
              Search
            </label>
            <input
              name="search"
              className="w-full rounded border bg-gray-50 px-3 py-2 text-dyte-grey outline-none ring-indigo-300 transition duration-100 focus:ring"
            />
          </div>
          <div>
            <label
              for="start-date"
              className="mb-2 inline-block text-sm text-dyte-grey sm:text-base"
            >
              Start date
            </label>
            <input
              name="start-date"
              className="w-full rounded border bg-gray-50 px-3 py-2 text-dyte-grey outline-none ring-indigo-300 transition duration-100 focus:ring"
            />
          </div>

          <div>
            <label
              for="end-date"
              className="mb-2 inline-block text-sm text-dyte-grey sm:text-base"
            >
              End date
            </label>
            <input
              name="end-date"
              className="w-full rounded border bg-gray-50 px-3 py-2 text-dyte-grey outline-none ring-indigo-300 transition duration-100 focus:ring"
            />
          </div>

          <div className="sm:col-span-2">
            <label
              for="message"
              className="mb-2 inline-block text-sm text-dyte-grey sm:text-base"
            >
              Message
            </label>
            <textarea
              name="message"
              className="h-64 w-full rounded border bg-gray-50 px-3 py-2 text-dyte-grey outline-none ring-indigo-300 transition duration-100 focus:ring"
            ></textarea>
          </div>

          <div className="flex items-center justify-between sm:col-span-2">
            <button className="inline-block rounded-lg bg-dyte-blue px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">
              Search
            </button>

            <span className="text-sm text-gray-500">*Required</span>
          </div>
        </form>
      </div>
    </div>
  );
}
