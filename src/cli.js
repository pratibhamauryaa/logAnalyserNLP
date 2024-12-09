import Table from 'cli-table3';

export class CLI {
    displayLogs(severityCounts, topFrequentLogs) {
        const severityTable = new Table({
            head: ['Severity', 'Count'],
            colWidths: [15, 10],
        });

        for (const [severity, count] of Object.entries(severityCounts)) {
            severityTable.push([severity, count]);
        }

        console.log('Severity Counts:\n' + severityTable.toString());

        const topLogsTable = new Table({
            head: ['Message', 'Frequency'],
            colWidths: [60, 15],
        });

        topFrequentLogs.forEach((log) => {
            topLogsTable.push([log[0], log[1]]);
        });

        console.log('\nTop 10 Frequent Logs:\n' + topLogsTable.toString());
    }
}