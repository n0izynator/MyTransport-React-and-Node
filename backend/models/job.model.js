let nextId = 1;
const JobExtent = [];

class Job {
    constructor(job, id) {
        this.id = id;
        this.job = job;
    }

    static add(job) {
        job.id = nextId++;
        JobExtent.push(job);

        return job;
    }

    static list() {
        return JobExtent;
    }

    static initData() {
        JobExtent.splice(0, JobExtent.length);

        Job.add(new Job('Spedytor'));
        Job.add(new Job('Kierowca'));
    }
}

Job.initData();

module.exports = Job;
