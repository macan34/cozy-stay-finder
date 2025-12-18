# TODO: Make Image Display Consistent Across All Pages

## Information Gathered
- HomestayDetail.tsx has a full image gallery with multiple images, navigation buttons, thumbnails, and image counter
- HomestayCard.tsx, HomestayModal.tsx, and Explore.tsx only display single images
- API provides one image per homestay, but HomestayDetail duplicates it to simulate multiple images
- Need to standardize image display with gallery functionality across all components

## Plan
- [ ] Create a reusable ImageGallery component for consistent image display
- [ ] Update HomestayCard.tsx to support multiple images with gallery functionality
- [ ] Update HomestayModal.tsx to support multiple images with navigation
- [ ] Update Explore.tsx to use enhanced HomestayCard with gallery
- [ ] Ensure all components handle single or multiple images gracefully

## Dependent Files
- src/components/ImageGallery.tsx (new)
- src/components/HomestayCard.tsx
- src/components/HomestayModal.tsx
- src/pages/Explore.tsx

## Followup Steps
- [ ] Test image gallery functionality across all pages
- [ ] Verify navigation and thumbnail display
- [ ] Ensure responsive design works on all screen sizes
