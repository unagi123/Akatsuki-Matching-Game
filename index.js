class AudioController {
    constructor() {
      this.bgMusic = new Audio("./sounds/game.mp3");
      this.victorySound = new Audio("./sounds/victory.mp3");
      this.gameOverSound = new Audio("./sounds/gameOver.mp3");
      this.overlaySound = new Audio("./sounds/overlay.mp3");
      this.matchSound = new Audio("./sounds/match.mp3");
      this.failSound = new Audio("./sounds/fail.mp3");
      this.flipSound = new Audio("./sounds/flip.mp3");
      this.deidara = new Audio("./sounds/deidara.mp3");
      this.sasori = new Audio("./sounds/sasori.mp3");
      this.hidan = new Audio("./sounds/hidan.mp3");
      this.kakuzu = new Audio("./sounds/kakuzu.mp3");
      this.itachi = new Audio("./sounds/itachi.mp3");
      this.kisame = new Audio("./sounds/kisame.mp3");
      this.pain = new Audio("./sounds/pain.mp3");
      this.konan = new Audio("./sounds/konan.mp3");
      this.zetsu = new Audio("./sounds/zetsu.mp3");
      this.tobi = new Audio("./sounds/tobi.mp3");
      this.madara = new Audio("./sounds/madara.mp3");
      this.obito = new Audio("./sounds/obito.mp3");
      this.bgMusic.volume = 0.5; 
      this.bgMusic.loop = true; 
      this.gameOverSound.loop = true; 
      this.victorySound.loop = true;
    }
  
    startBGM() {
        this.stopGameOver();
      this.bgMusic.play();
    }
    stopBGM() {
      this.bgMusic.pause();
      this.bgMusic.currentTime = 0;
    }
    playVictory() {
      this.stopBGM();
      this.victorySound.play();
    }
    stopVictory() {
        this.victorySound.pause();
      this.victorySound.currentTime = 0;
    }
    playGameOver() {
      this.stopBGM();
      this.gameOverSound.play();
    }
    stopGameOver() {
        this.gameOverSound.pause();
      this.gameOverSound.currentTime = 0;
    }
    playOverlay() {
      this.overlaySound.play();
    }
    playFlip() {
      this.flipSound.play();
    }
    playMatch() {
      this.matchSound.play();
    }
    playFail() {
      this.failSound.play();
    }
    playDeidara() { 
      this.deidara.play();
    }
    playSasori() { 
      this.sasori.play();
    }
    playHidan() { 
      this.hidan.play();
    }
    playKakuzu() { 
      this.kakuzu.play();
    }
    playItachi() { 
      this.itachi.play();
    }
    playKisame() { 
      this.kisame.play();
    }
    playPain() { 
      this.pain.play();
    }
    playKonan() { 
      this.konan.play();
    }
    playZetsu() { 
      this.zetsu.play();
    }
    playTobi() { 
      this.tobi.play();
    }
    playMadara() { 
      this.madara.play();
    }
    playObito() { 
      this.obito.play();
    }
  }
  
  class MixOrMatch {
    constructor(totalTime, cards) {
      this.cardsArray = cards;
      this.totalTime = totalTime;
      this.timeRemaining = totalTime;
      this.timer = document.getElementById("time-remaining"); 
      this.ticker = document.getElementById("flips");
      this.audioController = new AudioController();
    }
    startGame() {
      this.cardToCheck = null; //when flip, card becomes cardToCheck. trying to check other cards, see if its the same. 
      this.totalClicks = 0;
      this.timeRemaining = this.totalTime;
      this.matchedCards = [];
      this.busy = true; //animation or some other event is going on now. false means got nothing going on. 
      
      setTimeout(() => {
        this.audioController.startBGM(); 
        this.audioController.stopVictory();
        this.audioController.playOverlay();
        this.shuffleCards(); 
        this.countDown = this.startCountDown(); 
        this.busy = false; 
      }, 500); 
      this.hideCards();
      this.timer.innerText = this.timeRemaining; 
      this.ticker.innerText = this.totalClicks; 
    }
    hideCards() { 
      this.cardsArray.forEach(card => { 
        card.classList.remove("visible"); 
        card.classList.remove("matched");
      });
    }
    startCountDown() { 
      return setInterval(() => { 
        this.timeRemaining--; 
        this.timer.innerText = this.timeRemaining; 
        if(this.timeRemaining === 0) { 
          this.gameOver();
        }
      }, 1000); 
    }
    gameOver() {
       clearInterval(this.countDown);
       this.audioController.stopBGM();
       this.audioController.playGameOver(); 
       document.getElementById("game-over-text").classList.add("visible"); 
       this.hideCards(); 
    }
    victory() { 
      clearInterval(this.countDown);
      this.audioController.stopBGM();
      this.audioController.playVictory();
      document.getElementById("victory-text").classList.add("visible"); 
      this.hideCards(); 
    }
    flipCard(card) { 
      if(this.canFlipCard(card)) { 
        this.audioController.playFlip();
        this.totalClicks++;
        this.ticker.innerText = this.totalClicks;
        card.classList.add("visible");

        if(this.cardToCheck) { 
          this.checkForCardMatch(card);
        } else { 
          this.cardToCheck = card;
        }
      }
    }
    checkForCardMatch(card) { 
      if(this.getCardType(card) === this.getCardType(this.cardToCheck)) { 
        this.cardMatch(card, this.cardToCheck);
      } else { 
        this.cardMisMatch(card, this.cardToCheck);
      }
      this.cardToCheck = null;
    }
    cardMatch(card1, card2) { 
      this.matchedCards.push(card1);
      this.matchedCards.push(card2);
      card1.classList.add("matched");
      card2.classList.add("matched");
      this.audioController.playMatch();
      if(this.matchedCards.length === this.cardsArray.length) {
        this.victory();
      } if (card1.id === "deidara" && card2.id === "deidara") {
        this.audioController.playDeidara();
    } if (card1.id === "sasori" && card2.id === "sasori") {
      this.audioController.playSasori();
    } if (card1.id === "hidan" && card2.id === "hidan") {
      this.audioController.playHidan();
    } if (card1.id === "kakuzu" && card2.id === "kakuzu") {
      this.audioController.playKakuzu();
    } if (card1.id === "itachi" && card2.id === "itachi") {
      this.audioController.playItachi();
    } if (card1.id === "kisame" && card2.id === "kisame") {
      this.audioController.playKisame();
    } if (card1.id === "pain" && card2.id === "pain") {
      this.audioController.playPain();
    } if (card1.id === "konan" && card2.id === "konan") {
      this.audioController.playKonan();
    } if (card1.id === "zetsu" && card2.id === "zetsu") {
      this.audioController.playZetsu();
    } if (card1.id === "tobi" && card2.id === "tobi") {
      this.audioController.playTobi();
    } if (card1.id === "madara" && card2.id === "madara") {
      this.audioController.playMadara();
    } if (card1.id === "obito" && card2.id === "obito") {
      this.audioController.playObito();
    }
    }
    cardMisMatch(card1, card2) { 
      this.busy = true;
      setTimeout(() => { 
        card1.classList.remove("visible");
        card2.classList.remove("visible"); 
        this.busy = false;
      }, 1000);
    }
    getCardType(card) { 
      return card.getElementsByClassName('character')[0].src;
    }


    shuffleCards() {
        for(let i = this.cardsArray.length - 1; i > 0; i--) { 
            let randIndex = Math.floor(Math.random() * (i+1));
            this.cardsArray[randIndex].style.order = i; 
            this.cardsArray[i].style.order = randIndex;
        }
    }

    canFlipCard(card) {
      return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck; //nothing is going on, is not a matched card, card is not cardToCheck 
    }
  }

function ready() { 
  let overlays = Array.from(document.getElementsByClassName("overlay-text"));
  let cards = Array.from(document.getElementsByClassName("card"));
  let game = new MixOrMatch(100, cards);

  overlays.forEach(overlay => { 
    overlay.addEventListener("click", () => {
      overlay.classList.remove("visible");
      game.startGame();
    });
  });
  cards.forEach(card => { 
    card.addEventListener("click", () => {
      game.flipCard(card);
    });
  });
}

if(document.readyState === "loading") { 
  document.addEventListener("DOMContentLoaded", ready()); 
} else { 
  ready(); 
}
