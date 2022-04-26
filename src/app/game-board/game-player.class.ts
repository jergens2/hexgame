import { ColorCalculator } from "../color/color-calulator.class";

export class GamePlayer {

    private _id: string;
    private _baseColor: string;
    private _name: string;
    private _colorSwatch: string[] = [];
    private _isBot: boolean;

    public get baseColor(): string { return this._baseColor; }
    public get colorSwatch(): string[] { return this._colorSwatch; }
    public get name(): string { return this._name; }
    public get id(): string { return this._id; }
    public get isBot(): boolean { return this._isBot; }

    constructor(color: string, name: string, isBot: boolean) {
        this._baseColor = color;
        this._name = name;
        this._id = '';
        this._isBot = isBot;
        if (color !== '') {
            this._buildColorSwatch();
        }
    }


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