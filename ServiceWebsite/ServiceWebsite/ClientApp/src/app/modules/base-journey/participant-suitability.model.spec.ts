import { SelfTestAnswers } from 'src/app/modules/base-journey/participant-suitability.model';
describe('ParticipantSuitabilityModel', () => {
  describe('SelfTestAnswers', () => {
    it('is completed once all answers are saved', () => {
      const answers = new SelfTestAnswers({
        seeAndHearClearly: true,
        checkYourComputer: true,
        microphoneWorking: true,
        cameraWorking: true,
        selfTestResultScore: 'Okay'
      });

      expect(answers.isCompleted()).toBe(true);
    });

    it('is not completed when any question is not asnwers', () => {
      const answers = new SelfTestAnswers({
        seeAndHearClearly: true,
        checkYourComputer: true,
        microphoneWorking: true,
        cameraWorking: true,
        selfTestResultScore: 'Okay'
      });

      const properties = Object.keys(answers);
      for (const question of properties) {
        answers[question] = undefined;
        expect(answers.isCompleted()).toBe(false);
        answers[question] = true;
      }
    });
  });
});
