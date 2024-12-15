self.onmessage = function(message) {
  const { filter, imageData } = message.data;
  const data = imageData.data;

  switch (filter) {
    case 'grayscale':
        for (let i = 0; i < data.length; i += 4) {
            const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i] = data[i + 1] = data[i + 2] = avg; // Red, Green, Blue
        }
        break;
    case 'sepia':
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i], g = data[i + 1], b = data[i + 2];
            data[i] = r * 0.393 + g * 0.769 + b * 0.189; // Red
            data[i + 1] = r * 0.349 + g * 0.686 + b * 0.168; // Green
            data[i + 2] = r * 0.272 + g * 0.534 + b * 0.131; // Blue
        }
        break;
    case 'brightness':
        for (let i = 0; i < data.length; i += 4) {
            data[i] += 40; // Red
            data[i + 1] += 40; // Green
            data[i + 2] += 40; // Blue
        }
        break;
    default:
        break;
}
  postMessage({ imageData });
};