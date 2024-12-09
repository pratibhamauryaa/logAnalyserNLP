export class LogClustering {
    constructor() {
        this.logFrequency = new Map();
    }

    clusterLog(log) {
        const message = log.message;
        this.logFrequency.set(message, (this.logFrequency.get(message) || 0) + 1);
    }

    getTopFrequentLogs() {
        return Array.from(this.logFrequency.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10);
    }
}