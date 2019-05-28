export function sealed(name: string) {
  return function(target: Function): void {
    console.log(`Sealing the constructor ${name}`);
    Object.seal(target);
    Object.seal(target.prototype);
  };
}

export function logger<TFunction extends Function>(
  target: TFunction
): TFunction {
  const newConstructor: Function = function() {
    console.log(`Creating new instance`);
    console.log(target.name);

    this.age = 30;
  };

  newConstructor.prototype = Object.create(target.prototype);
  newConstructor.prototype.constructor = target;

  newConstructor.prototype.printLibrarian = function() {
    console.log(`Librarian name:  ${this.name}, Librarian age: ${this.age}`);
  };

  return <TFunction>newConstructor;
}

export function writable(isWritable: boolean) {
  return function(
    target: Object,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log(`Decorate method: ${propertyKey}`);
    descriptor.writable = isWritable;
  };
}

export function timeout(ms: number = 0) {
  return function(
    target: Object,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = function(...args) {
      setTimeout(() => {
        originalMethod.apply(this, args);
      }, ms);
    };
    return descriptor;
  };
}

// декоратор logParameter в свойство прототипа `${methodName}_decor_params_indexes` сохраняет индекс того параметра, который мы декорируем
// декоратор logMethod достает этот индекс и выводит `Method: ${methodName}, ParamIndex: ${index}, ParamValue: ${arg}`
export function logParameter(
  target: Object,
  methodName: string,
  paramIndex: number
) {
  const key = `${methodName}_decor_params_indexes`;

  if (Array.isArray(target[key])) {
    target[key].push(paramIndex);
  } else {
    target[key] = [paramIndex];
  }
}

export function logMethod(
  target: Object,
  methodName: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function(...args) {
    const indexes = target[`${methodName}_decor_params_indexes`];

    if (Array.isArray(indexes)) {
      args.forEach((arg, index) => {
        if (indexes.indexOf(index) !== -1) {
          console.log(
            `Method: ${methodName}, ParamIndex: ${index}, ParamValue: ${arg}`
          );
        }
      });
    }
    const result = originalMethod.apply(this, args);
    return result;
  };

  return descriptor;
}

function makeProperty<T>(
  prototype: any,
  propertyName: string,
  getTransformer: (value: any) => T,
  setTransformer: (value: any) => T
) {
  const values = new Map<any, T>();

  Object.defineProperty(prototype, propertyName, {
    set(firstValue: any) {
      Object.defineProperty(this, propertyName, {
        get() {
          if (getTransformer) {
            return getTransformer(values.get(this));
          } else {
            values.get(this);
          }
        },
        set(value: any) {
          if (setTransformer) {
            values.set(this, setTransformer(value));
          } else {
            values.set(this, value);
          }
        },
        enumerable: true
      });
      this[propertyName] = firstValue;
    },
    enumerable: true,
    configurable: true
  });
}

export function format(pref: string = 'Mr./Mrs.') {
  return function(target: Object, propertyName: string) {
    makeProperty(
      target,
      propertyName,
      value => `${pref} ${value}`,
      value => value
    );
  };
}

export function positiveInteger(
  target: object,
  propertyName: string,
  descriptor: PropertyDescriptor
) {
  const originalSetter = descriptor.set;

  descriptor.set = function(value: number) {
    if (value <= 0 || !Number.isInteger(value)) {
      throw new Error(
        `Invalid value. ${propertyName} must be a positive integer`
      );
    }

    originalSetter.call(this, value);
  };

  return descriptor;
}
