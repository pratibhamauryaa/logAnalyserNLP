import fs from 'fs';
import path from 'path';
import readline from 'readline';
import Table from 'cli-table3';
import { pipeline } from '@xenova/transformers';


// Configuration
const LOG_FILE_PATH = path.resolve('./logs/logfile.log');
const SUMMARY_FILE_PATH = path.resolve('./logs/summary.txt');
const MODEL_NAME = 'Xenova/distilbert-base-uncased-finetuned-sst-2-english';

// Initialize NLP pipeline
let nlp;

async function initializeNLP() {
    try {
      nlp = await pipeline('sentiment-analysis', MODEL_NAME);
      console.log('NLP pipeline initialized successfully.');
    } catch (error) {
      console.error('Error initializing NLP pipeline:', error);
    }
  }
  



// Data structures to store log data
const logData = {
  counts: { ERROR: 0, WARNING: 0, INFO: 0 },
  messages: {},
  categorizedMessages: {}
};

// Function to categorize logs based on severity
function categorizeLog(line) {
  const [severity, message] = line.split(':');
  if (['ERROR', 'WARNING', 'INFO'].includes(severity.trim())) {
    logData.counts[severity.trim()] += 1;
    if (logData.messages[message]) {
      logData.messages[message] += 1;
    } else {
      logData.messages[message] = 1;
    }
  }
}

// Function to categorize logs using NLP
async function categorizeLogWithNLP(line) {
  if (!nlp) {
    console.error('NLP pipeline not initialized.');
    return;
  }

  const [severity, message] = line.split(':');
  if (['ERROR', 'WARNING', 'INFO'].includes(severity.trim())) {
    const response = await nlp(message.trim());
    const category = response[0].label; // Example: 'POSITIVE', 'NEGATIVE', 'NEUTRAL'
    if (logData.categorizedMessages[category]) {
      logData.categorizedMessages[category] += 1;
    } else {
      logData.categorizedMessages[category] = 1;
    }
  }
}

// Function to display top 5 most frequent log messages
function displayTopFrequentMessages() {
  const sortedMessages = Object.entries(logData.messages).sort((a, b) => b[1] - a[1]);
  const top5 = sortedMessages.slice(0, 5).map(([message, count]) => ({ message, count }));

  const table = new Table({
    head: ['Message', 'Count'],
    colWidths: [50, 10]
  });

  top5.forEach(({ message, count }) => {
    table.push([message, count]);
  });

  console.log(table.toString());
}

// Function to display severity counts and top 10 frequent log messages in a tabular format
function displaySummary() {
  const severityTable = new Table({
    head: ['Severity', 'Count'],
    colWidths: [10, 10]
  });

  Object.entries(logData.counts).forEach(([severity, count]) => {
    severityTable.push([severity, count]);
  });

  console.log(severityTable.toString());

  const frequentTable = new Table({
    head: ['Message', 'Count'],
    colWidths: [50, 10]
  });

  const sortedMessages = Object.entries(logData.messages).sort((a, b) => b[1] - a[1]);
  const top10 = sortedMessages.slice(0, 10).map(([message, count]) => ({ message, count }));

  top10.forEach(({ message, count }) => {
    frequentTable.push([message, count]);
  });

  console.log(frequentTable.toString());

  const categorizedTable = new Table({
    head: ['Category', 'Count'],
    colWidths: [20, 10]
  });

  Object.entries(logData.categorizedMessages).forEach(([category, count]) => {
    categorizedTable.push([category, count]);
  });

  console.log(categorizedTable.toString());
}

// Function to write summary to a file
function writeSummaryToFile() {
  const summaryContent = `Severity Counts:
ERROR: ${logData.counts.ERROR}
WARNING: ${logData.counts.WARNING}
INFO: ${logData.counts.INFO}

Top 5 Frequent Log Messages:
${Object.entries(logData.messages).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([message, count]) => `${message}: ${count}`).join('\n')}

Categorized Messages:
${Object.entries(logData.categorizedMessages).map(([category, count]) => `${category}: ${count}`).join('\n')}
`;
  fs.writeFileSync(SUMMARY_FILE_PATH, summaryContent, 'utf-8');
}

// Function to monitor the log file in real-time
async function monitorLogFile() {
  await initializeNLP();

  const rl = readline.createInterface({
    input: fs.createReadStream(LOG_FILE_PATH),
    output: process.stdout,
    terminal: false
  });

  rl.on('line', async (line) => {
    categorizeLog(line);
    await categorizeLogWithNLP(line);
    displayTopFrequentMessages();
    displaySummary();
    writeSummaryToFile();
  });

  fs.watch(LOG_FILE_PATH, (eventType, filename) => {
    if (eventType === 'change') {
      rl.close();
      monitorLogFile();
    }
  });
}

async function main() {
    await monitorLogFile();
}

main();