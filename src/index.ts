import { Bodies, Body, Engine, World } from "matter-js";
import p5 from "p5";

function sketch(p: p5) {
  let engine: Engine;
  let world: World;
  let circles: Circle[] = [];
  let boundaries: Boundary[] = [];

  class Boundary {
    body: Body;
    w: number;
    h: number;
    constructor(x: number, y: number, w: number, h: number, a: number) {
      this.w = w;
      this.h = h;
      this.body = Bodies.rectangle(x, y, w, h, {
        angle: a,
        friction: 0,
        restitution: 0.95,
        isStatic: true,
      });
      World.add(world, this.body);
    }
    show = () => {
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

  class Circle {
    body: Body;
    r: number;

    constructor(x: number, y: number, r: number) {
      this.r = r;
      this.body = Bodies.circle(x, y, r, {
        friction: 0,
        restitution: 0.95,
      });
      World.add(world, this.body);
    }

    show = () => {
      let pos = this.body.position;
      let angle = this.body.angle;
      p.push();
      p.translate(pos.x, pos.y);
      p.rotate(angle);
      p.rectMode(p.CENTER);
      p.strokeWeight(1);
      p.stroke(255);
      p.fill(0, 0, 80);
      p.ellipse(0, 0, this.r * 2);
      p.pop();
    };
  }

  p.setup = () => {
    p.createCanvas(400, 400);
    engine = Engine.create();
    world = engine.world;

    boundaries.push(new Boundary(150, 100, p.width * 0.6, 20, 0.3));
    boundaries.push(new Boundary(250, 300, p.width * 0.6, 20, -0.3));
  };

  p.mouseDragged = () => {
    circles.push(new Circle(p.mouseX, p.mouseY, p.random(5, 10)));
  };

  p.draw = () => {
    p.background(180);
    Engine.update(engine);
    for (let i = 0; i < circles.length; i++) {
      circles[i].show();
    }
    for (let i = 0; i < boundaries.length; i++) {
      boundaries[i].show();
    }
  };
}

async function main() {
  addEventListener("load", () => {
    new p5(sketch);
    console.log("event listener");
  });
}

main();
