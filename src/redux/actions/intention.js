import { INTENT_DETECTION, INTENT_DETECTION_RECEIVED } from "./constants";

export const requestIntention = (data) => {
  return {
    type: INTENT_DETECTION,
    data,
  };
};

export const responseIntention = (response) => {
  return {
    type: INTENT_DETECTION_RECEIVED,
    response,
  };
};
