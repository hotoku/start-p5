import Matter, { Body } from "matter-js";
import p5 from "p5";

type Options = {
  friction: number;
  restitution: number;
  angle: number;
  isStatic: boolean;
};

class Boundary {
  body: Body;
  x: number;
  y: number;
  w: number;
  h: number;
  options: Options;
  constructor(x: number, y: number, w: number, h: number, a: number) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.options = {
      friction: 0,
      restitution: 0.95,
      angle: a,
      isStatic: true,
    };
  }
}

function sketch(p: p5) {
  let Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;

  let engine;
  let world;
  let circles = [];
  let boundaries = [];

  let ground;

  function Boundary(x, y, w, h, a) {
    let options = {
      friction: 0,
      restitution: 0.95,
      angle: a,
      isStatic: true,
    };
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.w = w;
    this.h = h;
    World.add(world, this.body);
    console.log(this.body);

    this.show = function () {
      let pos = this.body.position;
      let angle = this.body.angle;
      p.push();
      p.translate(pos.x, pos.y);
      p.rotate(angle);
      p.rectMode(p.CENTER);
      p.strokeWeight(1);
      p.noStroke();
      p.fill(0, 100, 200);
      p.rect(0, 0, this.w, this.h);
      p.pop();
    };
  }

  function setup() {
    p.createCanvas(400, 400);
    engine = Engine.create();
    world = engine.world;

    boundaries.push(new Boundary(150, 100, p.width * 0.6, 20, 0.3));
    boundaries.push(new Boundary(250, 300, p.width * 0.6, 20, -0.3));
  }

  function mouseDragged() {
    circles.push(new Circle(mouseX, mouseY, random(5, 10)));
  }

  function draw() {
    background(180);
    Engine.update(engine);
    for (let i = 0; i < circles.length; i++) {
      circles[i].show();
    }
    for (let i = 0; i < boundaries.length; i++) {
      boundaries[i].show();
    }
  }

  function Circle(x, y, r) {
    let options = {
      friction: 0,
      restitution: 0.95,
    };
    this.body = Bodies.circle(x, y, r, options);
    this.r = r;
    World.add(world, this.body);

    this.show = function () {
      let pos = this.body.position;
      let angle = this.body.angle;
      push();
      translate(pos.x, pos.y);
      rotate(angle);
      rectMode(CENTER);
      strokeWeight(1);
      stroke(255);
      fill(0, 0, 80);
      ellipse(0, 0, this.r * 2);
      pop();
    };
  }
}

new p5(sketch);
