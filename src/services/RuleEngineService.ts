import Event, { EventModel } from '../models/Event';
import Alert from '../models/Alert';
import { v4 as uuidv4 } from 'uuid';

const processedEvents: Set<string> = new Set();

const recentAlertTimestamps: Map<string, Date> = new Map();

// ? --------------------------------------------------------------------------------------------------------
// ? thresholds based on location types Declarations
// ? --------------------------------------------------------------------------------------------------------


const alertThresholds: { [key: string]: number } = {
    highway: 4,
    city_center: 3,
    commercial: 2,
    residential: 1,
};

// ? --------------------------------------------------------------------------------------------------------
// ? Functions Declarations
// ? --------------------------------------------------------------------------------------------------------

export const runRuleEngine = async () => {
    try {

        // start time of the 5-minute window
        const windowStartTime = new Date(Date.now() - 5 * 60 * 1000);

        // Group events by location type, vehicle ID, and count unsafe driving events
        const locationGroups = await Event.aggregate([
            {
                $match: {
                    timestamp: { $gte: windowStartTime },
                    isDrivingSafe: false,
                },
            },
            {
                $group: {
                    _id: { locationType: '$locationType', vehicleId: '$vehicleId' },
                    count: { $sum: 1 },
                    latestEventTime: { $max: '$timestamp' },
                },
            },
        ]);


        for (const group of locationGroups) {
            const { _id: { locationType, vehicleId }, count, latestEventTime } = group;
            const threshold = alertThresholds[locationType];

            // Check if an alert for this vehicle and location type has been generated in the past 5 minutes
            const recentAlertTimestamp = recentAlertTimestamps.get(`${vehicleId}-${locationType}`);
            if (!recentAlertTimestamp || latestEventTime > recentAlertTimestamp) {
                // Check if the count exceeds the threshold for generating alerts
                if (count >= threshold) {
                    // Create a new alert
                    const AlertId = uuidv4();
                    const alert = new Alert({
                        locationType,
                        vehicleId,
                        AlertId,
                    });
                    await alert.save();

                    // * --------------------------------------------------------------------------------------------------------
                    // * Update the timestamp of the most recent alert for this vehicle and location type
                    // * --------------------------------------------------------------------------------------------------------

                    recentAlertTimestamps.set(`${vehicleId}-${locationType}`, latestEventTime);

                    //! Add processed event IDs to avoid duplicates
                    processedEvents.add('event_id_here'); // Replace with the actual event ID
                }
            }
        }
    } catch (error) {
        console.error('Error in rule engine:', error);
    }
};
