import { Component, OnInit, inject } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, docData, updateDoc } from '@angular/fire/firestore';

import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard?: string = '';
  game: Game = new Game;
  gameId: string = '';

  firestore: Firestore = inject(Firestore);
  game$: Observable<any> | undefined;

  constructor(private route: ActivatedRoute ,public dialog: MatDialog) { }

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
          this.game.stack = game.stack;
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
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop();
      this.pickCardAnimation = true;
      console.log(this.currentCard);
      console.log(this.game);

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;

      setTimeout(() => {
        if (this.currentCard) {
          this.game.playedCards.push(this.currentCard);
        }
        this.pickCardAnimation = false;
        this.saveGame();
      }, 1000);
    }
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(name => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.saveGame();
      }
    });
  }


  async saveGame() {
    const gameDocRef = doc(this.firestore, 'games', this.gameId);
    await updateDoc(gameDocRef, {game: this.game.toJson()});
}

}
