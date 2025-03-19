<script>
import SelectInput from '../components/select-input.vue';
import getRecords from '../services/airtable.js';

export default {
  components: { SelectInput},

  data() {

    return {
      companies: [],
      searchQuery: '',
      filters: {
        organizationType: '',
        ownershipStructure: '',
        industry: '',
        geographicalScope: '',
        governanceModel: '',
      },
      organizationTypes: [],
      ownershipStructures: [],
      industries: [],
      geographicalScopes: [],
      governanceModels: [],
      loading: true,  // Add this to indicate loading state
    };

  },

  computed: {

    filteredCompanies() {
      return this.companies.filter(
        company => {
          return (
            (
              this.searchQuery === '' || 
              company.fields.name.toLowerCase().includes(this.searchQuery.toLowerCase())
            ) 
            &&
            (
              this.filters.organizationType === '' || 
              company.fields.type_of_organization === this.filters.organizationType
            ) 
            &&
            (
              this.filters.ownershipStructure === '' || 
              company.fields.ownership_structure === this.filters.ownershipStructure
            ) 
            &&
            (
              this.filters.industry === '' || 
              company.fields.industry === this.filters.industry
            ) 
            &&
            (
              this.filters.geographicalScope === '' || 
              company.fields.geographical_scope === this.filters.geographicalScope
            ) 
            &&
            (
              this.filters.governanceModel === '' || 
              company.fields.governance_model === this.filters.governanceModel
            )
          );
      });
    },

  },

  methods: {

    async searchCompanies() {
      // This can be further optimized based on the backend
      this.filteredCompanies = this.companies.filter(company => {
        return (
          company.fields.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          (this.filters.organizationType === '' || company.fields.type_of_organization === this.filters.organizationType) ||
          (this.filters.ownershipStructure === '' || company.fields.ownership_structure === this.filters.ownershipStructure) ||
          (this.filters.industry === '' || company.fields.industry === this.filters.industry) ||
          (this.filters.geographicalScope === '' || company.fields.geographical_scope === this.filters.geographicalScope) ||
          (this.filters.governanceModel === '' || company.fields.governance_model === this.filters.governanceModel)
        );
      });
    },

  },

  async created() {
    this.loading = true; 
    const records = await getRecords();

    this.loading = false;
    this.companies = records;

    // Extract unique values for each filter
    this.organizationTypes = this.getUniqueFieldValues('type_of_organization');
    this.ownershipStructures = this.getUniqueFieldValues('ownership_structure');
    this.industries = this.getUniqueFieldValues('industry');
    this.geographicalScopes = this.getUniqueFieldValues('geographical_scope');
    this.governanceModels = this.getUniqueFieldValues('governance_model');
  },

  methods: {
    // Get unique values for each field
    getUniqueFieldValues(field) {
      const values = this.companies.map(company => company.fields[field]);
      return [...new Set(values)]; // Remove duplicates
    },
  },



};
</script>

<template>
  <div id="app">

    <div class="search-fields">
      <h2>Companies Directory</h2>

      <div>
      <input class="company-name-input" v-model="searchQuery" placeholder="Search by Company Name" />
    </div>
    
    <div class="select-boxes-holder">
      <!-- Filter Components -->
      <SelectInput
        label="Type of Organization"
        field="organizationType"
        :options="organizationTypes"
        :selectedValue="filters.organizationType"
        @update:selectedValue="filters.organizationType = $event"
      />
      
      <SelectInput
        label="Ownership Structure"
        field="ownershipStructure"
        :options="ownershipStructures"
        :selectedValue="filters.ownershipStructure"
        @update:selectedValue="filters.ownershipStructure = $event"
      />
      
      <SelectInput
        label="Industry"
        field="industry"
        :options="industries"
        :selectedValue="filters.industry"
        @update:selectedValue="filters.industry = $event"
      />
      
      <SelectInput
        label="Geographic Scope"
        field="geographicalScope"
        :options="geographicalScopes"
        :selectedValue="filters.geographicalScope"
        @update:selectedValue="filters.geographicalScope = $event"
      />
      
      <SelectInput
        label="Governance Model"
        field="governanceModel"
        :options="governanceModels"
        :selectedValue="filters.governanceModel"
        @update:selectedValue="filters.governanceModel = $event"
      />
    </div>

    </div>
    
    <!-- Display Filtered Companies -->
    <div v-if="loading">Loading...</div>
    <div v-else-if="filteredCompanies.length === 0">No companies found</div>

    <!-- Display companies -->
    <div v-else class="companies">
      <div v-for="company in filteredCompanies" :key="company.id" class="company-box">
        <strong>{{ company.fields.name }}</strong>
        <p>{{ company.fields.description }}</p>

        <div class="additional-info">
          <p>{{ company.fields.contact_email }}</p>
          <p>{{ company.fields.contact_phone }}</p>
          <p>{{ company.fields.tags }}</p>
        </div>
        
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-fields{
  text-align: center;
}
.select-boxes-holder{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.companies {
  margin-top: 1em;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.company-box {
  flex-grow: 100%;
  border: 1px solid #ddd;
  padding: 1em;
  margin-bottom: 1em;
  border-radius: .5rem;
}

.company-name-input{
  margin-bottom: .5rem;
}

/* Responsive design */
@media screen and (min-width: 768px) {
  .company-box {
    flex-basis: calc(50% - 3em);
  }
}

@media (min-width: 1024px) {
  .company-box {
    flex-basis: calc(25% - 3em);
  }
}

.additional-info {
  margin-top: 1em;
  font-size: 0.8em;
  color: #666;
}

.additional-info p{
  margin-top: .25em;
  margin-bottom: .25em;
  font-style: italic;
}
</style>
