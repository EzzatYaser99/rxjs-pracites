import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {combineLatest, distinctUntilChanged, filter, map, mergeMap, Observable, of, toArray} from 'rxjs';
import {AsyncPipe, NgForOf} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [NgForOf, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'rxjs';
  outputMappedData: number[] = [];
  outputFilteredData: number[] = [];
  outputDistinctUntilChanged: number[] = [];
  outputMergeMapData: Observable<number[]> | undefined
  outputCombinedValues: [number, string][] = [];

  ngOnInit() {
    const observable = of(1, 2, 3, 4, 5);
    observable.pipe(
      map(data => data * 2)
    ).subscribe(data => {
      this.outputMappedData.push(data);
    });

    const observableTwo = of(1, 2, 3, 4, 5, 11, 13, 17, 19, 0, 5, 7);
    observableTwo.pipe(
      filter(data => data > 7)
    ).subscribe(data => {
      this.outputFilteredData.push(data);
    });

    const observableThree = of(1 , 1 , 2 , 2 , 3 , 3 , 4 , 4);
    observableThree.pipe(distinctUntilChanged()).subscribe(data => {
      this.outputDistinctUntilChanged.push(data);
    });


    const observableFour = of(1, 2, 3, 4, 5);
    const square = (data: number) => of(data * data);
    this.outputMergeMapData = observableFour.pipe(
      mergeMap((data) => {
        return square(data);
      }),
      toArray()
    );

    const observable1: Observable<number> = of(1, 2, 3, 4);
    const observable2: Observable<string> = of('A', 'B', 'C', 'D');

    const combinedObservable: Observable<[number, string]> = combineLatest([
      observable1,
      observable2
      ]
    );

    combinedObservable.subscribe((pair) => {
      this.outputCombinedValues.push(pair);
    });

  }

}
