"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { ImageData, Work } from "@/types/categories";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { fetchWorks, setFilteredWorks } from "@/lib/slices/categoriesSlice";
import {
  setSearchQuery,
  setSelectedAuthor,
  setSelectedInstitution,
  setAvailableAuthors,
  setAvailableInstitutions,
  filterWorks,
} from "@/lib/slices/filterSlice";
import { setOneData } from "@/lib/slices/particularDataSlice";

const Page = () => {
  const itemPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useAppDispatch();
  const {
    works,
    filteredWorks: afterFilterFromRedux,
    loading,
    error,
    isFetched,
  } = useAppSelector((state) => state.categories);
  const {
    searchQuery,
    selectedAuthor,
    selectedInstitution,
    availableAuthors,
    availableInstitutions,
  } = useAppSelector((state) => state.filter);

  const displayedCount = currentPage * itemPerPage;
  const filteredWorks = afterFilterFromRedux.slice(0, displayedCount);

  useEffect(() => {
    if (!isFetched && !loading) {
      dispatch(fetchWorks(true));
    }
  }, [isFetched, loading, dispatch]);

  useEffect(() => {
    if (works.length > 0) {
      const authors = Array.from(
        new Set(
          works.map((work) =>
            `${work?.author?.name} ${work?.author?.surnames}`.trim()
          )
        )
      ).sort((a, b) => a.localeCompare(b));
      const institutions = Array.from(
        new Set(works.map((work) => work.institution.name))
      ).sort((a, b) => a.localeCompare(b));

      dispatch(setAvailableAuthors(authors));
      dispatch(setAvailableInstitutions(institutions));
    }
  }, [works, dispatch]);

  useEffect(() => {
    const filtered = filterWorks(
      works,
      searchQuery,
      selectedAuthor,
      selectedInstitution
    );
    dispatch(setFilteredWorks(filtered));
  }, [works, searchQuery, selectedAuthor, selectedInstitution, dispatch]);

  const structuredImageUrl = (imagesData: ImageData): string => {
    const baseUrl = "https://app.alabern.namastech.com/work/";
    const extraFolder = imagesData?.extra_folder;
    const fileName = imagesData?.filename;
    return `${baseUrl}${extraFolder}/${fileName}`;
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
    setCurrentPage(1);
  };

  const handleAuthorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedAuthor(e.target.value === "" ? null : e.target.value));
    setCurrentPage(1);
  };

  const handleInstitutionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(
      setSelectedInstitution(e.target.value === "" ? null : e.target.value)
    );
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="h-screen w-full p-6 flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-full p-6 flex items-center justify-center">
        <p className="text-lg text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full p-6">
      <div className="w-full flex flex-col mb-4">
        <input
          className="px-3 py-2 border border-gray-200 rounded-md"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by name"
        />
      </div>
      <div className="flex items-center justify-start gap-2 my-5">
        <select
          className="border border-gray-200 rounded-full px-3 py-2"
          value={selectedAuthor || ""}
          onChange={handleAuthorChange}
        >
          <option value="">All Authors</option>
          {availableAuthors.map((author) => (
            <option key={author} value={author}>
              {author}
            </option>
          ))}
        </select>
        <select
          className="border border-gray-200 rounded-full px-3 py-2"
          value={selectedInstitution || ""}
          onChange={handleInstitutionChange}
        >
          <option value="">All Institutions</option>
          {availableInstitutions.map((institution) => (
            <option key={institution} value={institution}>
              {institution}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredWorks.length > 0 ? (
          filteredWorks.map((data: Work) => {
            return (
              <Link
                onClick={() => dispatch(setOneData(data))}
                href={`/categories/${data.slug}`}
                key={data.id}
                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="w-full h-[200px]">
                  <Image
                    src={
                      data?.imagesData?.[0]
                        ? structuredImageUrl(data.imagesData[0]).trim()
                        : "/next.svg"
                    }
                    width={data.imagesData?.[0]?.width_box || 500}
                    height={data.imagesData?.[0]?.height_box || 760}
                    alt={data.imagesData?.[0]?.filename || "work-image"}
                    className="w-full "
                  />
                </div>
                <div className="px-4 py-2.5">
                  <p className="font-bold text-center">{data.name}</p>
                  <p className="text-center text-sm">
                    {data?.author?.name} {data?.author?.surnames}, {data.date}
                  </p>
                  <p className="text-center text-sm text-gray-600">
                    {data.institution.name}
                  </p>
                </div>
              </Link>
            );
          })
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">
              No works found matching your filters.
            </p>
          </div>
        )}
      </div>
      <div className="w-full flex items-center justify-center mt-10">
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          className="text-white font-semibold cursor-pointer bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default Page;
