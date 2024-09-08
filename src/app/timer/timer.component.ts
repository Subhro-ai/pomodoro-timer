import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css'
})
export class TimerComponent {
  remainingTime: number = 25*60;
  intervalId: number | null = null;
  min : number = 25;
  secs : number = 0;
  isbreak : boolean = false;
  isstart : boolean = false;

  constructor() {}
  @Output() isstartChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  ngOnInit(): void {}

  // Start the timer
  start() {
    if (this.intervalId) {
      console.log("Timer is already running.");
      this.isstart = true;
      this.isstartChanged.emit(this.isstart);
      return;
    }
    this.isstart = true;
    this.isstartChanged.emit(this.isstart);

    this.intervalId = window.setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;
        this.min = Math.floor(this.remainingTime / 60);
        this.secs = this.remainingTime % 60;
        console.log(`Time remaining: ${this.remainingTime} seconds`);
      } else {
        this.isbreak = !this.isbreak;
        if (this.isbreak) {
          this.reset(10*60);
          this.start();
        } else {
          this.reset(25*60);
          this.start();
        }
        console.log("Timer finished!");
      }
    }, 1000); // Execute every 1 second
  }

  // Stop the timer
  stop() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log("Timer stopped.");
      this.isstart = false;
      this.isstartChanged.emit(this.isstart);
    }
  }

  // Reset the timer
  reset(seconds: number) {
    this.stop();
    this.remainingTime = seconds;
    this.min = Math.floor(this.remainingTime / 60);
        this.secs = this.remainingTime % 60;
    console.log(`Timer reset to ${this.remainingTime} seconds.`);
    this.isstart = false;
    this.isstartChanged.emit(this.isstart);
  }
}

