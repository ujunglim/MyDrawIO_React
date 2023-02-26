import React, { useEffect } from "react";

function TestClosure() {
  useEffect(() => {
    // ========= give normal func to obj ==============
    function normalFunc() {
      console.log(this.name);
    }
    let normalObj = {
      name: "obj",
      func: normalFunc,
    };
    normalObj.func(); // obj

    // ========= give arrow func to obj ==============
    const arrowFunc = () => {
      console.log(this.name);
    };

    const obj = {
      name: "obj",
      func: () => {
        console.log(this.name);
      },
    };
    // obj.func(); // this is not undefined => bcz arrow f doesn't have this

    const obj1 = {
      name: "obj",
      func() {
        // 1)
        // const a = () => {
        //   console.log(this.name);
        // };
        // a();
        // 2)
        (() => {
          console.log(this.name);
        })();
      },
    };
    obj1.func(); // obj
    /// diff btw normal, arrow f is arrow doesnt have "this"

    // ============= complex closure ===============
    // let counter = 0;

    // const plus1 = () => {
    //   console.log("plus1", ++counter);
    // };
    // const plus2 = () => {
    //   console.log("plus2", ++counter);
    // };
    // const plus3 = (counter) => {
    //   console.log("plus3", ++counter);
    // };

    // plus3(counter); // 1

    // plus1(); // 1 1
    // plus2(); // 2 2
    // plus3(); // nan
    // plus3(counter); // 3 3
    // get original counter from the outside(not cloned one)
    // parameter of function is clone of variable (it can not change outside)
    // (same value no reference, so they are different) simpletype: number, string, enum cant have reference
    // complex: obj, array, class Instance
    // class is component of simple type, class instance is complex

    // ===============================================================
    let counterObj = {
      value: 0,
    };

    const plus1 = () => {
      console.log("plus1", ++counterObj.value);
    };
    const plus2 = () => {
      console.log("plus2", ++counterObj.value);
    };
    const plus3 = (counterObj) => {
      console.log("plus3", ++counterObj.value);
    };

    plus3(counterObj); // 1

    plus1(); // 1 2
    plus2(); // 2 3
    // plus3(); // error
    plus3(counterObj); // 3 4
    // clone reference (object use reference value) (same reference means === same obj)
    // useref

    // ========== 3 ways to get variable from the inner scope of func ==============
    // property vs variable (property has parent, but varaible doesn't)
    // 1. using closure
    let getFunc; // definition determine scope
    let setFunc;

    function normalFunc2() {
      let value = 0;
      // using closure to get setFunc from outside (bcz it is defined at outside)
      getFunc = () => {
        return value;
      };
      setFunc = (newValue) => {
        value = newValue;
      };
    }

    normalFunc2();
    console.log(getFunc()); // 0
    setFunc("bb");
    console.log(getFunc()); // bb

    // 2. return setter
    // useState hook use setFunc
    function customUseState(initialValue) {
      let state = initialValue;
      // declared inside of func and just return it to outside, no need to use closure
      const setState = (newState) => {
        state = newState;
      };
      return [state, setState];
    }
    customUseState("bb");

    // 3. often used in API, antd.
    // create setter outside of function than pass it as parameter (upgraded v of #1)
    function addition(a, b, onChange) {
      onChange(a + b); // assume it takes long time...
    }
    addition(2, 3, (result) => console.log(result));

    // getter and setter in same time (map, filter, sort...)
    // dynamic setter
    [3, 1, 4].sort((a, b) => a - b);
  }, []);
  return <div>TestClosure</div>;
}

export default TestClosure;
