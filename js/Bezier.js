function Bezier1(P0, P1){
  this.P0 = P0;
  this.P1 = P1;
  return this.func.bind(this);
}
function Bezier2(P0, P1, P2){
  this.P0 = P0;
  this.P1 = P1;
  this.P2 = P2;
  return (t) => (1 - t) * (1 - t) * P0 + 2 * t * (1 - t) * P1 + t * t * P2;
}

Bezier1.prototype.func = function(t){
  let result = (1 - t) * this.P0 + t * this.P1;
  return result;
}
Bezier2.prototype.func = function(t){
  let result = (1 - t) * (1 - t) * this.P0 + 2 * t * (1 - t) * this.P1 + t * t * this.P2;
  return result;
}


function CubicBezier(x1, y1, x2, y2) {
  this.x1 = x1;
  this.y1 = y1;
  this.x2 = x2;
  this.y2 = y2;
  this.px3 = 3 * x1
  this.px2 = 3 * (x2 - x1) - this.px3
  this.px1 = 1 - this.px3 - this.px2
  this.epsilon = 1e-7;
}
CubicBezier.prototype.sampleCurveX = function(t){
  const x1 = this.x1, x2 = this.x2;
  return (3 * x1 - 3 * x2 + 1) * t*t*t + (3 * x2 - 6 * x1) * t*t + 3 * x1 * t;
}
CubicBezier.prototype.sampleCurveY = function(t){
  const y1 = this.y1, y2 = this.y2;
  return (3 * y1 - 3 * y2 + 1) * t*t*t + (3 * y2 - 6 * y1) * t*t + 3 * y1 * t;
}
CubicBezier.prototype.solve1 = function(t){
  return this.sampleCurveY(this.sampleCurveX(t))
}
CubicBezier.prototype.solve0 = function(t){
  return this.sampleCurveY(t)
}

CubicBezier.prototype.solve = function(x){
  if (x === 0 || x === 1) {             // 对 0 和 1 两个特殊 t 不做计算
    return this.sampleCurveY(x)
  } 
  let t = x
  for (let i = 0; i < 8; i++) {         // 进行 8 次迭代
    let g = this.sampleCurveX(t) - x
    if (Math.abs(g) < this.epsilon) {   // 检测误差到可以接受的范围
      return this.sampleCurveY(t)
    }
    let d = (3 * this.px1 * t + 2 * this.px2) * t + this.px3   // 对 x 求导
    if (Math.abs(d) < 1e-6) {           // 如果梯度过低，说明牛顿迭代法无法达到更高精度
      break
    }
    t = t - g / d
  }
  return this.sampleCurveY(t)                   // 对得到的近似 t 求 y
}