import CabinCard from "../_components/CabinCard";
import { getCabins } from "../_lib/data-service";

export default async function CabinList({ filter }) {
    const cabins = await getCabins();

    let filteredCabins = cabins;
    if (filter === "small") filteredCabins = filteredCabins.filter(cabin => cabin.maxCapacity <= 3);
    if (filter === "medium") filteredCabins = filteredCabins.filter(cabin => (cabin.maxCapacity > 3 && cabin.maxCapacity < 8));
    if (filter === "large") filteredCabins = filteredCabins.filter(cabin => cabin.maxCapacity >= 8);

    return (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
            {filteredCabins.map((cabin) => (
                <CabinCard cabin={cabin} key={cabin.id} />
            ))}
        </div>
    )
}
