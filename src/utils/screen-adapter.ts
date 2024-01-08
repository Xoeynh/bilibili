/**
 * @description 屏幕自适应
 */
export default function screenAdapter() {
  let clientWidth =
    document.documentElement.clientWidth || document.body.clientWidth;

  if (clientWidth >= 640) {
    clientWidth = 640;
  }

  const fontSize = (20 / 375) * clientWidth;
  document.documentElement.style.fontSize = fontSize + 'px';
}
