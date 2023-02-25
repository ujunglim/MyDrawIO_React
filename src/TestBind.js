import React, { useEffect } from "react";

// ============= transaction of function in JS =============

class AClass {
  constructor() {
    this.name = "a class";
  }
  print() {
    console.log(this.name);
    // console.log(this);
  }
}

class BClass {
  constructor() {
    this.name = "b class";
    this.cb = null;
  }
  onPrint() {
    this.cb();
  }

  addEventListener(func) {
    this.cb = func;
  }
}

function TestBind() {
  useEffect(() => {
    const aClass = new AClass();
    const bClass = new BClass();

    aClass.print(); // a class
    bClass.addEventListener(aClass.print);
    bClass.onPrint(); // undefined / b class

    // give to variable
    // let cb = aClass.print;
    // console.log(cb());

    // give to obj
    let obj = {
      name: "obj", // name: "obj",
      cb: aClass.print,
    };

    // diff btw class & obj: class is template, can clone instance
    // instances of class have same type, but individual of each other.

    obj.cb();

    // ==================================================
    function normalFunc() {
      console.log(this.name);
    }

    const objWithName = {
      name: "obj with name",
      // cb: normalFunc,
    };

    objWithName.cb = normalFunc;

    // normalFunc();
    objWithName.cb();

    // =======================================
    let bindedNormalFunc = normalFunc.bind(aClass); // a class (bind children => parent)
    // aClass.normalFunc(); // undefined aClass doesnt have normalFunc
    aClass.normalFunc = bindedNormalFunc; // (reference parent => children)
    aClass.normalFunc(); // a class

    // ==============================
    objWithName.normalFunc = bindedNormalFunc;
    objWithName.normalFunc(); // a class
    bindedNormalFunc(); // a class
    // get this of a function
    // console.log(bindedNormalFunc().this);
    // ====================== experiments ==========================
    function getName() {
      this && console.log(this.name);
    }
    // getName(); // typeError: Cannot read properties of undefined

    const obj1 = {
      name: "obj1",
      cb: null,
    };

    // obj reference function
    // obj1.cb = getName;
    // obj1.cb();

    // // function bind obj
    const bindedGetName = getName.bind(obj1); // return new binded func
    getName();
    bindedGetName(); // obj1

    // class reference function
    class Class1 {
      constructor() {
        this.name = "class1";
      }
    }

    const class1 = new Class1();
    // parent => child
    class1.cb = getName;
    class1.cb(); // class1

    // child => parent
    const bindedGetName2 = getName.bind(class1);
    getName();
    bindedGetName2(); // class1
    // ====================================
    class Class2 {
      constructor() {
        this.name = "class2";
      }

      printName() {
        console.log(this.name);
      }
    }

    // =========== getting method of class ===========
    // 1) through instance
    const class2 = new Class2();
    console.log(class2.printName); // f
    // 2) prototype (dont need to create prototype)
    console.log(Class2.prototype.printName); // f

    // give method to an variable, obj
    const funcVar = Class2.prototype.printName;
    // funcVar(); // type error
    console.log(funcVar); // f
    // funcVar.name = "funcVar"; // cannot assign prop to f

    const arrParent = []; // [], {} class complex types
    arrParent.funcVar = funcVar;
    console.log(arrParent);
    arrParent.name = "array parent Variable";
    // funcVar(); // type error
    arrParent.funcVar(); // parent funcVar

    const objParent = {
      name: "obj parent",
      funcVar,
    };
    objParent.funcVar(); // obj parent

    // ============ can i change this of binded method of class? ============
    class Class3 {
      constructor(num) {
        this.name = `class3_${num}`;
      }

      getName() {
        console.log(this.name);
      }
    }

    console.log(typeof Class3, typeof new Class3()); // f, obj
    const getNameFunc = Class3.prototype.getName;

    // console.log(getNameFunc()); // type error because has no this
    const class3_1 = new Class3(1);
    const bindedGetNameFunc = getNameFunc.bind(class3_1);
    bindedGetNameFunc(); // class3_1

    const class3_2 = new Class3(2);
    const bindedGetNameFunc2 = getNameFunc.bind(class3_2);
    bindedGetNameFunc2(); // class3_2

    console.log(bindedGetNameFunc === bindedGetNameFunc2); // false (binded1 !== binded2)
    console.log(getNameFunc === bindedGetNameFunc); // false (original !== binded)

    // ========== binded function get original this ===================
    class OriginalClass {
      constructor() {
        this.name = "original";
        this.funcFromOtherClass = bindedGetNameFunc;
      }
    }
    const original = new OriginalClass();
    original.funcFromOtherClass(); // class3_1

    const aaa = { name: "aaa" };
    aaa.cb = bindedGetNameFunc;
    aaa.cb(); // class3_1
    aaa.cb = getNameFunc;
    aaa.cb(); // aaa

    // =========== function obj can't have this ===============================
    function test() {
      console.log(test.a);
    }
    const f = test;
    f.a = 10;
    f();
  }, []);
  return <div>TestBind</div>;
}

export default TestBind;
