/**
 * Senior JS Assessment: Async Task Runner with Concurrency Limit
 *
 * Challenge: Implement a class `TaskRunner` that allows pushing async tasks.
 * It should only run `concurrency` number of tasks in parallel.
 *
 * What we look for:
 * - Queue management.
 * - Triggering next task upon completion.
 * - Error handling properly moving to next task.
 */

class TaskRunner {
    constructor(concurrency) {
        this.concurrency = concurrency;
        this.running = 0;
        this.queue = [];
    }

    push(task) {
        this.queue.push(task);
        this.run();
    }

    async run() {
        if (this.running >= this.concurrency || this.queue.length === 0) {
            return;
        }

        const task = this.queue.shift();
        this.running++;

        try {
            await task();
        } catch (err) {
            console.error('Task failed:', err);
        } finally {
            this.running--;
            this.run();
        }
    }
}

// --- TEST SUITE ---
if (require.main === module) {
    console.log('Running Task Runner Tests...');

    const runner = new TaskRunner(2);
    const start = Date.now();

    const createTask = (id, duration) => () =>
        new Promise((resolve) => {
            console.log(`Task ${id} started`);
            setTimeout(() => {
                console.log(`Task ${id} finished`);
                resolve(id);
            }, duration);
        });

    // Task 1: 100ms
    // Task 2: 100ms
    // Task 3: 100ms
    // With conc=2, Total time should be approx 200ms (1&2 run parallel, 3 runs after one finishes)
    runner.push(createTask(1, 100));
    runner.push(createTask(2, 100));
    runner.push(createTask(3, 100));
}

module.exports = TaskRunner;
