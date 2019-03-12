export class MockSessionStorage {
    private data: any = {};

    removeItem(key: string) {
        this.data[key] = null;
    }

    setItem(key: string, value: string) {
        this.data[key] = value;
    }

    getItem(key: string): string {
        return this.data[key];
    }
}
