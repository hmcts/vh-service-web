export class JourneyStep
{
   constructor(private step : string)
    {

    }

    public toString=():string=>{
        return this.step;
    }
}