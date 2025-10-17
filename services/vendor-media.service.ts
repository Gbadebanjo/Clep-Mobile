import { useMediaStore } from "@/store/useMediaStore";
import { api } from "./api";

export async function fetchMedia() {
  const { setMedia, setLoading, setError, setPagination } = useMediaStore.getState();

  setLoading(true);
  try {
    const res = await api.get('/media/user-media', { page:1, limit: 20, });
      console.log('fetchMedia response', res);

    // if (res.success) {
    //   const { docs, totalDocs, totalPages, page } = json.data;
    //   setMedia(docs);
    //   setPagination({ totalDocs, totalPages, currentPage: page });
    // } else {
    //   setError("Failed to fetch media files.");
    // }
  } catch (err) {
    setError((err as Error).message);
  } finally {
    setLoading(false);
  }
}
