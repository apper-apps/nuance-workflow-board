import jobsData from "@/services/mockData/jobs.json";

// Simulate API delay for realistic loading states
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class JobService {
  constructor() {
    this.jobs = [...jobsData];
  }

  async getAll(filters = {}) {
    await delay(300);
    
    let filteredJobs = [...this.jobs];

    // Apply keyword search
    if (filters.keywords) {
      const keywords = filters.keywords.toLowerCase();
      filteredJobs = filteredJobs.filter(job => 
        job.title.toLowerCase().includes(keywords) ||
        job.company.toLowerCase().includes(keywords) ||
        job.description.toLowerCase().includes(keywords) ||
        job.tags.some(tag => tag.toLowerCase().includes(keywords))
      );
    }

    // Apply location filter
    if (filters.location) {
      const location = filters.location.toLowerCase();
      filteredJobs = filteredJobs.filter(job => 
        job.location.toLowerCase().includes(location)
      );
    }

    // Apply job type filter
    if (filters.jobType && filters.jobType.length > 0) {
      filteredJobs = filteredJobs.filter(job => 
        filters.jobType.includes(job.type)
      );
    }

    // Apply experience level filter
    if (filters.experienceLevel && filters.experienceLevel.length > 0) {
      filteredJobs = filteredJobs.filter(job => 
        filters.experienceLevel.includes(job.experienceLevel)
      );
    }

    // Apply salary range filter
    if (filters.salaryMin || filters.salaryMax) {
      filteredJobs = filteredJobs.filter(job => {
        const jobMinSalary = job.salary.min;
        const jobMaxSalary = job.salary.max;
        
        let matchesSalary = true;
        
        if (filters.salaryMin) {
          matchesSalary = matchesSalary && jobMaxSalary >= filters.salaryMin;
        }
        
        if (filters.salaryMax) {
          matchesSalary = matchesSalary && jobMinSalary <= filters.salaryMax;
        }
        
        return matchesSalary;
      });
    }

    // Apply remote filter
    if (filters.remote !== undefined) {
      filteredJobs = filteredJobs.filter(job => job.remote === filters.remote);
    }

    // Apply date posted filter
    if (filters.datePosted) {
      const now = new Date();
      const filterDate = new Date(now);
      
      switch (filters.datePosted) {
        case "24h":
          filterDate.setDate(now.getDate() - 1);
          break;
        case "3d":
          filterDate.setDate(now.getDate() - 3);
          break;
        case "7d":
          filterDate.setDate(now.getDate() - 7);
          break;
        case "30d":
          filterDate.setDate(now.getDate() - 30);
          break;
        default:
          filterDate.setFullYear(2000); // Show all if unknown filter
      }
      
      filteredJobs = filteredJobs.filter(job => 
        new Date(job.postedDate) >= filterDate
      );
    }

    return filteredJobs;
  }

  async getById(id) {
    await delay(200);
    const job = this.jobs.find(job => job.Id === parseInt(id));
    if (!job) {
      throw new Error(`Job with ID ${id} not found`);
    }
    return { ...job };
  }

  async getPopular(limit = 6) {
    await delay(250);
    // Return jobs with higher salary ranges as "popular"
    const sortedJobs = [...this.jobs].sort((a, b) => b.salary.max - a.salary.max);
    return sortedJobs.slice(0, limit);
  }

  async getRecent(limit = 5) {
    await delay(200);
    // Sort by posted date (most recent first)
    const sortedJobs = [...this.jobs].sort((a, b) => 
      new Date(b.postedDate) - new Date(a.postedDate)
    );
    return sortedJobs.slice(0, limit);
  }

  async searchSuggestions(query) {
    await delay(100);
    if (!query || query.length < 2) return [];
    
    const suggestions = new Set();
    const queryLower = query.toLowerCase();
    
    this.jobs.forEach(job => {
      // Add matching job titles
      if (job.title.toLowerCase().includes(queryLower)) {
        suggestions.add(job.title);
      }
      
      // Add matching companies
      if (job.company.toLowerCase().includes(queryLower)) {
        suggestions.add(job.company);
      }
      
      // Add matching tags
      job.tags.forEach(tag => {
        if (tag.toLowerCase().includes(queryLower)) {
          suggestions.add(tag);
        }
      });
    });
    
    return Array.from(suggestions).slice(0, 8);
  }
}

export default new JobService();