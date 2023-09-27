import Alert, { AlertModel } from '../models/Alert';
import Event, { EventModel } from '../models/Event';


export const generateAlerts = async () => {
  try {
    // Calculate the time 5 minutes ago
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

    // Define location-based thresholds
    const locationThresholds: Record<string, number> = {
      highway: 4,
      city_center: 3,
      commercial: 2,
      residential: 1,
    };

    // Iterate through location types
    for (const locationType in locationThresholds) {
      // Calculate the count of unsafe driving events in the past 5 minutes for this location
      const count = await Event.countDocuments({
        locationType,
        isDrivingSafe: false,
        timestamp: { $gte: fiveMinutesAgo },
      });

      // Check if an alert should be generated based on the rule
      if (count >= locationThresholds[locationType]) {
        // Check if an alert already exists for this location type in the past 5 minutes
        const existingAlert = await Alert.findOne({
          locationType,
          timestamp: { $gte: fiveMinutesAgo },
        });

        if (!existingAlert) {
          // Create and save an alert
          const alert: AlertModel = new Alert({
            timestamp: new Date(),
            locationType,
            count,
          });
          await alert.save();
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
};
