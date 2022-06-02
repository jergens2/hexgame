import { ColorCalculator } from "src/app/color/color-calulator.class";

export class GamePlayer {

    private _id: string;
    private _baseColor: string;
    private _name: string;
    private _colorSwatch: string[] = [];
    private _isBot: boolean;
    private _playerTurnCount: number = 0;   

    public get baseColor(): string { return this._baseColor; }
    public get colorSwatch(): string[] { return this._colorSwatch; }
    public get name(): string { return this._name; }
    public get id(): string { return this._id; }
    public get isBot(): boolean { return this._isBot; }
    public get isHuman(): boolean { return !this._isBot; }
    /** The number of turns this player has taken */
    public get playerTurnCount(): number { return this._playerTurnCount; }

    constructor(color: string, name: string, id: string, isBot: boolean) {
        this._baseColor = color;
        this._name = name;
        this._id = id;
        this._isBot = isBot;
        if (color !== '') {
            this._buildColorSwatch();
        }
    }



    public incrementTurnCount(){ this._playerTurnCount++; }

    private _buildColorSwatch() {
        let swatch: string[] = [];
        swatch.push(this.baseColor);
        for (let i = 1; i < 10; i++) {
            const color = ColorCalculator.calculateColor(this._baseColor, i)
            swatch.push(color);
        }
        this._colorSwatch = swatch;
    }

}