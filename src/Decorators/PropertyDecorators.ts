import { InvalidArgumentError } from './../Models/AppError';
import { setterValidatorFunction, fixPropertyDecorator, CustomPropertyDecorator, PropertyDecoratorWithValidator } from './Decorators';
// import _ from "reflect-metadata";

  // Property Decorator
export const Emoji = () => {
    const setter = (key: string, newValue: any, target: any) => {
        // let type = Reflect.getMetadata("design:type", target, key);
        // console.log("this is the type option", type);
        if(typeof newValue == undefined || newValue === null){
            throw new InvalidArgumentError(key, newValue)
        }
        return `🍦 ${newValue} 🍦`;
    }

    
    return fixPropertyDecorator(() => PropertyDecoratorWithValidator(setter))()
}

export const IsValidNumber = (value: any): boolean => value != null && !isNaN(value)

export const IsValidEnum = (value: any, type: any): boolean => (value in type)

export const IsValidString = (value: any, As: AsOptions = "String"): boolean => {
    if(As == "Number"){
        return IsValidNumber(value)
    }
    return typeof value == "string" && !!value
}

type AsOptions = "Number" | "String" | "Enum";

export const Validate = (As?: AsOptions) => {
    const setter = (key: string, newValue: any, target: any) => {
        let type = Reflect.getMetadata("design:type", target, key);
        // console.log("this is the type option", type, isEnum, IsValidEnum(newValue, type));

        let invalidType = false;

        if((As == "Enum" && !IsValidEnum(newValue, type))
            || (type == String && !IsValidString(newValue, As))
            || (type == Number && !IsValidNumber(newValue))
        ){
            throw new InvalidArgumentError(key, newValue);
        }
        return newValue;
    }
    return fixPropertyDecorator(CustomPropertyDecorator)(setter);
}