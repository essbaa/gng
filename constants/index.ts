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
    label: "Add Location",
    route: "/locations/create",
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
  gameName: "",
  isPrivate: false,
  playersCount: 1,
  privateLocation: "",
};

export const locationDefaultValues = {
  description: "",
  name: "",
  address: "",
  capacity: undefined,
  url: "",
  weekday: "",
  time: "",
  date: undefined,
  oneTimeEvent: false,
};

export const weekDays = [
  {
    label: "Monday",
    value: "0",
  },
  {
    label: "Tuesday",
    value: "1",
  },
  {
    label: "Wednesday",
    value: "2",
  },
  {
    label: "Thursday",
    value: "3",
  },
  {
    label: "Friday",
    value: "4",
  },
  {
    label: "Saturday",
    value: "5",
  },
  {
    label: "Sunday",
    value: "6",
  },
];
