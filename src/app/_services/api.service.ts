import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public getCockTails(searchText: string = ''): Observable<any> {
    return this.httpClient.get('https://www.thecocktaildb.com/api/json/v1/1/search.php', {
      params: {
        s: searchText
      }
    }).pipe(map((res: any) => {
      return res['drinks']?.map((drink: any) => {
        const ingredientsList = Object.keys(drink).filter(key => key.includes('strIngredient'))
        return { ...drink, ingredients: ingredientsList.map(key => drink[key]).filter(ing => ing) }
      })
    }))
  }
}
