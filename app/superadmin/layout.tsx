export default function SuperAdminRootLayout({ children }: { children: React.ReactNode }) {
  // No Navbar/Footer — admin panel uses its own layout inside (admin) group
  return <>{children}</>;
}
