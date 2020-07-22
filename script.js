let doorImage1 = document.getElementById('door1');
let doorImage2 = document.getElementById('door2');
let doorImage3 = document.getElementById('door3');
let startButton = document.getElementById('start');
let currentlyPlaying = true;

let botDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg";
let beachDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg";
let spaceDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg";
let numClosedDoors = 3;
let openDoor1 ;
let openDoor2 ;
let openDoor3 ;
let closedDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg" ;
let score = 0;
let highscore = 0;
let CurrentStreak = document.getElementById('score-number');
let BestStreak = document.getElementById('high-score-number');
CurrentStreak.innerHTML = score;
BestStreak.innerHTML = highscore;
let getmusic = document.getElementById('music');
let victory = document.getElementById('correct');
let incorrect = document.getElementById('wrong');

const randomChoreDoorGenerator = () =>{
    const choreDoor = Math.floor(Math.random() * numClosedDoors);
    if(choreDoor === 0){
      openDoor1 = botDoorPath;
      openDoor2 = beachDoorPath;
      openDoor3 = spaceDoorPath;
    }
    else if(choreDoor === 1){
      openDoor2 = botDoorPath;
      openDoor1 = beachDoorPath;
      openDoor3 = spaceDoorPath;
    }
    else{(choreDoor === 2)
      openDoor3 = botDoorPath;
      openDoor2 = spaceDoorPath;
      openDoor1 = beachDoorPath;
    }

}

const isClicked = (door) => {
  if (door.src === closedDoorPath) {
    return false;
  } else {
    return true;
  }
}

const isBot = (door) => {
  if (door.src === botDoorPath) {
    return true;
  } else {
    return false;
  }
}

const playDoor = (door) => {
  numClosedDoors--;
  if (numClosedDoors === 0) {
    gameOver('win');
  } else if (isBot(door)) {
    gameOver('lose');
  }
}


door1.onclick = () =>{
  if(currentlyPlaying && !isClicked(doorImage1)) {
    doorImage1.src = openDoor1;
    playDoor(door1);
  }
}
door2.onclick = () =>{
  if(currentlyPlaying && !isClicked(doorImage2)) {
    doorImage2.src = openDoor2;
    playDoor(door2);
  }
}
door3.onclick = () =>{
  if(currentlyPlaying && !isClicked(doorImage3)) {
    doorImage3.src = openDoor3;
    playDoor(door3);
  }
 
}

startButton.onclick = () => {
    startRound();
}

const startRound = () => {
  // Reset all the doors to be closed
  door1.src = closedDoorPath;
  door2.src = closedDoorPath ;
  door3.src = closedDoorPath ;
  numClosedDoors = 3;
  currentlyPlaying = true;
  startButton.innerHTML = 'Good luck';
  randomChoreDoorGenerator();
}

const gameOver = (status) => {
  if(status === 'win') {
    startButton.innerHTML = 'You win! Play again?';
    getScore();
  } else {
    startButton.innerHTML = "Game over! Play again?"

    score = 0;
    incorrect.play()
    CurrentStreak.innerHTML = score;

  }
  currentlyPlaying = false;
}
const getScore = ()=>{
  score ++;
  CurrentStreak.innerHTML = score;
  victory.play();
  if(score > highscore){
    highscore = score;
    BestStreak.innerHTML = highscore;
    getmusic.play();
   
  }
}



startRound();

