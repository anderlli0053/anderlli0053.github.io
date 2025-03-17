/*!
 * Snowfall.js - A JavaScript library for creating and animating snowflakes on a web page
 * https://github.com/Andrey-1988-dev/snowfall.js
 *
 * Author: Andrey Yurkevich (https://github.com/Andrey-1988-dev)
 * Contact: yurkevich.a.n.1988@gmail.com
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 * Version: 1.1.0
 * Date: 2021-11-27T00:00Z
 */

'use strict';

// Class for creating snowflakes
class Snowflake {
    constructor(canvas, h, s, c, t) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.h = h;
        this.s = s;
        this.c = c;
        this.t = t;
    }

    calculateNewPosition = (oldPosition, oldCanvasSize, newCanvasSize) => {
        let percentage = oldPosition / (oldCanvasSize / 100);
        return (newCanvasSize / 100) * percentage;
    };

    updateAfterCanvasResize = (oldCanvasWidth, oldCanvasHeight, newCanvasWidth, newCanvasHeight) => {
        if (oldCanvasWidth !== newCanvasWidth) {
            this.x = this.calculateNewPosition(this.x, oldCanvasWidth, newCanvasWidth);
        }
        if (oldCanvasHeight !== newCanvasHeight) {
            this.y = this.calculateNewPosition(this.y, oldCanvasHeight, newCanvasHeight);
        }
    };

    draw = (ctx) => {
        if (
            this.x + this.h >= window.scrollX &&
            this.x - this.h <= window.scrollX + window.innerWidth &&
            this.y + this.h >= window.scrollY &&
            this.y - this.h <= window.scrollY + window.innerHeight
        ) {
            ctx.fillStyle = this.c;
            ctx.font = this.h + 'px Arial, sans-serif';
            ctx.fillText(this.t, this.x, this.y);
        }
    };

    update = (canvas) => {
        this.y += this.s;
        if (this.s > 0) {
            if (this.y > canvas.height) {
                this.y = -this.h;
                this.x = Math.random() * canvas.width;
            }
        } else {
            if (this.y < 0) {
                this.y = canvas.height + this.h;
                this.x = Math.random() * canvas.width;
            }
        }
    };
}

class Snowfall {
    // Remove the unused property
    // requestAnimationFrame;

    constructor(options = {}) {
        let {
            count = 100,
            minRadius = 10,
            maxRadius = 30,
            minSpeed = 3,
            maxSpeed = 10,
            text = '❄',
            color = '#99ccff',
            zIndex = '1000',
        } = options;

        count = Number(count);
        minRadius = Number(minRadius);
        if (minRadius <= 0) {
            minRadius = 10;
        }
        maxRadius = Number(maxRadius);
        if (maxRadius <= 0) {
            maxRadius = 30;
        }
        minSpeed = Number(minSpeed);
        maxSpeed = Number(maxSpeed);

        const snowfieldCanvas = document.createElement('canvas');
        snowfieldCanvas.id = 'snowfall';
        snowfieldCanvas.style.zIndex = zIndex;
        snowfieldCanvas.style.position = 'absolute';
        snowfieldCanvas.style.top = '0';
        snowfieldCanvas.style.left = '0';
        snowfieldCanvas.style.pointerEvents = 'none';

        document.body.append(snowfieldCanvas);

        this.canvas = snowfieldCanvas;
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        window.addEventListener('resize', () => {
            requestAnimationFrame(this.resizeCanvas.bind(this));
        });

        this.snowflakes = [];
        this.count = count;
        this.minRadius = minRadius;
        this.maxRadius = maxRadius;
        this.minSpeed = minSpeed;
        this.maxSpeed = maxSpeed;
        this.color = color;
        this.text = text;
        this.createSnowflakes();
        this.animateSnowflakes();
    }

    resizeCanvas = () => {
        this.canvas.style.display = 'none';

        if (window.devicePixelRatio > 1) {
            let scrollWidth = document.documentElement.scrollWidth;
            let scrollHeight = document.documentElement.scrollHeight;
            this.canvas.width = scrollWidth * window.devicePixelRatio;
            this.canvas.height = scrollHeight * window.devicePixelRatio;
            this.canvas.style.width = scrollWidth + 'px';
            this.canvas.style.height = scrollHeight + 'px';
            this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        } else {
            this.canvas.width = document.documentElement.scrollWidth;
            this.canvas.height = document.documentElement.scrollHeight;
        }

        this.canvas.style.display = '';

        if (this.snowflakes) {
            let newCanvasWidth = this.canvas.width;
            let newCanvasHeight = this.canvas.height;

            for (let snowflake of this.snowflakes) {
                snowflake.updateAfterCanvasResize(newCanvasWidth, newCanvasHeight);
            }
        }
    };

    createSnowflakes = () => {
        for (let i = 0; i < this.count; i++) {
            let r = this.minRadius + Math.random() * (this.maxRadius - this.minRadius);
            let rp;
            if (this.minRadius !== this.maxRadius) {
                rp = ((r - this.minRadius) / (this.maxRadius - this.minRadius)) * 100;
            } else {
                rp = 100;
            }
            let s = this.minSpeed + ((this.maxSpeed - this.minSpeed) / 100) * rp;
            let snowflake = new Snowflake(this.canvas, r, s, this.color, this.text);
            this.snowflakes.push(snowflake);
        }
    };

    animateSnowflakes = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let snowflake of this.snowflakes) {
            snowflake.draw(this.ctx);
            snowflake.update(this.canvas);
        }

        this.requestAnimationFrame = requestAnimationFrame(this.animateSnowflakes);
    };

    destroy = () => {
        cancelAnimationFrame(this.requestAnimationFrame);
        document.getElementById('snowfall').remove();
        for (let name in this) {
            delete this[name];
        }
        this.snowflakes = [];
        window.removeEventListener('resize', this.resizeCanvas);
    };
}

// Written by Andrew Poženel - 2023
