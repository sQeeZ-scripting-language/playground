import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor (
    private zone: NgZone,
    private snackbar: MatSnackBar,  
  ) { }

  public open(message: string, action = 'OK', type: string = 'info', duration = 7000): void {
		this.zone.run(() => this.snackbar.open(message, action, { duration, panelClass: type }));
	}

}
