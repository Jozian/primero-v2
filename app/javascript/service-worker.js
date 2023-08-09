import { POST_MESSAGES } from "./config";
import { SERVICE_WORKER_PATH, subscribeToNotifications, unsubscribeToNotifications } from "./libs/service-worker-utils";

export default () => {
  window.addEventListener("message", event => {
    if (event?.data?.type === POST_MESSAGES.SUBSCRIBE_NOTIFICATIONS) {
      if (localStorage.getItem("pushEndpoint")) {
        unsubscribeToNotifications().then(() => {
          subscribeToNotifications();
        });
      } else {
        subscribeToNotifications();
      }
    }

    if (event?.data?.type === POST_MESSAGES.UNSUBSCRIBE_NOTIFICATIONS) {
      unsubscribeToNotifications();
    }
  });

  window.addEventListener("load", () => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register(SERVICE_WORKER_PATH)
        .then(registration => {
          // eslint-disable-next-line no-console
          console.info("Registration successful, scope is:", registration.scope);
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.error("Service worker registration failed, error:", error);
        });
    }
  });
};
