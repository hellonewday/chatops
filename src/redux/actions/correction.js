import { SPELL_CORRECTION, SPELL_CORRECTION_RECEIVED } from "./constants";

export const requestCorrection = (data) => {
  return {
    type: SPELL_CORRECTION,
    data,
  };
};

export const responseCorrection = (response) => {
  return {
    type: SPELL_CORRECTION_RECEIVED,
    response,
  };
};
