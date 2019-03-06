export class MockAdalService {
    userInfo = {
        authenticated: false
    };

    setAuthenticated(authenticated: boolean) {
        this.userInfo = {
            authenticated: authenticated
        };
    }

    login() {}
}