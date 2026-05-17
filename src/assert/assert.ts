export default function assert(trueOrFalse: boolean, message?: string) {
  if (!trueOrFalse) throw message || "Fail: The condition is false.";
}
