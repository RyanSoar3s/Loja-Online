import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { ResponsiveService } from '@services/responsive.service';

import { Observable, of } from 'rxjs';
import { BreakpointState } from '@angular/cdk/layout';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockResponsiveService: jest.Mocked<ResponsiveService>;

  beforeEach(async () => {
    mockResponsiveService = {
      onBreakpointChange: jest.fn(() => of({
        breakpoints: {
          '(max-width: 599px)': false,
          '(min-width: 600px) and (max-width: 749px)': false,
          '(min-width: 750px) and (max-width: 969px)': false,
          '(min-width: 970px) and (max-width: 1199px)': false,
          '(min-width: 1200px)': true
        }
      })),
    } as any as jest.Mocked<ResponsiveService>;

    await TestBed.configureTestingModule({
      imports: [ HeaderComponent ],
      providers: [
        { provide: ResponsiveService, useValue: mockResponsiveService }

      ]

    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should click on button', () => {
    mockResponsiveService.onBreakpointChange.mockReturnValue(
        of({
          breakpoints: {
            '(max-width: 599px)': true,
            '(min-width: 600px) and (max-width: 749px)': false,
            '(min-width: 750px) and (max-width: 969px)': false,
            '(min-width: 970px) and (max-width: 1199px)': false,
            '(min-width: 1200px)': false
          }
        }) as any as Observable<BreakpointState>

    );

    component.ngOnInit();
    expect(component.showSearchBar).toBeFalsy();

    const inputElement = fixture.nativeElement.querySelector('.header-elements__search-bar button[type="submit"]');
    inputElement.click();
    fixture.detectChanges();

    expect(component.showSearchBar).toBeTruthy();

  });

});
