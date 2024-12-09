import { pipeline } from '@huggingface/transformers';

export class NLPProcessor {
    constructor() {
        this.classifier = pipeline('text-classification');
    }

    async categorizeLog(log) {
        const result = await this.classifier(log.message);
        log.category = result[0].label;
        return log;
    }
}