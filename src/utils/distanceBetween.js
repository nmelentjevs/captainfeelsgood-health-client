const distanceBetween = (checkPoint, centerPoint, km = false) => {
  const ky = 40000 / 360;
  const kx = Math.cos((Math.PI * centerPoint.location.latitude) / 180.0) * ky;
  const dx = Math.abs(centerPoint.location.longitude - checkPoint[0]) * kx;
  const dy = Math.abs(centerPoint.location.latitude - checkPoint[1]) * ky;
  if (km) {
    return Math.sqrt(dx * dx + dy * dy) <= km;
  }

  return Math.sqrt(dx * dx + dy * dy);
};

export default distanceBetween;
