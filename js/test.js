let progress = 0

class Cubic {
  constructor (a, b, c, d) {
    this.px3 = 3 * a
    this.px2 = 3 * (c - a) - this.px3
    this.px1 = 1 - this.px3 - this.px2
    this.py3 = 3 * b
    this.py2 = 3 * (d - b) - this.py3
    this.py1 = 1 - this.py3 - this.py2
    this.epsilon = 1e-7      // 目标精度
  }

  getX(t) {
    return ((this.px1 * t + this.px2) * t + this.px3) * t
  }

  getY(t) {
    return ((this.py1 * t + this.py2) * t + this.py3) * t    
  }

  solve(x) {
    if (x === 0 || x === 1) {             // 对 0 和 1 两个特殊 t 不做计算
      return this.getY(x)
    } 
    let t = x
    for (let i = 0; i < 8; i++) {         // 进行 8 次迭代
      let g = this.getX(t) - x
      if (Math.abs(g) < this.epsilon) {   // 检测误差到可以接受的范围
        return this.getY(t)
      }
      let d = (3 * this.px1 * t + 2 * this.px2) * t + this.px3   // 对 x 求导
      if (Math.abs(d) < 1e-6) {           // 如果梯度过低，说明牛顿迭代法无法达到更高精度
        break
      }
      t = t - g / d
    }
    return this.getY(t)                   // 对得到的近似 t 求 y
  }
}
/**
 * 
 * @param {*} startTime 起始时间
 * @param {*} totalTime 共需时间
 * @param {*} startPX 起始值
 * @param {*} totalPX 最终值
 * @returns 
 */
function init(startTime, totalTime, startPX, totalPX, type){
  const start = [0.5, 0.5, 0.5, 0.5]
  // const end = [.37,.54,.63,1];
  const end = [.39,.61,.74,.99];
  const cub = type === 1 ? start : end;
  let cubic = new Cubic(...cub);
  function getCurrent(time){
    progress = (time - startTime) / totalTime;
    if (progress >= 1) {
      progress = 1
    }
    const result = cubic.getY(progress) * (totalPX - startPX) + startPX;
    return Math.round(result)
  }
  return getCurrent;
}