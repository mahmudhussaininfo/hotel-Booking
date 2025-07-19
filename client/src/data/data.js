const data = [
  {
    location: "London",
    latitude: 51.5073219,
    longitude: -0.1276474,
  },
  {
    location: "Kolkata",
    latitude: 22.5726723,
    longitude: 88.3638815,
  },
  {
    location: "Dhaka",
    latitude: 23.8103,
    longitude: 90.4125,
  },
  {
    location: "Singapore",
    latitude: 1.2899175,
    longitude: 103.8519072,
  },
  {
    location: "New York",
    latitude: 40.7127281,
    longitude: -74.0060152,
  },
  {
    location: "Toronto",
    latitude: 43.6534817,
    longitude: -79.3839347,
  },
  {
    location: "Copenhagen",
    latitude: 55.6761,
    longitude: 12.5683,
  },
  {
    location: "Kathmandu",
    latitude: 27.7103,
    longitude: 85.3222,
  },
  {
    location: "Switzerland",
    latitude: 46.8182,
    longitude: 8.2275,
  },
  {
    location: "Balasore",
    latitude: 21.49342,
    longitude: 86.9135,
  },
];

export const getLocationData = () => {
  return data;
};

export const getLocationByName = (location) => {
  if (!location) return null;
  const filterLocation = data.filter(
    (item) => item.location.toLowerCase() === location.toLowerCase()
  );
  return filterLocation.length > 0
    ? filterLocation[0]
    : { location: "", latitude: 0, longitude: 0 };
};
