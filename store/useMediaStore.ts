// store/useMediaStore.ts
import { api } from "@/services/api";
import Toast from "react-native-toast-message";
import { create } from "zustand";

interface UploadedBy {
  id: string;
  name: string;
  email: string;
  role: string;
  businessName: string;
  store: string;
}

export interface MediaItem {
  id: string;
  filename: string;
  url: string;
  mimeType: string;
  filesize: number;
  width: number;
  height: number;
  createdAt: string;
  updatedAt: string;
  uploadedBy: UploadedBy;
  isPublic: boolean;
  prefix: string;
  tags: string[];
}

export interface MediaUsage {
  usedStorage: number;
  storageLimit: number | null;
  isUnlimited: boolean;
  totalItems: number;
  percentUsed: number;
}

interface MediaState {
  media: MediaItem[];
  totalDocs: number;
  totalPages: number;
  currentPage: number;
  isLoading: boolean;
  error: string | null;
  success?: string;
  usage: MediaUsage | null;
  isUsageLoading: boolean;

  // Setters
  setMedia: (media: MediaItem[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setUsage: (usage: MediaUsage) => void;
  setUsageLoading: (loading: boolean) => void;
  setSuccess: (message: string) => void;

  // CRUD
  addMedia: (file: MediaItem) => void;
  updateMedia: (id: string, updatedFile: Partial<MediaItem>) => void;
  removeMedia: (id: string) => void;
  deleteMedia: (id: string) => Promise<void>;
  uploadMedia: (formData: FormData) => Promise<void>;

  // API
  fetchMedia: (page?: number, search?: string, limit?: number) => Promise<void>;
  fetchUsage: () => Promise<void>;
  nextPage: () => Promise<void>;
  prevPage: () => Promise<void>;

  // Pagination
  setPagination: (pagination: {
    totalDocs: number;
    totalPages: number;
    currentPage: number;
  }) => void;
}

export const useMediaStore = create<MediaState>((set, get) => ({
  media: [],
  totalDocs: 0,
  totalPages: 0,
  currentPage: 1,
  isLoading: false,
  error: null,
  usage: null,
  isUsageLoading: false,

  // ✅ Setters
  setMedia: (media) => set({ media }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setUsage: (usage) => set({ usage }),
  setUsageLoading: (loading) => set({ isUsageLoading: loading }),
  setSuccess: (message: string) => set({ success: message }),

  // ✅ CRUD
  addMedia: (file) => {
    const { media } = get();
    set({ media: [file, ...media] });
  },

  updateMedia: (id, updatedFile) => {
    const { media } = get();
    set({
      media: media.map((item) =>
        item.id === id ? { ...item, ...updatedFile } : item
      ),
    });
  },

  removeMedia: (id) => {
    const { media } = get();
    set({ media: media.filter((item) => item.id !== id) });
  },

  deleteMedia: async (mediaId: string): Promise<void> => {
    const { removeMedia, setError, setSuccess } = get();

    try {
      const res = await fetch(`${api.getBaseURL()}/media/user-media`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mediaId }),
      });

      // Read response as text
      const text = await res.text();

      // Try to parse JSON safely
      let data: any = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = {};
      }

      // ❌ Handle failure
      if (!res.ok || !data.success) {
        const message =
          data?.message || `Failed to delete media item (status ${res.status})`;
        console.error("❌ deleteMedia failed:", message);
        setError?.(message);

        // 🔥 Show error toast
        Toast.show({
          type: "error",
          text1: "Delete Failed",
          text2: message,
          position: "top",
          visibilityTime: 5000,
        });

        throw new Error(message);
      }

      // ✅ Handle success
      console.log("✅ Media deleted successfully:", data);
      removeMedia(mediaId);

      const successMsg = data?.message || "Media deleted successfully.";
      setSuccess?.(successMsg);

      // 🎉 Show success toast
      Toast.show({
        type: "success",
        text1: "Success",
        text2: successMsg,
        position: "top",
        visibilityTime: 5000,
      });
    } catch (error: any) {
      const message = error?.message || "An unexpected error occurred";
      console.error("🔥 deleteMedia error:", message);
      setError?.(message);

      // 🔥 Toast for unexpected errors
      Toast.show({
        type: "error",
        text1: "Error",
        text2: message,
        position: "top",
        visibilityTime: 5000,
      });

      throw error;
    }
  },

fetchMedia: async (page = 1, search = '', limit = 20) => {
  const { setMedia, setLoading, setError, setPagination } = get();

  try {
    setLoading(true);
    setError(null);

    // Build query parameters
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    if (search) params.append('search', search);

    console.log("🔍 Fetching user media with params:", params.toString());

    // Fetch data
    const res: any = await api.get(`/media/user-media?${params.toString()}`);
    console.log("✅ fetchMedia response:", res);

    const data = res.data?.data;
    if (!data) throw new Error("Invalid media response format");

    // Update store with results
    setMedia(data.docs || []);
    setPagination({
      totalDocs: data.totalDocs || 0,
      totalPages: data.totalPages || 0,
      currentPage: data.page || 1,
    });
  } catch (error: any) {
    console.error("❌ fetchMedia error:", error);
    setError(
      error.response?.data?.message ||
      error.message ||
      "An unknown error occurred while fetching media"
    );
  } finally {
    setLoading(false);
  }
},


  // ✅ Fetch Usage
  fetchUsage: async () => {
    const { setUsage, setError, setUsageLoading } = get();

    try {
      setUsageLoading(true);
      const res: any = await api.get("/media/usage");
      console.log("fetchUsage response", res);

      const data = res.data?.data;
      if (!data) throw new Error("Invalid usage response format");

      setUsage(data);
    } catch (error: any) {
      console.error("fetchUsage error:", error);
      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch media usage"
      );
    } finally {
      setUsageLoading(false);
    }
  },

