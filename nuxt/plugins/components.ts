import {
  AreaAction,
  BaseButton,
  ErrorPopup,
  HomeView,
  IncidentsNotification,
  IncidentsView,
  LastUpdate,
  LoadingIndicator,
  MinSizeWarning,
  ScrollableStationList,
  SublineText,
  TextCarousel,
  TrainArrivalBoard,
} from "@wmata-train-tracker/frontend";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("AreaAction", AreaAction);
  nuxtApp.vueApp.component("BaseButton", BaseButton);
  nuxtApp.vueApp.component("ErrorPopup", ErrorPopup);
  nuxtApp.vueApp.component("HomeView", HomeView);
  nuxtApp.vueApp.component("IncidentsNotification", IncidentsNotification);
  nuxtApp.vueApp.component("IncidentsView", IncidentsView);
  nuxtApp.vueApp.component("LastUpdate", LastUpdate);
  nuxtApp.vueApp.component("LoadingIndicator", LoadingIndicator);
  nuxtApp.vueApp.component("MinSizeWarning", MinSizeWarning);
  nuxtApp.vueApp.component("ScrollableStationList", ScrollableStationList);
  nuxtApp.vueApp.component("SublineText", SublineText);
  nuxtApp.vueApp.component("TextCarousel", TextCarousel);
  nuxtApp.vueApp.component("TrainArrivalBoard", TrainArrivalBoard);
});
