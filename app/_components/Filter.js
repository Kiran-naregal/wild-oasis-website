"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Filter() {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const filter = searchParams.get("capacity") || "all";

    function handleClick(filter) {
        const params = new URLSearchParams(searchParams);
        params.set("capacity", filter);
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }

    return (
        <div className="flex">
            <button className={`px-5 py-2 hover:bg-primary-600 ${filter === "all" && "bg-primary-600"}`} onClick={() => { handleClick("all") }}>All cabins</button>
            <button className={`px-5 py-2 hover:bg-primary-600 ${filter === "small" && "bg-primary-600"}`} onClick={() => { handleClick("small") }}>1&mdash;3 prople</button>
            <button className={`px-5 py-2 hover:bg-primary-600 ${filter === "medium" && "bg-primary-600"}`} onClick={() => { handleClick("medium") }}>4&mdash;7 prople</button>
            <button className={`px-5 py-2 hover:bg-primary-600 ${filter === "large" && "bg-primary-600"}`} onClick={() => { handleClick("large") }}>8&mdash;12 prople</button>
        </div>
    )
}
