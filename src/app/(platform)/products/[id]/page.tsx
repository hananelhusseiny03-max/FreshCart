import ProductDetailsScreen from "@/app/features/products/screen/product-details.screen";

type ProductDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { id } = await params;

  return (
    <>
      <ProductDetailsScreen productId={id} />
    </>
  );
}