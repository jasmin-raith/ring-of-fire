import { Component, OnInit, inject } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, docData, updateDoc } from '@angular/fire/firestore';

import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DialogSelectAvatarComponent } from '../dialog-select-avatar/dialog-select-avatar.component'; 

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game: Game = new Game;
  gameId: string = '';

  firestore: Firestore = inject(Firestore);
  game$: Observable<any> | undefined;

  constructor(private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit(): void {
    /* this.newGame(); */
    this.route.params.subscribe((params)=>{

      if (params['id']) {
        const gameDocRef = doc(this.firestore, 'games', params['id']);
        this.gameId = params['id'];
        // Abrufen der Daten des Dokuments
        this.game$ = docData(gameDocRef);
        this.game$.subscribe(gameData => {
          const game = gameData.game
          console.log('Single game:', game.players);
          this.game.currentPlayer = game.currentPlayer;
          this.game.playedCards = game.playedCards;
          this.game.players = game.players;
          this.game.player_images = game.player_images;
          this.game.stack = game.stack;
          this.game.pickCardAnimation = game.pickCardAnimation;
          this.game.currentCard = game.currentCard;
        });
      }

      
    })
  }

/*
    newGame() {
      this.game = new Game();
      const gamesCollection = addDoc(collection(this.firestore, 'games'), {game: this.game.toJson()});
      console.log("Document written with ID: ", gamesCollection); 
    } 
*/

  takeCard() {
    if(this.game.players.length > 1){
      if (!this.game.pickCardAnimation) {
        this.game.currentCard = this.game.stack.pop();
        this.game.pickCardAnimation = true;
        console.log(this.game.currentCard);
        console.log(this.game);

        this.game.currentPlayer++;
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
        this.saveGame();

        setTimeout(() => {
          if (this.game.currentCard) {
            this.game.playedCards.push(this.game.currentCard);
          }
          this.game.pickCardAnimation = false;
          this.saveGame();
        }, 1000);
      }
    }
  }


  openDialogAddPlayer(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(name => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.game.player_images.push('f1');
        this.saveGame();
      }
    });
  }

  openDialogSelectAvatar(playerId: number): void {
    console.log('Edit player', playerId)
    const dialogRef = this.dialog.open(DialogSelectAvatarComponent);

    dialogRef.afterClosed().subscribe((change: string) => {
      if (change) {
        this.game.player_images[playerId] = change;
        this.saveGame();
      }
    });
  }


  async saveGame() {
    const gameDocRef = doc(this.firestore, 'games', this.gameId);
    await updateDoc(gameDocRef, {game: this.game.toJson()});
  }

}
