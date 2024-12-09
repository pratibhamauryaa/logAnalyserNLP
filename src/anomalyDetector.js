export class AnomalyDetector {
    constructor() {
        this.anomalies = [];
    }

    detectAnomaly(log) {
        // Simple anomaly detection logic
        if (log.severity === 'ERROR' && log.message.includes('unexpected')) {
            this.anomalies.push(log);
        }
    }
}