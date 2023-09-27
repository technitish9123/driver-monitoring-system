import Event, { EventModel } from '../models/Event';
import Alert from '../models/Alert';
import { v4 as uuidv4 } from 'uuid';

// Define alert thresholds based on location types
const alertThresholds: { [key: string]: number } = {
    highway: 4,
    city_center: 3,
    commercial: 2,
    residential: 1,
};

export const runRuleEngine = async () => {
    try {
        // Calculate the start time of the 5-minute window
        const windowEndTime = new Date(Date.now());
        const windowStartTime = new Date(Date.now() - 1 * 60 * 1000);

        console.log("rule")
        // Group events by location type and count unsafe driving events within the window
        const locationGroups = await Event.aggregate([
            {
                $match: {
                    timestamp: { $gte: windowStartTime, $lte: windowEndTime },
                    isDrivingSafe: false,
                },
            },
            {
                $group: {
                    _id: '$locationType',
                    count: { $sum: 1 },
                },
            },
        ]);

        // Check if the conditions for generating alerts are met
        for (const group of locationGroups) {
            const { _id: locationType, count } = group;
            const threshold = alertThresholds[locationType];

            if (count >= threshold) {
                console.log(count);
                // Check if an alert for this location type has been generated in the past 5 minutes
                const existingAlert = await Alert.findOne({
                    locationType,
                    createdAt: { $gte: windowStartTime },
                });

                console.log(existingAlert)

                if (!existingAlert) {
                    const AlertId = uuidv4();
                    // Create a new alert
                    const alert = new Alert({
                        AlertId,
                        locationType,
                    });
                    await alert.save();

                    console.log('Alert created:', alert);
                    console.log('AlertId:', AlertId);

                }
            }
        }
    } catch (error) {
        console.error('Error in rule engine:', error);
    }
};
