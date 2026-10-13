import { getProducts } from "@/app/features/products/server/products.actions";
import ProductCard from "../../products/components/ProductCard";

export default async function FeaturedProducts() {
  const response = await getProducts();

  return (
    <>
      <section className="py-10">
        <div className="container mx-auto">
          <div className="flex items-center gap-3 my-8">
            <div className="h-8 w-1.5 bg-linear-to-b from-emerald-500 to-emerald-700 rounded-full"></div>

            <h2 className="text-3xl font-bold text-gray-800">
              Featured <span className="text-emerald-600">Products</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {response.data.map((product) => (<ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}