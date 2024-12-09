export function validateLog(log) {
    if (!log || !log.severity || !log.message) {
        throw new Error('Invalid log format');
    }
}