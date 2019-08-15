import { ParticipantSuitabilityModel } from 'src/app/modules/base-journey/participant-suitability.model';
import { Logger } from 'src/app/services/logger';

export class HearingSelector<TModel extends ParticipantSuitabilityModel> {
    isDone: boolean;
    selected: TModel;

    constructor(
        private isPendingDelegate: (model: TModel) => boolean,
        private hearingModels: TModel[],
        private logger: Logger
    ) {
        this.selected = this.selectHearing();
        this.isDone = this.selected === null;
    }

    private selectHearing(): TModel {
        const upcoming = this.hearingModels.filter(hearing => hearing.isUpcoming() && !hearing.hearing.questionnaireNotRequired);

        if (upcoming.length === 0) {
          const pastHearings = this.hearingModels.map(h => h.hearing.id);
          this.logger.event('Journey done: No upcoming hearings', { pastHearings });

          return null;
        }

        const pending = upcoming.filter(u => this.isPendingDelegate(u));

        if (pending.length === 0) {
            const submittedHearings = upcoming.map(p => p.hearing.id);
            this.logger.event('Journey done: All upcoming hearings completed.', { doneHearings: submittedHearings });
            return null;
        }

        // sort upcoming on date and pick the earliest
        pending.sort((u1, u2) => u1.hearing.scheduleDateTime.getTime() - u2.hearing.scheduleDateTime.getTime());
        return pending[0];
    }
}
