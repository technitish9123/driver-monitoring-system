// RuleEngineService.ts
import Event, { EventModel } from '../models/Event';
import Alert from '../models/Alert';

//! ----------------------------------------------
//! Define alert thresholds based on location types
//! -----------------------------------------------

const alertThresholds: { [key: string]: number } = {
    highway: 4,
    city_center: 3,
    commercial: 2,
    residential: 1,
};

//! -------------------------
//! function :- Rule Engine
//! -------------------------

export const runRuleEngine = async () => {
    try {
        // Calculate the start time of the 5-minute window
        const windowStartTime = new Date(Date.now() - 5 * 60 * 1000);

        // Group events by location type and count unsafe driving events within the window
        const locationGroups = await Event.aggregate([
            {
                $match: {
                    timestamp: { $lte: windowStartTime },
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

        //Check if the conditions for generating alerts are met

        for (const group of locationGroups) {
            const { _id: locationType, count } = group;
            const threshold = alertThresholds[locationType];

            if (count >= threshold) {
                // Check if an alert for this location type has been generated in the past 5 minutes
                const existingAlert = await Alert.findOne({
                    createdAt: { $gte: windowStartTime },
                });

                if (!existingAlert) {
                    // Create a new alert
                    const alert = new Alert({
                        eventId: '_id',
                    });
                    await alert.save();

                    console.log('Alert created:', alert);
                }
            }
        }
    } catch (error) {
        console.error('Error in rule engine:', error);
    }
};
