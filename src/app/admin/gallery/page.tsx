import { prisma } from "@/lib/db";
import GalleryManager from "./_components/GalleryManager";

async function getGalleryItems() {
  try {
    return await prisma.galleryItem.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });
  } catch {
    return null;
  }
}

export default async function GalleryAdminPage() {
  const items = await getGalleryItems();

  return (
    <>
      <div className="admin-topbar">
        <span className="admin-topbar-title">Gallery</span>
      </div>

      <div className="admin-content">
        <div className="admin-page-header">
          <div>
            <h1 className="admin-page-title">Gallery</h1>
            <p className="admin-page-sub">
              {items === null
                ? "Database not connected."
                : `${items.length} image${items.length !== 1 ? "s" : ""}`}
            </p>
          </div>
        </div>

        {items === null ? (
          <div className="admin-alert admin-alert-error">
            <span>⚠</span>
            <span>Could not load gallery. Check your database connection.</span>
          </div>
        ) : (
          <GalleryManager items={items} />
        )}
      </div>
    </>
  );
}
