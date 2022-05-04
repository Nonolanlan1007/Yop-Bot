import CommandOptions from "./CommandOptions";

export default class Command {
    name: string;
    category: string;
    description: string;
    usage: string;
    example: string[];
    aliases: string[];
    perms: string [];
    botPerms: string [];
    cooldown: number;
    disabled: boolean;

    constructor(commandOptions: CommandOptions) {
        this.name = commandOptions.name;
        this.category = commandOptions.category;
        this.description = commandOptions.description;
        this.usage = commandOptions.usage || commandOptions.name;
        this.example = commandOptions.example || [];
        this.aliases = commandOptions.aliases || [];
        this.perms = commandOptions.perms || [];
        this.botPerms = commandOptions.botPerms || ["EMBED_LINKS", "SEND_MESSAGES", "READ_MESSAGES"];
        this.cooldown = commandOptions.cooldown || 0;
        this.disabled = commandOptions.disabled || false;
    }
}