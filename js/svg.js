const getX = new Bezier2(100, 250, 400); // 100 350 Q 250 50 400 350
const getY = new Bezier2(350, 50, 350);
const c = new CubicBezier(.25,.1,.25,1);
const point = document.getElementById("point");
let t = 0;
function setXY () {
  x = c.sampleCurveX(t);
  y = c.sampleCurveY(t);
  point.style.top = y * 100 + "px";
  point.style.left = x  * 100 + "px";
  if (t >= 1) {
    cancelAnimationFrame(frame);
  } else {
    t = t + 0.005;
    frame = requestAnimationFrame(setXY)
  }
}
let frame = requestAnimationFrame(setXY)

// const a = {"ease":".25,.1,.25,1","linear":"0,0,1,1","ease-in":".42,0,1,1","ease-out":"0,0,.58,1","ease-in-out":".42,0,.58,1"}
// const step = [0,0,1,1];
// // const c = new Cubic(.42,0,.58,1);
// // const c = new Cubic(.42,.42,.5,.5);
// const c = new CubicBezier(...step);
// const box = document.getElementById("box");
// // const box0 = document.getElementById("box0");
// const box1 = document.getElementById("box1");
// const box2 = document.getElementById("box2");
// let setBox2Frame, time, totalTime = 1000;
// function onGo(){
//   box.style.left = 220 + "px";
//   time = Date.now();
//   setBox2Frame = requestAnimationFrame(setBox2);
// }
// function setBox2(){
//   const now = Date.now();
//   let t = (now - time) / totalTime;
//   if (t >= 1) {
//     t = 1;
//   }
//   const y0 = c.solve0(t);
//   const y1 = c.solve1(t);
//   const y2 = c.solve(t);
//   // box0.style.left = 200 * y0 + 20 + "px";
//   box1.style.left = 200 * y1 + 20 + "px";
//   box2.style.left = 200 * y2 + 20 + "px";
//   if (t >= 1) {
//     cancelAnimationFrame(setBox2Frame);
//   } else {
//     setBox2Frame = requestAnimationFrame(setBox2)
//   }
// }