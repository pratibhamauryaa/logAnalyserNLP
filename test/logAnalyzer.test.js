import { LogProcessor } from '../src/logProcessor.js';
import { NLPProcessor } from '../src/nlpProcessor.js';
import { AnomalyDetector } from '../src/anomalyDetector.js';
import { LogClustering } from '../src/logClustering.js';
import { CLI } from '../src/cli.js';
import { validateLog } from '../src/utils.js';

describe('Log Analyzer Tests', () => {
    let logProcessor, nlpProcessor, anomalyDetector, logClustering, cli;

    beforeEach(() => {
        logProcessor = new LogProcessor();
        nlpProcessor = new NLPProcessor();
        anomalyDetector = new AnomalyDetector();
        logClustering = new LogClustering();
        cli = new CLI();
    });

    test('LogProcessor should parse logs correctly', () => {
        const log = 'INFO: This is an info log';
        const parsedLog = logProcessor.parseLog(log);
        expect(parsedLog).toEqual({ severity: 'INFO', message: 'This is an info log' });
    });

    test('NLPProcessor should categorize logs', async () => {
        const log = { severity: 'INFO', message: 'This is an info log' };
        const categorizedLog = await nlpProcessor.categorizeLog(log);
        expect(categorizedLog.category).toBeDefined();
    });

    test('AnomalyDetector should detect anomalies', () => {
        const log = { severity: 'ERROR', message: 'unexpected error' };
        anomalyDetector.detectAnomaly(log);
        expect(anomalyDetector.anomalies.length).toBe(1);
    });

    test('LogClustering should cluster logs', () => {
        const log = { severity: 'INFO', message: 'This is an info log' };
        logClustering.clusterLog(log);
        expect(logClustering.logFrequency.size).toBe(1);
    });

    test('CLI should display logs', () => {
        const severityCounts = { INFO: 1, WARNING: 2, ERROR: 3 };
        const topFrequentLogs = [['log1', 5], ['log2', 4]];
        cli.displayLogs(severityCounts, topFrequentLogs);
    });

    test('validateLog should throw error for invalid log', () => {
        expect(() => validateLog({})).toThrow('Invalid log format');
    });
});