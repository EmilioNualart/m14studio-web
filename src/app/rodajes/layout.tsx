// Layout pass-through. Las áreas pública y admin tienen sus propios layouts
// con temas distintos (oscuro / claro) usando route groups: (public) y admin.
export default function RodajesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
