import { MicVisualiserComponent } from './mic-visualiser.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import 'webrtc-adapter';

describe('MicVisualiserComponent', () => {
    let component: MicVisualiserComponent;
    let fixture: ComponentFixture<MicVisualiserComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MicVisualiserComponent]
        }).compileComponents();
    }));

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
