import { getCupUsageHistory } from "@/db/database";
import { CupUsageHistoryWithCup } from "@/types/Cups";
import { useQuery } from "@tanstack/react-query";

export function useCupHistory() {
  return useQuery<CupUsageHistoryWithCup[]>({
    queryKey: ["cup-usage-history"],
    queryFn: getCupUsageHistory,
  });
}
