export const Backoff = {
  async exponentialBackoff<T>(
    handler: () => T | Promise<T>,
    maxRetries: number = 5,
    interval: number = 1000
  ): Promise<T> {
    let retries = 0;
    while (retries < maxRetries) {
      try {
        return await handler();
      } catch (error) {
        console.error(error);
        retries++;
        if (retries >= maxRetries) {
          throw error;
        }
        await new Promise((resolve) => setTimeout(resolve, interval * Math.pow(2, retries) * (1 + Math.random())));
      }
    }
    throw new Error('Exponential backoff failed. retries: ' + retries);
  }
};
