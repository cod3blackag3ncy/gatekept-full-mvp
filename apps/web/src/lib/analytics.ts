// Analytics placeholder - console.logs events for now
// Replace with real analytics (PostHog, Mixpanel, etc.) when ready

type EventName = 
  | 'page_view'
  | 'signup_start'
  | 'signup_complete'
  | 'login'
  | 'logout'
  | 'swipe_pass'
  | 'swipe_connect'
  | 'match'
  | 'message_send'
  | 'message_read'
  | 'profile_view'
  | 'profile_edit'
  | 'upgrade_click'
  | 'upgrade_complete'
  | 'report_submit'
  | 'block_user'
  | 'notification_open'
  | 'onboarding_step_complete'
  | 'onboarding_complete'
  | 'preference_update'
  | 'verification_start'
  | 'verification_complete';

interface EventProps {
  [key: string]: string | number | boolean | undefined;
}

export function track(event: EventName, props?: EventProps) {
  // Log to console for development
  console.log('[Analytics]', event, props);
  
  // Could add: localStorage queue, fetch to endpoint, etc.
}

export function identify(userId: string, traits?: EventProps) {
  console.log('[Analytics] Identify:', userId, traits);
}

export function reset() {
  console.log('[Analytics] Reset');
}

export const analytics = {
  track,
  identify,
  reset,
};

export default analytics;
