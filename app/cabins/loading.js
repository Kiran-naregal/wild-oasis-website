import Spinner from "@/app/_components/Spinner";

export default function loading() {
    return (
        <div className="grid items-center justify-center">
            <Spinner />
            <p className="text-primary-200 text-xl">Loading cabins data ...</p>
        </div>
    )
}