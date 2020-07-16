export default class Prompt {

    constructor(name = '', keywords = [], results = {}, requirements = []) {
        this.name = name;
        // Keywords that can trigger the prompt (make all lower-case by default)
        this.keywords = keywords.map(function (v) { return v.toLowerCase(); });
        // Results that occur when this prompt is successfully triggered;
        // the result keys comprise of “successText” (required), "failText" (optional),
        // “itemsRequired” (optional), and “roomToEnter” (optional)
        this.results = results;
        // Any prerequisite items needed to do the prompt?
        this.requirements = requirements;
    }
}