  uploadMedia: async (formData: FormData): Promise<void> => {
    const { addMedia, setError, setSuccess, fetchMedia, fetchUsage } = get();
  
    try {
      const res = await fetch(`${api.getBaseURL()}/upload-media`, {
        method: "POST",
        body: formData,
      });
  
      const text = await res.text();
      console.log("📩 Raw server response:", text); // ⬅️ ADD THIS LINE

      let data: any = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = {};
      }
  
      if (!res.ok || !data.success) {
        const message =
          data?.message || `Failed to upload file (status ${res.status})`;
        console.error("❌ uploadMedia failed:", message);
        setError?.(message);
  
        Toast.show({
          type: "error",
          text1: "Upload Failed",
          text2: message,
          position: "top",
        });
  
        throw new Error(message);
      }
  
      const uploadedFile = data?.data;
      if (uploadedFile) addMedia(uploadedFile);
  
      const successMsg = data?.message || "File uploaded successfully.";
      setSuccess?.(successMsg);
  
      Toast.show({
        type: "success",
        text1: "Upload Successful",
        text2: successMsg,
        position: "top",
      });
  
      await fetchMedia();
      await fetchUsage();
    } catch (error: any) {
      const message = error?.message || "An unexpected error occurred during upload";
      console.error("🔥 uploadMedia error:", message);
      setError?.(message);
  
      Toast.show({
        type: "error",
        text1: "Error",
        text2: message,
        position: "top",
      });
  
      throw error;
    }
  },
  
  // ✅ Pagination
  nextPage: async () => {
    const { currentPage, totalPages, setPagination, fetchMedia } = get();
    if (currentPage < totalPages) {
      setPagination({
        totalDocs: 0,
        totalPages,
        currentPage: currentPage + 1,
      });
      await fetchMedia();
    }
  },

  prevPage: async () => {
    const { currentPage, totalPages, setPagination, fetchMedia } = get();
    if (currentPage > 1) {
      setPagination({
        totalDocs: 0,
        totalPages,
        currentPage: currentPage - 1,
      });
      await fetchMedia();
    }
  },

  setPagination: ({ totalDocs, totalPages, currentPage }) =>
    set({ totalDocs, totalPages, currentPage }),
}));
