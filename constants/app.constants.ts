/**
 * This class contains all the constants used in the application.
 */
export default class AppConstants {
  /**
   * The minimum screen size for the application.
   */
  public static readonly minScreenSize = 684;

  /**
   * The minimum size for the station buttons.
   */
  public static readonly minStationButtonSize = {
    width: 250,
    height: 90,
  };

  /**
   * The maximum length of the incident text for each slide.
   * Note: This could change depending on screen size.
   */
  public static readonly maxIncidentTextLength = 70;

  /**
   * The length of time to show each incident slide.
   */
  public static readonly incidentSlideTimeInMs = 10000;
}
