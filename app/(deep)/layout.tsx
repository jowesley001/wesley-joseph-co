import { Footer } from "@/components/layout/Footer";

export default function DeepRouteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
