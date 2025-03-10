import {
  getGetSubscribersSubscriberIdRankingClicksUrl,
  getSubscribersSubscriberIdRankingClicks,
  getSubscribersSubscriberIdRankingCounts,
  getSubscribersSubscriberIdRankingPosition,
} from "@/http/api";
import { BadgeCheck, Medal, MousePointerClick } from "lucide-react";

interface StatsProps {
  subscriberId: string;
}

export async function Stats({ subscriberId }: StatsProps) {
  const { count: accessCount } =
    await getSubscribersSubscriberIdRankingClicks(subscriberId);

  const { count: inviteCount } =
    await getSubscribersSubscriberIdRankingCounts(subscriberId);

  const { position } =
    await getSubscribersSubscriberIdRankingPosition(subscriberId);
  return (
    <div className="grid gap-3 md:grid-cols-3">
      <div className="relative bg-gray-700 border border-gray-600 px-4 py-7 flex flex-col items-center justify-center gap-1 rounded-xl">
        <span className="font-heading text-2xl font-semibold text-gray-200 leadinbg">
          {accessCount}
        </span>
        <span className="text-sm text-gray300 leading-none text-center">
          Acessos ao link
        </span>
        <MousePointerClick className="size-5 text-purple absolute top-3 left-3" />
      </div>
      <div className="relative bg-gray-700 border border-gray-600 px-4 py-7 flex flex-col items-center justify-center gap-1 rounded-xl">
        <span className="font-heading text-2xl font-semibold text-gray-200 leadinbg">
          {inviteCount}
        </span>
        <span className="text-sm text-gray300 leading-none text-center">
          Incrições feitas
        </span>
        <BadgeCheck className="size-5 text-purple absolute top-3 left-3" />
      </div>
      <div className="relative bg-gray-700 border border-gray-600 px-4 py-7 flex flex-col items-center justify-center gap-1 rounded-xl">
        <span className="font-heading text-2xl font-semibold text-gray-200 leadinbg">
          {position ? `${position}º` : "-"}
        </span>
        <span className="text-sm text-gray300 leading-none text-center">
          Posição no ranking
        </span>
        <Medal className="size-5 text-purple absolute top-3 left-3" />
      </div>
    </div>
  );
}
