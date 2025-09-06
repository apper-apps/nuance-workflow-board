import companiesData from "@/services/mockData/companies.json";
import jobsData from "@/services/mockData/jobs.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class CompanyService {
  constructor() {
    this.companies = [...companiesData];
    this.jobs = [...jobsData];
  }

  async getAll() {
    await delay(300);
    
    // Add open positions count to each company
    return this.companies.map(company => ({
      ...company,
      openPositions: this.jobs.filter(job => 
        job.company === company.name
      ).length
    }));
  }

  async getById(id) {
    await delay(200);
    const company = this.companies.find(company => company.Id === parseInt(id));
    if (!company) {
      throw new Error(`Company with ID ${id} not found`);
    }
    
    // Add open positions count
    return {
      ...company,
      openPositions: this.jobs.filter(job => 
        job.company === company.name
      ).length
    };
  }

  async getByName(name) {
    await delay(200);
    const company = this.companies.find(company => 
      company.name.toLowerCase() === name.toLowerCase()
    );
    if (!company) {
      throw new Error(`Company "${name}" not found`);
    }
    
    return {
      ...company,
      openPositions: this.jobs.filter(job => 
        job.company === company.name
      ).length
    };
  }

  async search(query) {
    await delay(250);
    if (!query || query.trim() === "") {
      return this.getAll();
    }

    const searchTerm = query.toLowerCase();
    const filtered = this.companies.filter(company =>
      company.name.toLowerCase().includes(searchTerm) ||
      company.location.toLowerCase().includes(searchTerm) ||
      company.description.toLowerCase().includes(searchTerm) ||
      company.industry?.some(ind => 
        ind.toLowerCase().includes(searchTerm)
      )
    );

    // Add open positions count to filtered results
    return filtered.map(company => ({
      ...company,
      openPositions: this.jobs.filter(job => 
        job.company === company.name
      ).length
    }));
  }
}

const companyService = new CompanyService();
export default companyService;