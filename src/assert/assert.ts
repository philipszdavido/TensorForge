export default function assert(
  condition: boolean,
  message?: string,
): asserts condition {
  if (!condition) {
    throw new Error(message || "Fail: The condition is false.");
  }
}
