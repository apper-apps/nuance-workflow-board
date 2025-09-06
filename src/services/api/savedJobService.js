import savedJobsData from "@/services/mockData/savedJobs.json";
import jobService from "./jobService.js";

// Simulate API delay for realistic loading states
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class SavedJobService {
  constructor() {
    this.savedJobs = [...savedJobsData];
  }

  async getAll() {
    await delay(300);
    
    // Get full job details for each saved job
    const savedJobsWithDetails = [];
    
    for (const savedJob of this.savedJobs) {
      try {
        const jobDetails = await jobService.getById(savedJob.jobId);
        savedJobsWithDetails.push({
          ...savedJob,
          job: jobDetails
        });
      } catch (error) {
        // Skip jobs that no longer exist
        console.warn(`Saved job with ID ${savedJob.jobId} no longer exists`);
      }
    }
    
    return savedJobsWithDetails.sort((a, b) => 
      new Date(b.savedDate) - new Date(a.savedDate)
    );
  }

  async getById(id) {
    await delay(200);
    const savedJob = this.savedJobs.find(item => item.Id === parseInt(id));
    if (!savedJob) {
      throw new Error(`Saved job with ID ${id} not found`);
    }
    
    const jobDetails = await jobService.getById(savedJob.jobId);
    return {
      ...savedJob,
      job: jobDetails
    };
  }

  async create(jobId, notes = "") {
    await delay(400);
    
    // Check if job is already saved
    const existing = this.savedJobs.find(item => item.jobId === parseInt(jobId));
    if (existing) {
      throw new Error("Job is already saved");
    }
    
    // Verify job exists
    await jobService.getById(jobId);
    
    const newSavedJob = {
      Id: Math.max(...this.savedJobs.map(item => item.Id), 0) + 1,
      jobId: parseInt(jobId),
      savedDate: new Date().toISOString(),
      notes: notes
    };
    
    this.savedJobs.push(newSavedJob);
    
    const jobDetails = await jobService.getById(jobId);
    return {
      ...newSavedJob,
      job: jobDetails
    };
  }

  async update(id, data) {
    await delay(300);
    const index = this.savedJobs.findIndex(item => item.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Saved job with ID ${id} not found`);
    }

    this.savedJobs[index] = {
      ...this.savedJobs[index],
      ...data,
      Id: parseInt(id)
    };

    const jobDetails = await jobService.getById(this.savedJobs[index].jobId);
    return {
      ...this.savedJobs[index],
      job: jobDetails
    };
  }

  async delete(id) {
    await delay(250);
    const index = this.savedJobs.findIndex(item => item.Id === parseInt(id));
    if (index === -1) {
      throw new Error(`Saved job with ID ${id} not found`);
    }

    this.savedJobs.splice(index, 1);
    return true;
  }

  async deleteByJobId(jobId) {
    await delay(250);
    const index = this.savedJobs.findIndex(item => item.jobId === parseInt(jobId));
    if (index === -1) {
      return false;
    }

    this.savedJobs.splice(index, 1);
    return true;
  }

  async isJobSaved(jobId) {
    await delay(100);
    return this.savedJobs.some(item => item.jobId === parseInt(jobId));
  }
}

export default new SavedJobService();