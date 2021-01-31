import * as log from "https://deno.land/std@0.85.0/log/mod.ts";
import * as _ from "https://deno.land/x/lodash@4.17.15-es/lodash.js";

interface Launch {
    flightNumber: number;
    mission: string;
    rocket: string;
    customers: Array<string>;
    launchDate: number;
    upcoming: boolean;
    success?: boolean;
    target?: string;
}

const launches = new Map<number, Launch>();

async function downloadLaunchData() {
    log.info("Downloading launch data...");
    const response = await fetch("https://api.spacexdata.com/v3/launches");

    if (!response.ok) {
        log.warning("Problem downnloading launch data.");
        throw new Error("Launch data download failed.");
    }

    const launchData = await response.json();

    for (const launch of launchData) {
        const payloads = launch["rocket"]["second_stage"]["payloads"];
        const customers = _.flatMap(payloads, (payload: any) => {
            return payload.customers;
        });

        const flightData = {
            flightNumber: launch["flight_number"],
            mission: launch["mission_name"],
            rocket: launch["rocket"]["rocket_name"],
            launchDate: launch["launch_date_unix"],
            upcoming: launch["upcoming"],
            success: launch["launch_success"],
            customers,
        };

        launches.set(flightData.flightNumber, flightData);
        log.info(JSON.stringify(flightData));
    }
}

await downloadLaunchData();
log.info(`Downloaded data for ${launches.size} SpaceX launches.`);

export function getAll() {
    return Array.from(launches.values());
}