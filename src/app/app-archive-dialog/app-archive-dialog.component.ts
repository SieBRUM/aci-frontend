import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';
import {Router} from "@angular/router"

@Component({
  selector: 'app-app-archive-dialog',
  templateUrl: './app-archive-dialog.component.html',
  styleUrls: ['./app-archive-dialog.component.scss']
})
export class AppArchiveDialogComponent implements OnInit {

  constructor(
    public translate: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService,
    private translateService: TranslateService,
    private snackbarService: MatSnackBar,
    private router: Router 
    ) { }

  ngOnInit(): void {
  }

  /*
    Makes backend call to archive the product
  */
  archiveProduct(){
    this.apiService.archiveProduct(this.data.id).subscribe({
      next: (resp) =>{
        this.router.navigate(['/products'])
      },
      error: (err) =>{
        this.showErrorNotification(err.error)
      }
    })
  }

  /*
    Show error notification

    @param translateableMessage: string
    String that has to be presented in the error notification (gets translated)
  */
    private showErrorNotification(translateableMessage: string): void {
      this.snackbarService.open(this.translate.instant(translateableMessage), undefined, {
        panelClass: 'error-snack',
        duration: 2500
      });
    }

}
