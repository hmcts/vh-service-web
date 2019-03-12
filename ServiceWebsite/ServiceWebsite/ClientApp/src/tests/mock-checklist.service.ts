export class MockChecklistService {
    isUserRequiredToSubmitChecklist(): Promise<boolean> {
        return Promise.resolve(true);
    }
}
