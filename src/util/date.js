import { format, register } from "timeago.js";
import KoLocaleFunc from "timeago.js/lib/lang/ko";

register("ko", KoLocaleFunc);

export const formatAgo = (date, lang = "en_US") => {
  return format(date, lang);
};
