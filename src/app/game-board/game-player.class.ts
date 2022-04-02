export class GamePlayer{

    private _id: string;
    private _color: string;
    private _name: string;

    public get color(): string { return this._color; }
    public get name(): string { return this._name; }
    public get id(): string { return this._id; }
    
    constructor(color: string, name: string){
        this._color = color;
        this._name = name;  
        this._id = '';
    }

}