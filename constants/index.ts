export const headerLinks = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "Create Event",
    route: "/events/create",
  },
  {
    label: "My Profile",
    route: "/profile",
  },
];

export const eventDefaultValues = {
  description: "",
  locationId: "",
  eventDate: new Date(),
  gameId: 0,
  isPrivate: false,
  playersCount: 1,
  privateLocation: "",
};
