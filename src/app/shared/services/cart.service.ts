import { keyframes } from '@angular/animations';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Ingredient } from '../interfaces/ingredient.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public ingredients$: BehaviorSubject<Ingredient[] | null> =
    new BehaviorSubject<Ingredient[] | null>(null)

  constructor() { }

  addToCart(ingredients : Ingredient[]): void {
    const currentValue = this.ingredients$.value;
    //console.log(currentValue);
    if(currentValue) {
      //[{name : 'citron, quantity:3}]
      const obj = [...currentValue, ...ingredients].reduce((acc: {[x: string]: number},
        value: Ingredient) => {
        if (acc[value.name]){
          acc[value.name] += value.quantity;
        } else {
          acc[value.name] = value.quantity;
        }
        return acc;
      },{});

      const result = Object.keys(obj).map(key => ({
        name: key,
        quantity: obj[key],
      }));
      this.ingredients$.next(result);
    } else {
      this.ingredients$.next(ingredients);
    }

  }
}
