/**
 * Personalize the message, signature, tree portrait, and photo paths here.
 * Add images under public/photos and set each photo value to "/photos/your-image.jpg".
 * Leave a photo value empty to show a clearly marked replacement slot.
 * Set treePortrait.src to show your girlfriend's photo in the center of the tree.
 */
export const birthdayContent = {
  opening: {
    title: 'Happy Golden Birthday',
    subtitle: 'a little surprise, for you',
    ariaLabel: 'Birthday surprise opening',
    bowLabel: 'Pull back the bowstring and release the arrow toward the heart',
    dragLabel: 'Drag bowstring',
  },
  wish: {
    ariaLabel: 'Birthday wish',
    title: 'Happy Birthday',
    subtitle: 'enjoy and explore this surprise',
  },
  tree: {
    unbloomedLabel: 'A cozy memory tree ready for photos',
    bloomedLabel: 'A keepsake tree with miniature photo frames and a portrait spot',
    photoFramePlaceholder: 'Add a memory photo',
    portraitPlaceholder: 'HER PHOTO',
    kicker: 'and… here we go!',
    title: 'Happy Birthday',
    subtitle: 'a golden surprise for someone who turns 17th today...',
    scrollCue: 'SCROLL FOR MEMORIES',
  },
  treePortrait: {
    src: '',
    alt: 'A placeholder for your girlfriend’s portrait',
  },
  memoriesTitle: 'Beautiful Memories',
  memoriesEyebrow: 'A collection of us',
  photoPlaceholder: 'Add your photo here',
  photos: [
    { src: '', caption: 'A day worth keeping' },
    { src: '', caption: 'Our kind of afternoon' },
    { src: '', caption: 'Somewhere together' },
    { src: '', caption: 'The laugh I remember' },
    { src: '', caption: 'A favorite little moment' },
    { src: '', caption: 'More days like this' },
  ],
  messageLabel: 'A Message for You',
  messageTitle: 'Happy Birthday, My Love',
  message: '[Write your personal message here — add a favorite memory and a wish for the year ahead.]',
  signature: '[Your signature]',
  sendGiftLabel: 'Send a Gift',
  giftTitle: 'A Special Birthday Gift for You!',
  giftMessage: 'May your day be overflowing with love, happiness, sweet surprises, and all the magical moments you deserve.',
  giftBadge: 'HAPPY BIRTHDAY 2026',
  giftCloseLabel: 'Close gift message',
  claimWishesLabel: 'Claim Wishes',
  giftClaimed: 'A little more joy is on its way.',
  pageFooter: 'For all the lovely things still to come.',
} as const;
