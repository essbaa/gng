import { z } from "zod";

export const eventFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters")
    .max(400, "Description must be less than 400 characters"),
  location: z
    .string()
    .min(3, "Location must be at least 3 characters")
    .max(400, "Location must be less than 400 characters"),
  imageUrl: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  categoryId: z.string(),
  price: z.string(),
  isFree: z.boolean(),
  url: z.string().url(),
});

export const gameEventFormSchema = z.object({
  gameName: z.string().min(1),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters")
    .max(400, "Description must be less than 400 characters"),
  locationId: z.string(),
  eventDate: z.date(),
  isPrivate: z.boolean(),
  privateLocation: z.string(),
  playersCount: z.number().min(1),
});

// Base schema without the date, weekDay, and time fields
const baseLocationFormSchema = z.object({
  name: z.string().min(1),
  address: z.string().min(1),
  description: z.string().min(10).max(400),
  capacity: z.number(),
  oneTimeEvent: z.boolean(),
  url: z.string().url(),
});

// Extended schema with optional date, weekDay, and time
const locationFormSchema = baseLocationFormSchema
  .extend({
    date: z.date().optional(),
    weekDay: z.string().optional(),
    time: z.string().optional(),
  })
  .superRefine(({ oneTimeEvent, date }, refinementContext) => {
    // If oneTimeEvent is true, date must not be undefined
    if (oneTimeEvent === true && date === undefined) {
      return refinementContext.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Date is required",
        path: ["date"],
      });
    }

    return true;
  })
  .superRefine(({ oneTimeEvent, weekDay, time }, refinementContext) => {
    // If oneTimeEvent is false, weekDay and time must not be undefined
    if (oneTimeEvent === false && weekDay === undefined) {
      return refinementContext.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Weekday and Time are required",
        path: ["weekday"],
      });
    }
  });

export { locationFormSchema };
