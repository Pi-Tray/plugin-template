import os from "os";

import type {Plugin} from "@pi-tray/types";

const UPDATE_INTERVAL_MS = 60_000;

const format_uptime = (total_seconds: number): string => {
    const hours = Math.floor(total_seconds / 3600);
    const minutes = Math.floor((total_seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
}

// a live tile, which keeps its button's label up to date while a client is connected
export default {
    display_name: "Show how long this PC has been on",
    description: "Updates every minute.",

    live: {
        controls: ["label"],

        init({update, signal}) {
            const refresh = () => update({text: format_uptime(os.uptime())});
            refresh();

            const timer = setInterval(refresh, UPDATE_INTERVAL_MS);

            // the server aborts this when the tile stops, e.g. its cell changed or the plugin reloaded
            signal.addEventListener("abort", () => clearInterval(timer));
        }
    }
} satisfies Plugin<"label">;
