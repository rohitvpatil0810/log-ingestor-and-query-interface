import { useEffect, useState } from "react";
import Select from "react-select";
import ReactJson from "react-json-view";
import themes from "../constants/rjvThemes";
import ReactLoading from "react-loading";

export default function SearchForm() {
  const currentDate = new Date().toISOString().split("T")[0];
  const [uniqueValues, setUniqueValues] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({});
  const [filters, setFilters] = useState({});
  const [logs, setLogs] = useState({});
  const [error, setError] = useState("");
  const [outputTheme, setOutputTheme] = useState({
    label: "rjv-default",
    value: "rjv-default",
  });
  const [loading, setLoading] = useState(false);

  const handleStartDateChange = (e) => {
    const startDate = e.target.value;
    const endDate = filters.timestampEnd;

    if (startDate && endDate && startDate > endDate) {
      setError("Start date should be less than end date");
    } else {
      setError("");
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      timestampStart: startDate,
    }));
  };

  const handleEndDateChange = (e) => {
    const startDate = filters.timestampStart;
    const endDate = e.target.value;

    if (startDate && endDate && startDate > endDate) {
      setError("Start date should be less than end date");
    } else {
      setError("");
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      timestampEnd: endDate,
    }));
  };

  useEffect(() => {
    const fetchUniqueValues = async () => {
      let apiUrl = process.env.REACT_APP_API_URL;
      try {
        const response = await fetch(apiUrl + "/logs/unique-values"); // Replace with your actual endpoint
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setUniqueValues(data.data);
      } catch (error) {
        console.log(error);
        console.error("Error fetching unique values:", error.message);
      }
    };

    fetchUniqueValues();
  }, []);

  const searchLogs = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let apiUrl = process.env.REACT_APP_API_URL;
      const response = await fetch(apiUrl + "/logs/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          searchQuery,
          filters,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setLogs(data.data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
    setLoading(false);
  };

  const handleFilterChange = (field, selectedOption) => {
    console.log(field);
    console.log(selectedOption);
    setFilters((prevFilters) => {
      prevFilters[field] = selectedOption.map((options) => options.label);
      console.log(prevFilters[field]);
      return prevFilters;
    });
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [field]: selectedOption,
    }));
  };

  const options = Object.entries(uniqueValues).map(([field, values]) => ({
    label: field,
    options: values.map((value) => ({ value, label: value })),
  }));

  return (
    <form
      onSubmit={searchLogs}
      className="mt-5 font-inter mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2"
    >
      <div className="sm:col-span-2">
        <label
          for="search"
          className="mb-2 inline-block text-sm text-dyte-grey sm:text-base"
        >
          Search
        </label>
        <input
          placeholder="Search for logs..."
          name="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
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
          type="date"
          value={filters.timestampStart}
          onChange={handleStartDateChange}
          max={currentDate}
        />
        {error && <p className="text-red-500">{error}</p>}
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
          type="date"
          value={filters.timestampEnd}
          onChange={handleEndDateChange}
          max={currentDate}
        />
      </div>

      {options.map((option) => (
        <div key={option.label}>
          <label className="mb-2 inline-block text-sm text-dyte-grey sm:text-base">
            {option.label}
          </label>
          <Select
            isMulti
            options={option.options}
            value={selectedFilters[option.label]}
            onChange={(selectedOption) =>
              handleFilterChange(option.label, selectedOption)
            }
            isSearchable
            isClearable
            className="mb-2"
          />
        </div>
      ))}
      {loading ? (
        <div className="flex items-center justify-between sm:col-span-2">
          <ReactLoading type={`bubbles`} color={`#2160FD`} />

          {/* <span className="text-sm text-gray-500">*Required</span> */}
        </div>
      ) : (
        <div className="flex items-center justify-between sm:col-span-2">
          <button
            disabled={error}
            type="submit"
            className="disabled:bg-slate-500 inline-block rounded-lg bg-dyte-blue px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-blue-600 focus-visible:ring active:bg-blue-700 md:text-base"
          >
            Search
          </button>

          {/* <span className="text-sm text-gray-500">*Required</span> */}
        </div>
      )}

      <div className="sm:col-span-2">
        <label className="mb-2 inline-block text-sm text-dyte-grey sm:text-base">
          Theme
        </label>
        <Select
          value={outputTheme}
          onChange={(selectedOption) => setOutputTheme(selectedOption)}
          options={themes}
          isSearchable
          isClearable
          className="mb-2"
        />
      </div>
      <div className="sm:col-span-2">
        <div className="mb-2 inline-block text text-dyte-blue font-bold font-plus-jakarta-sans sm:text-base">
          Search Results:
        </div>
        <ReactJson src={logs} name={false} theme={outputTheme.label} />
      </div>
    </form>
  );
}
