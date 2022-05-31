import { GameConfiguration } from "../game-board/game-configuration.class";
import { GameLogEntry } from "./game-log-entry.class";

export class GameLog {

    private _logEntries: GameLogEntry[] = [];
    public get logEntries() { return this._logEntries; }

    public logToConsole() {
        this._logEntries.forEach(entry => {
            console.log(entry.toString());
        });
    }

    constructor() {

    }

    public addToLog(message: string, config: GameConfiguration): GameLogEntry {
        const newEntry = new GameLogEntry(message, config)
        this._logEntries.push(newEntry);
        return newEntry;
    }
}