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

const robotPointer = document.createElement('div');
robotPointer.innerHTML = '&#x2192';

window.addEventListener('load', function () {
    const roomContainer = document.getElementById('room');
    room.forEach((row, index) => {
        const rows = document.createElement('div');
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
    col1.appendChild(robotPointer);
});

const turnBtn = document.getElementById('turn');

turnBtn.addEventListener('click', function () {
    robotPosition += 90;
    if (robotPosition === 360) {
        robotPosition = 0;
    }
    robotPointer.className = `rotate-${robotPosition}`;
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
    moveRobot(prevRow, prevCol, x, y);
});

const resetBtn = document.getElementById('reset');

resetBtn.addEventListener('click', function () {
    const {x, y} = robotPlacement;
    robotPlacement.x = 1;
    robotPlacement.y = 1;
    robotPosition = 0;
    moveRobot(x, y, 1, 1);
});

function moveRobot(prevRow, prevCol, newRow, newCol) {
    warn.className = 'hidden';
    const col1 = document.getElementById(`${prevRow}col${prevCol}`);
    col1.removeChild(robotPointer);
    col1.classList.remove('enlarge');
    const col2 = document.getElementById(`${newRow}col${newCol}`);
    col2.appendChild(robotPointer);
    col2.classList.add('enlarge');

}