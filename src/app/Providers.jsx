'use client';

import { Provider } from 'react-redux';
import { appStore } from '@/redux/store/store';

export default function Providers({ children }) {
  return <Provider store={appStore}>{children}</Provider>;
}
