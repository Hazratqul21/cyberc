// Deterministik psevdo-tasodifiy son (0..1). Sof funksiya — render paytida
// chaqirilishi xavfsiz va natija har safar bir xil (demo uchun barqaror).
export function rnd(seed) {
  const x = Math.sin(seed * 12.9898) * 43758.5453
  return x - Math.floor(x)
}
