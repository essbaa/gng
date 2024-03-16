import Collection from "@/components/shared/collection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = () => {
  return (
    <>
      {/* My Tickets */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">My Tickets</h3>
          <Button asChild className="button hidden sm:flex">
            <Link href="/#events">Explore more Events</Link>
          </Button>
        </div>
      </section>

      {/*       <section className="wrapper my-8">
        <Collection
          data={events?.data}
          emptyTitle="No Events Ticket purchased yet"
          emptyStateSubText="No worries - plenty of exciting events to explore!"
          collectionType="My_Tickets"
          limit={3}
          page={1}
          totalPages={2}
          urlParamName="ordersPage"
        />
      </section> */}

      {/* Events organized */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">Events Organized</h3>
          <Button asChild className="button hidden sm:flex">
            <Link href="/events/create">Create New Event</Link>
          </Button>
        </div>
      </section>
      {/*       <section className="wrapper my-8">
        <Collection
          data={events?.data}
          emptyTitle="No Events have been created yet"
          emptyStateSubText="Go create some now"
          collectionType="Events_Tickets"
          limit={6}
          page={1}
          totalPages={2}
          urlParamName="eventsPage"
        />
      </section> */}
    </>
  );
};

export default Page;
