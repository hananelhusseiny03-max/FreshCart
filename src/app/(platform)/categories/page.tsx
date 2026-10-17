import Image from "next/image";
import Link from "next/link";

import { getAllCategories } from "@/app/features/categories/server/categories.actions";
import type { Category } from "@/app/features/categories/types/categoriesTypes";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  let categories: Category[] = [];

  try {
    const response = await getAllCategories();
    categories = response?.data ?? [];
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      {/* Hero Section */}
      <section
        className="text-white"
        style={{
          background:
            "linear-gradient(to right, #16b957, #20c768, #48db85)",
        }}
      >
        <div className="mx-auto max-w-[1800px] px-5 py-12 md:px-8 md:py-16">
          <nav
            aria-label="Breadcrumb"
            className="mb-7 flex items-center gap-3 text-sm md:text-base"
          >
            <Link
              href="/"
              className="text-white/80 transition hover:text-white"
            >
              Home
            </Link>

            <span>/</span>
            <span className="font-medium">Categories</span>
          </nav>

          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/20 shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-10 w-10"
                aria-hidden="true"
              >
                <path d="m12 2 10 5-10 5L2 7l10-5Zm-8 9 8 4 8-4v3l-8 4-8-4v-3Zm0 6 8 4 8-4v-3l-8 4-8-4v3Z" />
              </svg>
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                All Categories
              </h1>

              <p className="mt-2 text-base text-white/90 md:text-lg">
                Browse our wide range of product categories
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Cards */}
      <section className="mx-auto max-w-[1800px] px-5 py-10 md:px-7 md:py-12">
        {categories.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {categories.map((category) => (
              <Link
                key={category._id}
                href={`/categories/${category._id}`}
                className="group flex flex-col items-center rounded-[22px] border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
                style={{ minHeight: "310px" }}
              >
                <div
                  className="relative w-full overflow-hidden rounded-2xl bg-gray-50"
                  style={{ height: "230px" }}
                >
                  {category.image ? (
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                      className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-gray-400">
                      No image available
                    </div>
                  )}
                </div>

                <h2 className="mt-5 text-center text-lg font-semibold text-gray-900 transition-colors group-hover:text-primary-600">
                  {category.name}
                </h2>

                <span className="mt-3 text-sm font-medium text-primary-600 opacity-0 transition-opacity group-hover:opacity-100">
                  View Subcategories →
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-white px-5 py-16 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800">
              No categories available
            </h2>

            <p className="mt-2 text-gray-500">
              Please try again later.
            </p>

            <Link
              href="/shop"
              className="mt-6 inline-flex rounded-full bg-primary-600 px-6 py-3 font-medium text-white transition hover:bg-primary-700"
            >
              Browse Products
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}