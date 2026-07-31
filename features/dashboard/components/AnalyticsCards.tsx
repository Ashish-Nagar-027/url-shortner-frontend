"use client";

import { useQuery } from "@tanstack/react-query";
import { Link } from "lucide-react";
import type { FC } from "react";
import dashboardApi from "../api";

const AnalyticsCards: FC = () => {
  const { data } = useQuery({
    queryKey: ["analyticsData"],
    queryFn: dashboardApi.analytics,
  });

  // console.log("data , isLoadingd ", data, isLoading);
  const currentMonthsLInksCount = data?.cmLinksCount || 0
  const lastMonthsLInksCount = data?.lmLinksCount || 0
  const totalClicks = data?.totalClicks || 0
  const totalLinks = data?.totalLinks || 0

  return (
    <div className=" flex gap-4 flex-col w-5/6 max-w-[1200]">
      <div className="flex flex-1 gap-4 ">
        <div className="flex flex-1 bg-gray-400 gap-4  p-2 rounded-lg items-center">
          <div className="bg-blue-950 p-2 rounded-lg">
            <Link className=" " size={30} />
          </div>
          <div className="flex flex-col flex-1">
            <span>ALL LINKS</span>
            <span>{totalLinks}</span>
          </div>
        </div>
        <div className="flex flex-1 bg-gray-400 gap-4  p-2 rounded-lg items-center">
          <div className="bg-blue-950 p-2 rounded-lg">
            <Link className=" " size={30} />
          </div>
          <div className="flex flex-col">
            <span>TOTAL CLICKS</span>
            <span>{totalClicks}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-1 gap-4">
        <div className="flex flex-1 bg-gray-400 gap-4  p-2 rounded-lg items-center">
          <div className="bg-blue-950 p-2 rounded-lg">
            <Link className=" " size={30} />
          </div>
          <div className="flex flex-col">
            <span>THIS MONTH{`'`}S LINKS</span>
            <span>{currentMonthsLInksCount}</span>
          </div>
        </div>

        <div className="flex flex-1 bg-gray-400 gap-4  p-2 rounded-lg items-center">
          <div className="bg-blue-950 p-2 rounded-lg">
            <Link className=" " size={30} />
          </div>
          <div className="flex flex-col">
            <span>LAST MONTH{`'`}S LINKS</span>
            <span>{lastMonthsLInksCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCards;
