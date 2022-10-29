const room = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
];

let robotPosition = 0;

const robotPlacement = {
    x: 1,
    y: 1,
}

const warn = document.getElementById('warn');

window.addEventListener('load', function () {
    const roomContainer = document.getElementById('room');
    room.forEach((row, index) => {
        const rows = document.createElement('div');
        rows.id = `row${index + 1}`;
        rows.className = 'row';
        row.forEach(col => {
            const cols = document.createElement('div');
            cols.id = `${index + 1}col${col}`;
            cols.className = 'cell';
            rows.appendChild(cols);
        });
        roomContainer.appendChild(rows);
    });
    const col1 = document.getElementById('1col1');
    col1.innerHTML = '&#x2192';
    warn.className = 'hidden';
});

const turnBtn = document.getElementById('turn');

turnBtn.addEventListener('click', function () {
    const { x, y } = robotPlacement;
    const col1 = document.getElementById(`${x}col${y}`);
    col1.classList.remove(`rotate-${robotPosition === 0 ? 360 : robotPosition}`);
    robotPosition += 90;
    col1.classList.add(`rotate-${robotPosition}`);
    if (robotPosition === 360) {
        robotPosition = 0;
    }
});

const moveBtn = document.getElementById('move');

moveBtn.addEventListener('click', function () {
    const { x: prevRow, y: prevCol } = robotPlacement;
    switch (robotPosition) {
        case 0:
            if (robotPlacement.y === 10) {
                warn.className = 'warn visible';
                return;
            }
            robotPlacement.y++;
        break;
        case 90:
            if (robotPlacement.x === 10) {
                warn.className = 'warn visible';
                return;
            }
            robotPlacement.x++;
        break;
        case 180:
            if (robotPlacement.y === 1) {
                warn.className = 'warn visible';
                return;
            }
            robotPlacement.y--;
        break;
        case 270:
            if (robotPlacement.x === 1) {
                warn.className = 'warn visible';
                return;
            }
            robotPlacement.x--;
        break;
    }
    const {x, y} = robotPlacement;
    setRobot(prevRow, prevCol, x, y);
});

const resetBtn = document.getElementById('reset');

resetBtn.addEventListener('click', function () {
    const {x, y} = robotPlacement;
    robotPlacement.x = 1;
    robotPlacement.y = 1;
    robotPosition = 0;
    setRobot(x, y, 1, 1);
});

function setRobot(prevRow, prevCol, newRow, newCol) {
    warn.className = 'hidden';
    const col1 = document.getElementById(`${prevRow}col${prevCol}`);
    col1.innerHTML = '';
    col1.classList.remove(`rotate-${robotPosition}`);
    const col2 = document.getElementById(`${newRow}col${newCol}`);
    col2.innerHTML = '&#x2192';
    col2.classList.add(`rotate-${robotPosition}`);
}