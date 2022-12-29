export function workerBuilder(worker: unknown) {
  const blob = new Blob([`(${worker})()`]);
  return new Worker(URL.createObjectURL(blob));
}
