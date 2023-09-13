'use client';
import { FacebookProvider, CustomChat } from 'react-facebook';

const APP_ID = import.meta.env.VITE_FB_APP_ID;
const PAGE_ID = import.meta.env.VITE_FB_PAGE_ID;

const FacebookMessenger = () => {
  return (
    <FacebookProvider appId={APP_ID} chatSupport>
      <CustomChat pageId={PAGE_ID} minimized={true} />
    </FacebookProvider>
  );
};

export default FacebookMessenger;
