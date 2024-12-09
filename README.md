# Log Analyzer using NLP

This project implements an advanced CLI-based log analyzer with NLP integration. It incorporates advanced system design principles and NLP techniques to provide deep insights, real-time anomaly detection, and efficient log processing. It analyze the sentiment by text classification and categorize the log message into either positive or negative.

I have added some sample logs which follow a format (severiaty): log_message format. feel free to use below bash command to populate the logFile. 
```bash for i in {1..5}; do
  echo "ERROR: Failed to connect to database (attempt $i)"
  echo "WARNING: Disk space running low (check $i)"
  echo "INFO: Service started successfully (startup $i)"
done > ./logs/logfile.log
```

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

1. **Advanced Log Categorization with NLP:**
   - Classifies logs into granular categories using NLP.
   - Performs sentiment analysis to gauge application health.

2. **Real-time Anomaly Detection:**
   - Identifies deviations in log patterns with natural language descriptions.

3. **Distributed Log Processing:**
   - Handles logs from multiple servers with load balancing and redundancy.

4. **Log Clustering and Summarization:**
   - Clusters similar logs and generates summaries for critical issues.

5. **Interactive CLI/TUI:**
   - Provides autocomplete, command suggestions, and real-time updates.

6. **Alerting Mechanisms:**
   - Generates alerts with natural language descriptions for non-technical stakeholders.

7. **Log Correlation Across Microservices:**
   - Correlates logs across services to identify root causes and visualizes log patterns over time.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/log-analyzer.git
   cd log-analyzer