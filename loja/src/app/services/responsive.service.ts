import { Injectable } from '@angular/core';
import { BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {
  private readonly XSMALL = '(max-width: 599px)';
  private readonly SMALL = '(min-width: 600px) and (max-width: 749px)';
  private readonly MEDIUM = '(min-width: 750px) and (max-width: 969px)';
  private readonly LARGE = '(min-width: 970px) and (max-width: 1199px)';
  private readonly XLARGE = '(min-width: 1200px)';

  constructor(
    private responsive$: BreakpointObserver

  ) { }

  onBreakpointChange(): Observable<BreakpointState> {
    return this.responsive$.observe([
      this.XSMALL,
      this.SMALL,
      this.MEDIUM,
      this.LARGE,
      this.XLARGE

    ])

  }

}
