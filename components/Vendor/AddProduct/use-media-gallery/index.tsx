"use client";

import { useCallback, useState } from "react";
import MediaGalleryModal, { MediaItem } from "../media-gallery-modal";

interface UseMediaGalleryOptions {
  onSelect?: (media: MediaItem | MediaItem[]) => void;
  multiple?: boolean;
  maxItems?: number;
}

export function useMediaGallery(options: UseMediaGalleryOptions = {}) {
  const [isOpen, setIsOpen] = useState(false);

  const openGallery = useCallback(() => setIsOpen(true), []);
  const closeGallery = useCallback(() => setIsOpen(false), []);

  const handleSelect = useCallback(
    (media: MediaItem | MediaItem[]) => {
      options.onSelect?.(media);
      closeGallery();
    },
    [options, closeGallery]
  );

  const MediaGallery = () => (
    <MediaGalleryModal
      visible={isOpen}
      onClose={closeGallery}
      onSelect={handleSelect}
      multiple={options.multiple}
      maxItems={options.maxItems}
    />
  );

  return { openGallery, closeGallery, MediaGallery };
}
  