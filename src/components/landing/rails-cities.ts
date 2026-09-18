export const buenosAires = { lat: -34.6037, lng: -58.3816 };

export const originCities = [
  { name: "Madrid", lat: 40.4168, lng: -3.7038 },
  { name: "Miami", lat: 25.7617, lng: -80.1918 },
  { name: "São Paulo", lat: -23.5505, lng: -46.6333 },
  { name: "Ciudad de México", lat: 19.4326, lng: -99.1332 },
  { name: "Berlín", lat: 52.52, lng: 13.405 },
  { name: "Santiago", lat: -33.4489, lng: -70.6693 },
  { name: "Nueva York", lat: 40.7128, lng: -74.006 },
  { name: "Barcelona", lat: 41.3874, lng: 2.1686 },
  { name: "Londres", lat: 51.5074, lng: -0.1278 },
  { name: "Montevideo", lat: -34.9011, lng: -56.1645 },
] as const;

export const railArcs = originCities.map((city, index) => ({
  startLat: city.lat,
  startLng: city.lng,
  endLat: buenosAires.lat,
  endLng: buenosAires.lng,
  name: city.name,
  gap: index * 0.42,
}));

export function projectOrthographic(
  lat: number,
  lng: number,
  cx: number,
  cy: number,
  radius: number,
  centerLat = -18,
  centerLng = -42,
) {
  const latR = (lat * Math.PI) / 180;
  const lngR = (lng * Math.PI) / 180;
  const cLat = (centerLat * Math.PI) / 180;
  const cLng = (centerLng * Math.PI) / 180;
  const cosc =
    Math.sin(cLat) * Math.sin(latR) +
    Math.cos(cLat) * Math.cos(latR) * Math.cos(lngR - cLng);
  if (cosc < 0) return null;
  return {
    x: cx + radius * Math.cos(latR) * Math.sin(lngR - cLng),
    y:
      cy -
      radius *
        (Math.cos(cLat) * Math.sin(latR) -
          Math.sin(cLat) * Math.cos(latR) * Math.cos(lngR - cLng)),
  };
}
