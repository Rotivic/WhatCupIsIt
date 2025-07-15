let dbLock: Promise<void> = Promise.resolve();

export async function withDbLock<T>(fn: () => Promise<T>): Promise<T> {
  let release: () => void;
  const next = new Promise<void>((res) => (release = res));
  const prev = dbLock;
  dbLock = dbLock.then(() => next);
  await prev;
  try {
    return await fn();
  } finally {
    release!();
  }
}
