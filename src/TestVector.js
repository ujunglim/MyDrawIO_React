import React, { useEffect } from "react";

class Vec3 {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  plus(v) {
    return new Vec3(this.x + v.x, this.y + v.y, this.z + v.z);
  }
  minus(v) {
    return new Vec3(this.x - v.x, this.y - v.y, this.z - v.z);
  }
  multiply(v) {
    return new Vec3(this.x * v.x, this.y * v.y, this.z * v.z);
  }
  distance() {
    const r = this.multiply(this); // 49 0 0
    return Math.sqrt(r.x + r.y + r.z);
  }
}

function TestVector() {
  useEffect(() => {
    const a = new Vec3(1, 1, -4);
    const b = new Vec3(2, 4, 1);
    const c = new Vec3(5, -7, 6);
    const d = new Vec3(1, 1, 0);
    const e = new Vec3(0, 0, 0);

    console.log(a.minus(c).plus(b)); // Vec2 {x: -2, y: 12, z: -9}
    console.log(b.minus(c.minus(a))); //
    console.log(d.minus(e).distance()); //
  });
  return <div>TestVector</div>;
}

export default TestVector;
