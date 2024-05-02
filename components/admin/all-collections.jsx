"use client";
import Link from "next/link";
import Image from "next/image";
import { deleteDocument } from "@/utils/functions";
import { useAllCollections } from "@/hooks/useAllCollections";
import { toast } from "react-hot-toast";

const AllCollections = () => {
  const { collections, isLoading, isError } = useAllCollections();

  if(isLoading) {
    return <div>Loading...</div>
  }

  if(isError) {
    return <div>Error loading data</div>
  }

  return (
    <div className="">
      <div className="bg-black flex justify-between items-center px-4 py-2">
        <div>
          <h1 className="text-white text-lg font-bold">All collections</h1>
        </div>
        <div>
        <p className="text-white">Total: {collections.length}</p>
        </div>
      </div>
        <div className="flex flex-col gap-4 px-2 relative top-4">
          {collections.map((collection) => (
            <div
              key={collection.id}
              className={`flex flex-col items-start bg-gray-100 p-1 rounded-lg w-full gap-2`}
            >
              <div className="flex justify-center items-center gap-2">
                {collection.images.length > 0 ? (
                  <Image
                    className="h-16 w-20 rounded-md object-cover"
                    src={collection.images[0].src}
                    width={60}
                    height={80}
                    alt={collection.name}
                    priority={true}
                  />
                ) : (
                  <div className="h-16 w-20 rounded-md object-cover bg-gray-300">
                    No image
                  </div>
                )}
                <div className="">
                  <h3 className="text-gray-700">{collection.title}</h3>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  className="flex justify-center gap-2 rounded-md border px-1 text-red-600 font-medium"
                  onClick={() => {
                    try {
                      deleteDocument("collections", collection.id);
                      toast.success(`Item deleted succesfully.`);
                    } catch (error) {
                      console.error("Error deleting collection:", error);
                    }
                  }}
                >
                  Delete
                </button>
                <Link
                  className={`flex items-center gap-2 rounded-md border px-1 text-[#007AFF]`}
                  href={`/collections/${collection.id}`}
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
    </div>
  );
};

export default AllCollections;
