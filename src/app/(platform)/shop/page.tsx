
import Link from "next/link";
import {
  getProducts,
  getProductsByBrand,
} from "@/app/features/products/server/products.actions";
import { getBrandById } from "@/app/features/categories/server/brands.actions";
import ProductCard from "@/app/features/products/components/ProductCard";
import "./shop.css";

export const dynamic = "force-dynamic";

type ShopPageProps = {
  searchParams: Promise<{
    brand?: string;
  }>;
};

export default async function ShopPage({
  searchParams,
}: ShopPageProps) {
  const { brand: brandId } = await searchParams;

  let products: any[] = [];
  let brandName = "";
  let errorMessage = "";

  try {
    if (brandId) {
      const [productsResponse, brandResponse] = await Promise.all([
        getProductsByBrand({ brandId }),
        getBrandById({ id: brandId }),
      ]);

      products = productsResponse?.data ?? [];
      brandName = brandResponse?.data?.name ?? "";
    } else {
      const response = await getProducts();
      products = response?.data ?? [];
    }
  } catch (error) {
    console.error("Failed to load products:", error);
    errorMessage = "We couldn't load the products right now.";
  }

  const pageTitle = brandId ? brandName || "Brand Products" : "All Products";
  const pageDescription = brandId
    ? `Explore products from ${brandName || "your selected brand"}`
    : "Explore our complete product collection";

  return (
    <main className="shop-page">
      <section className="shop-hero">
        <div className="shop-container">
          <nav className="shop-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>

            {brandId && (
              <>
                <Link href="/brands">Brands</Link>
                <span>/</span>
              </>
            )}

            <span className="breadcrumb-current">{pageTitle}</span>
          </nav>

          <div className="shop-hero-content">
            <div className="shop-hero-icon">
              <svg
                width="44"
                height="44"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m12 3 9 5-9 5-9-5 9-5Z" />
                <path d="m3 8 9 5 9-5" />
                <path d="M3 8v8l9 5 9-5V8" />
                <path d="m9 10 6-3" />
              </svg>
            </div>

            <div>
              <h1>{pageTitle}</h1>
              <p>{pageDescription}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="shop-products-section">
        <div className="shop-container">
          <div className="shop-results-header">
            <p>
              Showing <strong>{products.length}</strong>{" "}
              {products.length === 1 ? "product" : "products"}
              {brandId && brandName ? ` from ${brandName}` : ""}
            </p>
          </div>

          {errorMessage ? (
            <div className="shop-empty-state">
              <h2>Something went wrong</h2>
              <p>{errorMessage}</p>
              <Link href="/brands" className="shop-back-home">
                Back to Brands
              </Link>
            </div>
          ) : products.length > 0 ? (
            <div className="shop-products-grid">
              {products.map((product) => (
                <ProductCard
                  key={product._id || product.id}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <div className="shop-empty-state">
              <div className="empty-icon">🛍️</div>
              <h2>
                {brandId
                  ? `No products found${brandName ? ` for ${brandName}` : " for this brand"}`
                  : "No products available"}
              </h2>
              <p>
                {brandId
                  ? "There are no products to display for this brand right now."
                  : "We couldn't load the products right now. Please try again later."}
              </p>

              <Link
                href={brandId ? "/brands" : "/"}
                className="shop-back-home"
              >
                {brandId ? "Back to Brands" : "Back to Home"}
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}


