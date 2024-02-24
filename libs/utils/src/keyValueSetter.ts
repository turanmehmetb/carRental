
export function keyValueSetter(that: any, entity: any): any {
    for(const key of Object.keys(entity)) {
        if(entity[key]) 
            that[key] = entity[key];
    }
    return that;
}