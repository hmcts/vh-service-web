import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import 'webrtc-adapter';
import { MicVisualiserComponent } from './mic-visualiser.component';

describe('MicVisualiserComponent', () => {
    let component: MicVisualiserComponent;
    let fixture: ComponentFixture<MicVisualiserComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [MicVisualiserComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(MicVisualiserComponent);
        component = fixture.componentInstance;
    });

    it('should throw an error if no stream', () => {
        try {
            fixture.detectChanges();
        } catch (e) {
            expect(e.message).toEqual('No stream provided');
        }
    });
});
