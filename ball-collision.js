class BallCollision {
    constructor({ wrapHeight, wrapWidth, ballsNum = 10 }) {
        // 存放小球的数组
        this.balls = [];
        this.opt = {
            // 容器的高度
            wrapHeight,
            wrapWidth,
            // 小球的数量
            ballsNum
        };
    }

    moveBall (ball) {
        setInterval(() => {
            ball.style.left = ball.x + 'px';
            ball.style.top = ball.y + 'px';
            
            if (ball.xDirection) {
                ball.x += ball.speed;
                if (ball.x > this.opt.wrapWidth - ball.clientWidth) {
                    ball.xDirection = false;
                }
            } else {
                ball.x -= ball.speed;
                if (ball.x <= 0) {
                    ball.xDirection = true;
                }
            }

            if (ball.yDirection) {
                ball.y += ball.speed;
                if (ball.y > this.opt.wrapHeight - ball.clientHeight) {
                    ball.yDirection = false;
                }
            } else {
                ball.y -= ball.speed;
                if (ball.y <= 0) {
                    ball.yDirection = true;
                }
            }
            this.crash(ball);
        }, 10)
    }

    createballs() {
        for (let i = 0; i < this.opt.ballsNum ; i++) {
            const ball = document.createElement('div');
            ball.classList.add('ball');
            ball.x = this.randomNum(0, this.opt.wrapWidth);
            ball.y = this.randomNum(0, this.opt.wrapHeight);
            ball.speed = this.randomNum(1, 4);
            ball.style.background = this.randomColor();
            ball.innerHTML = i + 1;
            ball.xDirection === Math.random() - 0.5 > 0;
            ball.yDirection === Math.random() - 0.5 > 0;
            document.querySelector('.wrap').appendChild(ball);
            this.balls.push(ball);
        }
    }

    crash(ball) {
        this.balls.forEach(item => {
            if (ball === item) return;
            
            if (Math.pow(ball.x - item.x, 2) + Math.pow(ball.y - item.y, 2) <= Math.pow(item.clientWidth + ball.clientWidth, 2)) {
                if (ball.x < item.x) {
                    if (ball.y < item.y) {
                        ball.xDirection = false;
                        ball.yDirection = false;
                    } else if (ball.y === item.y) {
                        ball.xDirection = false;
                    } else {
                        ball.xDirection = false;
                        ball.yDirection = true;
                    }
                } else if (ball.x === item.x) {
                    if (ball.y < item.y) {
                        ball.yDirection = false;
                    } else {
                        ball.yDirection = true;
                    }
                } else {
                    if (ball.y < item.y) {
                        ball.xDirection = true;
                        ball.yDirection = false;
                    } else if (ball.y === item.y) {
                        ball.xDirection = true;
                    } else {
                        ball.xDirection = true;
                        ball.yDirection = true;
                    }
                }
            }
        })
    }

    init() {
        this.createballs();
        this.balls.forEach(item => {
            this.moveBall(item);
        })
    }

    // 随机 m~n
    randomNum(m, n) {
        return Math.floor(Math.random() * (n - m + 1) + m);
    }

    randomColor() {
        const r = this.randomNum(0, 255);
        const g = this.randomNum(0, 255);
        const b = this.randomNum(0, 255);
        return `rgb(${r}, ${g}, ${b})`
    }
}