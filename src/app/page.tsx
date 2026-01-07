"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import { fetchWorks } from "@/lib/slices/categoriesSlice";
import {
  setSearchQuery,
  setSelectedAuthor,
  setSelectedInstitution,
  setAvailableAuthors,
  setAvailableInstitutions,
} from "@/lib/slices/filterSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    searchQuery,
    selectedAuthor,
    selectedInstitution,
    availableAuthors,
    availableInstitutions,
  } = useAppSelector((state) => state.filter);

  const { works, isFetched, loading } = useAppSelector(
    (state) => state.categories
  );

  useEffect(() => {
    if (!isFetched && !loading) {
      dispatch(fetchWorks(true));
    }
  }, [isFetched, loading, dispatch]);

  useEffect(() => {
    router.push("/categories");
  });

  useEffect(() => {
    if (works.length > 0) {
      const authors = Array.from(
        new Set(
          works.map((work) =>
            `${work.author.name} ${work.author.surnames}`.trim()
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleAuthorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedAuthor(e.target.value === "" ? null : e.target.value));
  };

  const handleInstitutionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(
      setSelectedInstitution(e.target.value === "" ? null : e.target.value)
    );
  };

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
      <div className="text-center">
        <Link
          href="/categories"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          View All Categories
        </Link>
      </div>
    </div>
  );
}
