/** Public assets need the same build-time prefix as Next.js routes. */
export function assetPath(path: `/${string}`): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}
