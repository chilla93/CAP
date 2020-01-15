import { IBaseOptions } from './../BaseModels';
import { Validate, Emoji } from '../../Decorators/PropertyDecorators';
// import required from '../../Decorators/Required';

export enum SizeOptions {
    Large = "Large",
    Medium = "Medium",
    Small = "Small",
};

export class StreamOptions implements IBaseOptions {
    public filename: string = "";
    public filePath: string = "";
    
    @Validate()
    @Reflect.metadata("IsEnum", true)
    public size: SizeOptions = SizeOptions.Large;

    @Validate("Number")
    public screenIndex: string = "1";

    get fullFile(): string {
        return `${this.filePath}${this.filename}`
    };

    get arguments(): string[]{
        return ['-i',  `${this.screenIndex}:none`, '-c:v', 
        'libx264', '-preset', 'fast', '-r', '30', '-crf', '18', 
        '-pix_fmt', 'yuv420p', this.fullFile];
    }

    constructor(
        filename: string, 
        filePath: string, 
        size: SizeOptions,
        screenIndex: string) {        
            this.size  = size;
            this.filename = filename;
            this.filePath = filePath;
            this.screenIndex = screenIndex

    }

    // constructor(){}

}

