let gameBoardSize = 40;
let gamePoints = 0;
let gameSpeed = 100;

$(document).ready(function () {
    createBoard();
    $(".play").click(function () {
        startGame();
    });
    $(".overlay").hide();
});

let Snake = {
    position: [
        [20, 20],
        [20, 19],
        [20, 18]
    ],
    size: 3,
    direction: "r",
    alive: true
}

let Food = {
    position: [],
    present: false
}

function createBoard() {
    $(".gameboard").empty();
    let size = gameBoardSize;

    for (i = 0; i < size; i++) {
        $(".gameboard").append('<div class="row"></div>');
        for (j = 0; j < size; j++) {
            $(".row:last-child").append('<div class="pixel"></div>');
        }
    }
}

function moveSnake() {
    let head = Snake.position[0].slice();

    switch (Snake.direction) {
        case 'r':
            head[1] += 1;
            break;
        case 'l':
            head[1] -= 1;
            break;
        case 'u':
            head[0] -= 1;
            break;
        case 'd':
            head[0] += 1;
            break;
    }

    if (alive(head)) {
        // Desenhar a cabeça
        $(".row:nth-child(" + head[0] + ") > .pixel:nth-child(" + head[1] + ")").addClass("snakePixel");

        // Desenhar o resto do corpo
        for (let i = 0; i < Snake.size; i++) {
            $(".row:nth-child(" + Snake.position[i][0] + ") > .pixel:nth-child(" + Snake.position[i][1] + ")").addClass("snakePixel");
        }

        // Se a cabeça tocar na comida
        if (head.every(function (e, i) {
                return e === Food.position[i];
            })) {
            Snake.size++;
            Food.present = false;
            gamePoints += 5;
            $(".row:nth-child(" + Food.position[0] + ") > .pixel:nth-child(" + Food.position[1] + ")").removeClass("foodPixel");
            $(".score").html("Pontuação: " + gamePoints)
            if (gamePoints % 16 == 0 && gameSpeed > 10) {
                gameSpeed -= 5;
            };
        } else {
            $(".row:nth-child(" + Snake.position[Snake.size - 1][0] + ") > .pixel:nth-child(" + Snake.position[Snake.size - 1][1] + ")").removeClass("snakePixel");
            Snake.position.pop();
        }
        Snake.position.unshift(head);
    } else {
        gameOver();
    }
}


function generateFood() {
    if (Food.present === false) {
        Food.position = [Math.floor((Math.random() * 40) + 1), Math.floor((Math.random() * 40) + 1)]
        Food.present = true;
        $(".row:nth-child(" + Food.position[0] + ") > .pixel:nth-child(" + Food.position[1] + ")").addClass("foodPixel");
    }
}

function keyPress() {
    $(document).one("keydown", function (key) {
        switch (key.which) {
            case 37:
                if (Snake.direction != "r") {
                    Snake.direction = "l";
                }
                break;
            case 38:
                if (Snake.direction != "d") {
                    Snake.direction = "u";
                }
                break;
            case 39:
                if (Snake.direction != "l") {
                    Snake.direction = "r";
                }
                break;
            case 40:
                if (Snake.direction != "u") {
                    Snake.direction = "d";
                }
                break;
        }
    });
}

function gameLoop() {
    setTimeout(function () {
        keyPress();
        generateFood();
        moveSnake();
        if (Snake.alive) {
            gameLoop();
        }
    }, gameSpeed);
}

function alive(head) {
    // Checar a Cabeça
    if (head[0] < 1 || head[0] > 40 || head[1] < 1 || head[1] > 40) {
        return false;
    }
    // Colisão com Paredes
    if (Snake.position[0][0] < 1 || Snake.position[0][0] > 40 || Snake.position[0][1] < 1 || Snake.position[0][1] > 40) {
        return false;
    }
    // Colisão Própria
    for (let i = 1; i < Snake.size; i++) {
        if ((Snake.position[0]).every(function (element, index) {
                return element === Snake.position[i][index];
            })) {
            return false;
        }
    }
    return true;
}

function gameOver() {
    Snake.alive = false;
    $(".overlay").show();
    $(".play").show();
    let blink = function () {
        $(".row:nth-child(" + Snake.position[0][0] + ") > .pixel:nth-child(" + Snake.position[0][1] + ")").toggleClass("snakePixel");
    }

    let i = 0;

    function blinkLoop() {
        blink();
        setTimeout(function () {
            i++;
            if (i < 10) {
                blinkLoop();
            }
        }, 400);
    }
    blinkLoop();
}

function startGame() {
    Snake.size = 3;
    Snake.position = [
        [20, 20],
        [20, 19],
        [20, 18]
    ];
    Snake.direction = "r";
    Snake.alive = true;
    gameSpeed = 100;
    gamePoints = 0;
    Food.present = false;

    createBoard();
    gameLoop();
    $(".overlay").hide();
}