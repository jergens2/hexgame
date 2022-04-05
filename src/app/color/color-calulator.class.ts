export class ColorCalculator {

    /**
     * 
     * @param baseColor rgb(r,g,b)
     * @param powerLevel 
     */
    public static calculateColor(baseColor: string, powerLevel: number): string {
        let rgb: number[] = (baseColor.substring(4).split(')')[0].split(',')).map(stringValue => Number(stringValue));

        const values: {baseVal: number, currentVal: number, isDominant: boolean}[] = rgb.map(color => {
            return {
                baseVal: color,
                currentVal: color,
                isDominant: true,
            }
        });

        const r = values[0];
        const g = values[1];
        const b = values[2];
        //assuming a maximum powerlevel of 10.
        const maxPowerLevel = 10;
        let maxValue = values[0].baseVal;
        for (let i = 0; i < values.length; i++) {
            if (values[i].baseVal > maxValue) {
                maxValue = values[i].baseVal;
            }
        }
        let nonDominantMaxValue = 0;
        values.forEach(value => {
            if (value.baseVal === maxValue){
                value.isDominant = true;
            }else{
                value.isDominant = false;
                nonDominantMaxValue = value.baseVal;
            }
        });
        let halfPoint = Math.floor(maxPowerLevel/2);
        if(powerLevel > maxPowerLevel){
            powerLevel = maxPowerLevel;
        }
        const dominantColorDecrease: number = maxValue / (halfPoint+2);
        const nonDominantColorDecrease: number = nonDominantMaxValue / ((maxPowerLevel-halfPoint)+2);
        for(let i=0; i<powerLevel; i++){
            if(i < halfPoint){
                values.forEach(value => {
                    if(!value.isDominant){
                        value.currentVal -= nonDominantColorDecrease;
                        if(value.currentVal < 0){
                            console.log("ERROR: ", value.currentVal);
                        }
                    }
                })
            }else{
                values.forEach(value => {
                    if(value.isDominant){
                        value.currentVal -= dominantColorDecrease;
                        if(value.currentVal < 0){
                            console.log("ERROR: ", value.currentVal);
                        }
                    }
                })
            }
        }

        const calculatedValue: string = 'rgb('+r.currentVal+','+g.currentVal+','+b.currentVal+')';
        return calculatedValue;
    }
}