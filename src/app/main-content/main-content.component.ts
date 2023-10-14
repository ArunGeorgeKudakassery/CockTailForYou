import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { CockTailBasics } from '../_models/base-cocktail.model';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit, OnDestroy {
  public cockTails: CockTailBasics[] = [];
  public masterCockTails: CockTailBasics[] = [];
  private unsubscribe$: Subject<boolean> = new Subject();
  public type: string = '';
  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.type = this.activatedRoute.snapshot.params['type']
    this.apiService.getCockTails(this.type).pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (res: CockTailBasics[]) => {
        this.cockTails = res;
        this.masterCockTails = res;
      },
      error: (err) => {
        console.error(err)
      }
    })
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
  }
  public filterList(target: any): void {
    if (!target?.value) {
      this.cockTails = [...this.masterCockTails]
      return;
    }
    this.cockTails = [...this.masterCockTails.filter(drink =>
      target?.value === 'alc' ? drink.strAlcoholic === 'Alcoholic' : drink.strAlcoholic !== 'Alcoholic'
    )]
  }
}
