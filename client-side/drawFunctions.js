const drawBarrels = (x, y, barrels) => {
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.fillStyle = "#999999";
    ctx.strokeStyle = ColorLuminance("#999999", -0.23);
    for (let barrel of barrels) {
        ctx.beginPath();
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(barrel.angle * (Math.PI / 180));

        if (barrel.type === 0) {
            ctx.rect(barrel.xOffset, (-barrel.width / 2) - barrel.yOffset, barrel.length, barrel.width);
        } else if (barrel.type === 3) {
            ctx.beginPath();
            ctx.moveTo(barrel.xOffset + 20, -(barrel.width / 4) - barrel.yOffset);
            ctx.lineTo(barrel.xOffset + 20 + (barrel.length / 2), -((barrel.width / 2) + barrel.yOffset) - (barrel.width / 4));
            ctx.lineTo(barrel.xOffset + 20 + (barrel.length / 2), ((barrel.width / 2) - barrel.yOffset) + (barrel.width / 4));
            ctx.lineTo(barrel.xOffset + 20, (barrel.width / 4) - barrel.yOffset);
            ctx.lineTo(barrel.xOffset + 20, -(barrel.width / 4) - barrel.yOffset);
            ctx.closePath();
        }

        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
}

const diepCircle = (x, y, r, color) => {
    ctx.lineWidth = 3;
    ctx.fillStyle = color;
    ctx.strokeStyle = ColorLuminance(color, -0.23);
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
}

const drawTank = (tank) => {
    ctx.save();
    ctx.translate(tank.x - cameraPos.x + w / 2, tank.y - cameraPos.y + h / 2);
    ctx.rotate(tank.angle);
    drawBarrels(0, 0, tank.barrels);
    ctx.restore();

    diepCircle(tank.x - cameraPos.x + w / 2, tank.y - cameraPos.y + h / 2, tank.r, tank.color);
    ctx.font = "16px ubuntu";
    ctx.textAlign = "center";
    ctx.fillStyle = "black";
    ctx.fillText(tank.nickname, tank.x - cameraPos.x + w / 2, tank.y - cameraPos.y + (h / 2) - 75);
}
let gridSquareSize = 18;
const drawBackground = () => {
    ctx.strokeStyle = "#c7c7c7";
    ctx.lineWidth = 1;
    for (let i = 0; i < w / gridSquareSize; i++) {
        ctx.beginPath();
        ctx.moveTo(i * gridSquareSize - cameraPos.x % gridSquareSize, h);
        ctx.lineTo(i * gridSquareSize - cameraPos.x % gridSquareSize, 0);
        ctx.stroke();
    }
    for (let i = 0; i < h / gridSquareSize; i++) {
        ctx.beginPath();
        ctx.moveTo(w, i * gridSquareSize - cameraPos.y % gridSquareSize);
        ctx.lineTo(0, i * gridSquareSize - cameraPos.y % gridSquareSize);
        ctx.stroke();
    }
}