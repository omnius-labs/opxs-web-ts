export const Backoff = {
  async exponentialBackoff(
    handler: () => Promise<boolean>,
    maxRetries: number = 5,
    interval: number = 1000,
    maxInterval: number = 30000
  ): Promise<void> {
    let retries = 0;
    while (retries < maxRetries) {
      const success = await handler();
      if (success) {
        return;
      }
      const sleepTime = Math.min(maxInterval, interval * Math.pow(2, retries) * (1 + Math.random()));
      await new Promise((resolve) => setTimeout(resolve, sleepTime));
    }
    throw new Error('Exponential backoff failed. retries: ' + retries);
  }
};
