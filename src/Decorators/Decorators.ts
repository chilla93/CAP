// export function fixPropertyDecorator<T extends Function>(decorator: any): T {
//     return ((...args: any[]) => (
//         target: any,
//         propertyName: any,
//         ...decoratorArgs: any[]
//     ) => {
        
//         decorator(...args)(target, propertyName, ...decoratorArgs);

//         for (let arg of decoratorArgs) {
//         if (!arg) {
//             continue;
//         }

//         target[propertyName] = arg.initializer ? arg.initializer() : undefined;
//     }

//         return Object.getOwnPropertyDescriptor(target, propertyName);
//     }) as any;
// }

export function fixPropertyDecorator<T extends Function>(decorator: T): T {
    return ((...args: any[]) => (
        target: any,
        propertyName: any,
        ...decoratorArgs: any[]
    ) => {
        
        decorator(...args)(target, propertyName, ...decoratorArgs);

        for (let arg of decoratorArgs) {
        if (!arg) {
            continue;
        }

        target[propertyName] = arg.initializer ? arg.initializer() : undefined;
    }

        return Object.getOwnPropertyDescriptor(target, propertyName);
    }) as any;
}


export function CustomPropertyDecorator(setterValidator?: setterValidatorFunction<any>){
    return (
        target: any,
        key: any,
        ...args: any[]
    ) => {
        // delete target[key];
        const backingKey = "_"+key;

        Object.defineProperty(target, backingKey, {
            writable: true,
            enumerable: true,
            configurable: true
        });

        const getter = function(this: any)  {
            return this[backingKey];
        };
        const setter = function (this:any, next: any) {
            //the setter gets called initially before the class is instantiated
            // console.log()
            if(this[backingKey] == undefined && next == undefined){
                console.log(target, this);
                return;
            }

            const value = setterValidator && setterValidator(key, next, target)

            
            this[backingKey] = value;
        };
        
        // Object.deleteProperty(target, key);
        Object.defineProperty(target, key, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true,
            // writable: true
        });
    }

};

export function CustomPropertyDecorator2(target: any, key: string, setterValidator?: setterValidatorFunction<any>){
    // delete target[key];

    const backingKey = "_"+key;

    Object.defineProperty(target, backingKey, {
        writable: true,
        enumerable: true,
        configurable: true
    });

    const getter = function(this: any)  {
        return this[backingKey];
    };
    const setter = function (this:any, next: any) {
        //the setter gets called initially before the class is instantiated
        // console.log()
        if(this[backingKey] == undefined && next == undefined){
            console.log(target, this);
            return;
        }

        const value = setterValidator && setterValidator(key, next, target)

        
        this[backingKey] = value;
    };
    
    // Object.deleteProperty(target, key);
    Object.defineProperty(target, key, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true,
        // writable: true
    });
};

// export function PropertyDecoratorWithValidator(setter: setterValidatorFunction<string>){
//     // const decorator = (s: setterValidatorFunction<string>) => CustomPropertyDecorator
//     return fixPropertyDecorator(CustomPropertyDecorator)(setter);                                        
// }

export function PropertyDecoratorWithValidator(setter: setterValidatorFunction<string>){
    return (target: any, key: string) =>  CustomPropertyDecorator2(target, 
                                                key,
                                                setter);                                      
}

export type setterValidatorFunction<T> = (key: string, newValue: T, target: any) => T;