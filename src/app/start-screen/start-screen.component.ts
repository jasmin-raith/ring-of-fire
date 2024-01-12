import { Component, OnInit, inject } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  game: Game = new Game;
  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  async newGame() {
    const gamesCollection = await addDoc(collection(this.firestore, 'games'), {game: this.game.toJson()});
    this.router.navigateByUrl('/game/' + gamesCollection.id);
  }

}
