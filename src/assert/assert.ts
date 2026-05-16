export default function assert(trueOrFalse: boolean) {
  if (!trueOrFalse) throw "Fail: The condition is false.";
}
