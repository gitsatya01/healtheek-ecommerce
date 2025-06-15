import posthog from 'posthog-js';
import LogRocket from 'logrocket';

export const initAnalytics = () => {
  // Initialize PostHog
  if (process.env.NEXT_PUBLIC_POSTHOG_KEY && process.env.NEXT_PUBLIC_POSTHOG_HOST) {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      loaded: (posthog) => {
        if (process.env.NODE_ENV === 'development') posthog.debug();
      },
    });
  }

  // Initialize LogRocket
  if (process.env.NEXT_PUBLIC_LOGROCKET_ID) {
    LogRocket.init(process.env.NEXT_PUBLIC_LOGROCKET_ID);
  }
};

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    posthog.capture(eventName, properties);
  }
};

export const identifyUser = (userId: string, traits?: Record<string, any>) => {
  if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    posthog.identify(userId, traits);
  }
  if (process.env.NEXT_PUBLIC_LOGROCKET_ID) {
    LogRocket.identify(userId, traits);
  }
}; 