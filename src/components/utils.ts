export function wedge<T, S = T>(array: T[], separator: S) {
  return array.flatMap((v) => [separator, v]).slice(1);
}
