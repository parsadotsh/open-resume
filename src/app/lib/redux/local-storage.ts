import type { RootState } from "lib/redux/store";

const LOCAL_STORAGE_KEY = "open-resume-state";

export const loadStateFromLocalStorage = () => {
  try {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const urlState = urlSearchParams.get("state");
    if (urlState) {
      return JSON.parse(decodeURI(urlState));
    } else {
      const stringifiedState = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!stringifiedState) return undefined;
      return JSON.parse(stringifiedState);
    }
  } catch (e) {
    return undefined;
  }
};

export const saveStateToLocalStorage = (state: RootState) => {
  try {
    const stringifiedState = JSON.stringify(state);
    localStorage.setItem(LOCAL_STORAGE_KEY, stringifiedState);

    const urlSearchParams = new URLSearchParams(window.location.search);
    urlSearchParams.set("state", encodeURI(stringifiedState));
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${urlSearchParams}`
    );
  } catch (e) {
    // Ignore
  }
};

export const getHasUsedAppBefore = () => Boolean(loadStateFromLocalStorage());
