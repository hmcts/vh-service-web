import { Hearing } from "src/app/models/hearing.model";

export class MockHearingService {
    getNextHearingDetails() : Promise<Hearing> {
        return Promise.resolve(new Hearing());
    }
}