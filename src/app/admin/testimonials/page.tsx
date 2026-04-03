import { prisma } from "@/lib/db";
import TestimonialsManager from "./_components/TestimonialsManager";

async function getTestimonials() {
  try {
    return await prisma.testimonial.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return null;
  }
}

export default async function TestimonialsAdminPage() {
  const testimonials = await getTestimonials();

  return (
    <>
      <div className="admin-topbar">
        <span className="admin-topbar-title">Testimonials</span>
      </div>

      <div className="admin-content">
        <div className="admin-page-header">
          <div>
            <h1 className="admin-page-title">Testimonials</h1>
            <p className="admin-page-sub">
              {testimonials === null
                ? "Database not connected."
                : `${testimonials.length} testimonial${testimonials.length !== 1 ? "s" : ""}`}
            </p>
          </div>
        </div>

        {testimonials === null ? (
          <div className="admin-alert admin-alert-error">
            <span>⚠</span>
            <span>Could not load testimonials. Check your database connection.</span>
          </div>
        ) : (
          <TestimonialsManager testimonials={testimonials} />
        )}
      </div>
    </>
  );
}
