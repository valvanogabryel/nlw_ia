import { ReactNode } from "react";

export function Container({ children }: { children: ReactNode }) {
  return (
    <main className="flex gap-6 flex-col sm:flex-row md:flex-1 p-6">
      {children}
    </main>
  );
}
