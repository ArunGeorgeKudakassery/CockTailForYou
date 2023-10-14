import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CockTailBasics } from '../_models/base-cocktail.model';
import { ApiService } from '../_services/api.service';
import { filter, take } from 'rxjs';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {
  public itemData: CockTailBasics = <CockTailBasics>{};

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService
  ) { }
  ngOnInit(): void {
    const { type, name } = this.activatedRoute.snapshot.params;
    this.apiService.getCockTails(type).pipe(take(1)).subscribe({
      next: (res: CockTailBasics[]) => {
        this.itemData = res.find(item => item.strDrink === name) || <CockTailBasics>{};
      }
    })
  }
}
