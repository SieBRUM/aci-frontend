import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-app-archive-dialog',
  templateUrl: './app-archive-dialog.component.html',
  styleUrls: ['./app-archive-dialog.component.scss']
})
export class AppArchiveDialogComponent implements OnInit {

  constructor(
    public translate: TranslateService
    ) { }

  ngOnInit(): void {
  }

}
