// app/(client)/warehouse/page.tsx
import WarehouseClient from "@/components/WarehouseShowcase";
import { getWarehouseShowcase } from "@/sanity/queries";

export default async function WarehousePage() {
  const data = await getWarehouseShowcase();

  // Transform the data to match WarehouseClient's expected type
  const transformedData = data
    ? {
        ...data,
        // Handle location transformation: null → undefined
        location: data.location
          ? {
              latitude: data.location.latitude,
              longitude: data.location.longitude,
              address: data.location.address,
            }
          : undefined,
      }
    : undefined;

  return <WarehouseClient initialData={transformedData} />;
}
