// 创建画布
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

// 设置画布尺寸
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 定义三角形
class Triangle {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.speedX = Math.random() * 4 - 2;
    this.speedY = Math.random() * 4 - 2;
  }

  // 更新三角形位置
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // 边界检测
    if (this.x + this.size > canvas.width || this.x - this.size < 0) {
      this.speedX = -this.speedX;
    }
    if (this.y + this.size > canvas.height || this.y - this.size < 0) {
      this.speedY = -this.speedY;
    }
  }

  // 绘制三角形
  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y - this.size);
    ctx.lineTo(this.x - this.size, this.y + this.size);
    ctx.lineTo(this.x + this.size, this.y + this.size);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

// 创建一些随机三角形
const triangles = [];
for (let i = 0; i < 10; i++) {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const size = Math.random() * 20 + 10;
  const color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
  triangles.push(new Triangle(x, y, size, color));
}

// 动画循环
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  triangles.forEach(triangle => {
    triangle.update();
    triangle.draw();
  });
  requestAnimationFrame(animate);
}

// 开始动画
animate();
