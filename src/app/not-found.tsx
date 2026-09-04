import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex flex-1 items-center justify-center py-24">
      <div className="container-main text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand">404</p>
        <h1 className="mt-3 text-3xl font-bold text-heading">Page Not Found</h1>
        <p className="mt-3 text-muted">The page you are looking for does not exist.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Button href="/">Back to Home</Button>
          <Button href="/contact" variant="secondary">
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
}
