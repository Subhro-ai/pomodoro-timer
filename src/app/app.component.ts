import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TitleComponent } from './title/title.component';
import { TimerComponent } from './timer/timer.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TitleComponent, TimerComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pomodoro';
  @ViewChild(TimerComponent, { static: false }) childComponentRef: TimerComponent;

  startButton() {
    this.childComponentRef.start();
  }

  stopButton() {
    this.childComponentRef.reset(25 * 60);
  }

  pauseButton() {
    this.childComponentRef.stop();
  }
  styleTemp;
  changeStart(val) {
    if (val) {
      this.styleTemp = { 'animation-duration': '5s' }
    } else {
      this.styleTemp = { 'animation-duration': '0s' }
    }
  }
  start = false;
  ngAfterViewInit(): void {
    // Subscribe to the child component's event when isstart changes
    this.childComponentRef.isstartChanged.subscribe((isstart: boolean) => {
      if (isstart) {
        console.log("Child component has started.");
        this.changeStart(true);
        // Perform logic when isstart is true

      } else {
        console.log("Child component has stopped.");
        // Perform logic when isstart is false
        this.changeStart(false);
      }
    });
  }

}
