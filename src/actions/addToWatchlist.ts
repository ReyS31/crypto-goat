import { getPrimaryWatchlistId } from "@/lib/coinApi";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath, revalidateTag } from "next/cache";

 const addToWatchlist = async (formData: FormData) => {
    "use server";
    const symbol = formData.get("symbol") as string;
    const add = formData.get("status") === "add";
  
    if (!symbol) {
      return;
    }
  
    const watchListId = await getPrimaryWatchlistId((await getServerSession())!);
    if (!watchListId) {
      return;
    }
  
    const exists = await prisma.watchList.findFirst({
      where: {
        id: watchListId,
        coinOnWatchList: {
          some: {
            coin: {
              symbol: symbol,
            },
          },
        },
      },
      include: {
        coinOnWatchList: {
          where: {
            coin: {
              symbol: symbol,
            },
          },
        },
      },
    });
  
    if (add) {
      await prisma.watchList.update({
        where: {
          id: watchListId,
        },
        data: {
          coinOnWatchList: {
            create: {
              coin: {
                connect: {
                  symbol: symbol,
                },
              },
            },
          },
        },
      });
  
      revalidateTag("watchlist");
      revalidateTag("component");
      revalidatePath(`/market`);
      revalidatePath(`/watchlist`);
      return;
    }
  
    const coinWatchlist = exists!.coinOnWatchList[0];
    if (!coinWatchlist) {
      return;
    }
  
    await prisma.watchList.update({
      where: {
        id: watchListId,
      },
      data: {
        coinOnWatchList: {
          delete: {
            watchListId_coinId: {
              coinId: coinWatchlist.coinId,
              watchListId: watchListId,
            },
          },
        },
      },
    });
    revalidateTag("watchlist");
    revalidateTag("component");
    revalidatePath(`/market`);
    revalidatePath(`/watchlist`);
  };
  
  export default addToWatchlist;