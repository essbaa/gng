"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DatePicker from "react-datepicker";
import { useUploadThing } from "@/lib/uploadthing";
import { GiMeeple } from "react-icons/gi";

import "react-datepicker/dist/react-datepicker.css";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { gameEventFormSchema } from "@/lib/validator";
import { eventDefaultValues } from "@/constants";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IEvent } from "@/lib/database/models/event.model";
import GameSearch from "@/components/shared/game-search";
import { BggBoardgameItem } from "bgg-xml-api-client";

interface EventFormProps {
  userId: string;
  type: "Create" | "Update";
  event?: IEvent;
  eventId?: string;
}

const EventForm = ({ userId, type, event, eventId }: EventFormProps) => {
  const [selectedGame, setSelectedGame] = useState<BggBoardgameItem>();
  const initialValues =
    event && type === "Update"
      ? {
          ...event,
          eventDate: new Date(event.startDate!),
          locationId: event.category._id,
        }
      : eventDefaultValues;

  const router = useRouter();

  const form = useForm<z.infer<typeof gameEventFormSchema>>({
    resolver: zodResolver(gameEventFormSchema),
    defaultValues: initialValues,
  });

  useEffect(() => {
    console.log(form.getValues());
  }, []);

  const onSubmit = async (values: z.infer<typeof gameEventFormSchema>) => {
    console.log(values);

    /*     if (type === "Create") {
      try {
        const newEvent = await createEvent({
          event: values,
          userId,
          path: "/profile",
        });

        if (newEvent) {
          form.reset();
          router.push(`/events/${newEvent._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (type === "Update") {
      if (!eventId) {
        router.back();
        return;
      }
      try {
        const updatedEvent = await updateEvent({
          userId,
          event: { ...values, imageUrl: uploadedImageUrl, _id: eventId },
          path: `/events/${eventId}`,
        });

        if (updatedEvent) {
          form.reset();
          router.push(`/events/${updatedEvent._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    } */
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="gameName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <GameSearch
                    onGameSelect={(game) => {
                      setSelectedGame(game);
                    }}
                    onNameChange={field.onChange}
                    defaultValue={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="playersCount"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center  h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2 ">
                    <GiMeeple size={24} className="text-grey-500" />
                    <p className="ml-3 whitespace-nowrap text-gray-600">
                      Max. Players:
                    </p>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(+e.target.value)}
                      min={1}
                      placeholder="Players"
                      className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <Textarea
                    placeholder="Description"
                    {...field}
                    className="textarea rounded-2xl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/*  <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <FileUploader
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          {selectedGame?.image && (
            <div className="w-full flex-center bg-dark-3 flex h-72 cursor-pointer flex-col overflow-hidden rounded-xl bg-grey-50">
              <div className="flex h-full w-full flex-1 justify-center ">
                <Image
                  src={selectedGame.image}
                  alt="image"
                  width={250}
                  height={250}
                  className="w-full object-cover object-top"
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="eventDate"
            render={({ field }) => (
              <FormItem className="w-full cursor-pointer">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2 ">
                    <Image
                      src="/assets/icons/calendar.svg"
                      alt="calendar"
                      width={24}
                      height={24}
                      className="filter-grey"
                    />
                    <p className="ml-3 whitespace-nowrap text-gray-600">
                      Event Date
                    </p>
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel="Time:"
                      dateFormat="MM/dd/yyyy h:mm aa"
                      wrapperClassName="datePicker"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="button col-span-2 w-full"
        >
          {form.formState.isSubmitting ? "Submiting" : `${type} Event`}
        </Button>
      </form>
    </Form>
  );
};

export default EventForm;
