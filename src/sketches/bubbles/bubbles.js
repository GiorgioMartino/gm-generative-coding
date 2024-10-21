import {ReactP5Wrapper} from "@p5-wrapper/react";

function bubbles(p5) {

    let bubbles = [];

    p5.setup = () => {
        p5.createCanvas(p5.windowWidth-15, p5.windowHeight-20);
    }

    p5.mouseDragged = () => {
        bubbles.push(new Bubble(p5.mouseX, p5.mouseY, p5.random(5, 30)));
    }

    p5.draw = () => {
        p5.background(0);

        let bubblesToDelete = [];

        for (let bubble of bubbles) {
            bubble.move();
            bubble.show();
            let a = bubble.updateTTL();
            if (a !== null) {
                // print(a);
                bubblesToDelete.push(a);
            }
        }

        if (bubblesToDelete.length > 0) {
            // print(bubblesToDelete);
            for (let i = 0; i < bubblesToDelete.length; i++) {
                bubbles.shift();
            }
        }
    }

    class Bubble {
        constructor(x, y, r) {
            this.x = x;
            this.y = y;
            this.r = r;
            this.opacity = 75;
            this.counter = 0;
        }

        show() {
            p5.noStroke();
            p5.fill(255, this.opacity);
            p5.ellipse(this.x, this.y, this.r * 2);
        }

        move() {
            this.x = this.x + p5.random(-5, 5);
            this.y = this.y + p5.random(-5, 5);
        }

        updateTTL() {
            this.counter++;

            if (this.counter >= 4) {
                this.counter = 0;
                this.opacity--;
            }
            if (this.opacity <= 0) return this;
            else return null;
        }
    }
}

export default function Bubbles() {
    return <ReactP5Wrapper sketch={bubbles} />;
}