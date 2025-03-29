"use client";
import { columns } from "@/components/Columns/Columns";
import DataTable from "@/components/DataTable/DataTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getCanceledUserBookings,
  getFutureUserBookings,
  getPastUserBookings,
} from "@/src/domain/Bookings/Bookings";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

export default function Internal({ userId }: { userId: string }) {
  const t = useTranslations("InternalPage");
  const { data: pastBookings } = useQuery({
    queryKey: ["futureUserBookings"],
    queryFn: () => getPastUserBookings(userId),
  });
  const { data: futureBookings } = useQuery({
    queryKey: ["pastUserBookings"],
    queryFn: () => getFutureUserBookings(userId),
  });
  const { data: canceledBookings } = useQuery({
    queryKey: ["canceledUserBookings"],
    queryFn: () => getCanceledUserBookings(userId),
  });

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="lg:w-[80%] w-[90%] flex flex-col justify-center items-center py-32">
        <Tabs defaultValue="Upcoming" className="w-full ">
          <TabsList className="my-4 border-b">
            <TabsTrigger value="Upcoming">{t("upcoming")}</TabsTrigger>
            <TabsTrigger value="Past">{t("past")}</TabsTrigger>
            <TabsTrigger value="Canceled">{t("canceled")}</TabsTrigger>
          </TabsList>
          <TabsContent value="Upcoming">
            <div className="container mx-auto">
              <DataTable columns={columns} data={futureBookings ?? []} />
            </div>
          </TabsContent>
          <TabsContent value="Past">
            <div className="container mx-auto">
              <DataTable columns={columns} data={pastBookings ?? []} />
            </div>
          </TabsContent>
          <TabsContent value="Canceled">
            <div className="container mx-auto">
              <DataTable columns={columns} data={canceledBookings ?? []} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
