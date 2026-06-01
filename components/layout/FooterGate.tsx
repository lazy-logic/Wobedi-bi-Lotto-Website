/**
 * FooterGate — the only client-side piece of the footer.
 *
 * The footer markup itself (Footer.tsx) is a pure server component. This tiny
 * wrapper reads the pathname and hides the footer inside /admin, where the
 * admin chrome owns its own layout. Keeping the path check here means the whole
 * footer tree (logo Image, icons, link lists) never ships to or hydrates on the
 * client on public pages.
 */
"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./Footer";

export function FooterGate() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return <Footer />;
}
