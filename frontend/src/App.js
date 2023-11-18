import SearchForm from "./components/SearchForm";

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
          <SearchForm />
        </div>
      </div>
    </div>
  );
}
