export class LogProcessor {
    constructor() {
        this.severityCounts = { INFO: 0, WARNING: 0, ERROR: 0 };
    }

    parseLog(log) {
        const match = log.match(/(INFO|WARNING|ERROR):\s(.*)/);
        if (match) {
            const [_, severity, message] = match;
            this.severityCounts[severity]++;
            return { severity, message };
        }
        return null;
    }

    getSeverityCounts() {
        return this.severityCounts;
    }
}