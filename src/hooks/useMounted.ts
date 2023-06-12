import { useState, useEffect } from 'react';

/**
 * @description 页面是否加载完成
 */
function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return mounted;
}

export default useMounted;
