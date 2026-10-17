import type {Plugin} from "@pi-tray/types";

const DEFAULT_MESSAGE = "Hello from Pi-Tray!";

// a plugin that does something when its button is pressed
export default {
    display_name: "Log a message",
    description: "Writes a message to the server's log when pressed.",

    config_template: {
        message: {
            type: "string",
            optional: true,
            description: `The message to log (default: \`${DEFAULT_MESSAGE}\`)`
        }
    },

    handle_push: async ({config, x, y}) => {
        const message = typeof config?.message === "string" ? config.message : DEFAULT_MESSAGE;
        console.log(`Button at ${x}, ${y} says: ${message}`);
    }
} satisfies Plugin;
