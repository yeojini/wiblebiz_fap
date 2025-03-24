async function initMocks() {
  try {
    if (typeof window !== 'undefined') {
      const { worker } = await import('./browser');
      await worker.start();
      console.log(
        '%c🔶 MSW가 활성화되었습니다.',
        'color: orange; font-weight: bold;',
      );
    }
  } catch (error) {
    console.error('[MSW] Failed to initialize:', error);
  }
}

export { initMocks };
