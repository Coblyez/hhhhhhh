import { definePlugin } from "@vencord/plugin";
import { FluxDispatcher } from "@vencord/utils";

export default definePlugin({
    name: "PascalCaseTyper",
    description: "Automatically converts outgoing messages to PascalCase.",
    authors: [{ name: "You" }],
    start() {
        this.listener = (event) => {
            if (event.type === "MESSAGE_SEND") {
                let text = event.message.content;
                let pascalText = text
                    .split(/\s+/)
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                    .join('');
                event.message.content = pascalText;
            }
        };
        FluxDispatcher.subscribe("MESSAGE_SEND", this.listener);
    },
    stop() {
        FluxDispatcher.unsubscribe("MESSAGE_SEND", this.listener);
    }
});
