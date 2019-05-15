module.exports = {
  Query: {
    randomReleases: async (_, __, { dataSources }) => {
      return dataSources.discogsAPI.getRandomReleases();
    },
    searchReleases: async (_, args, { dataSources }) => {
      const searchParams = { ...args };
      if (!searchParams.hasOwnProperty('years')) {
        searchParams.years = [''];
      }
      const queries = searchParams.years.map(year => {
        let query = { ...searchParams };
        delete query.years;
        query.year = year;
        return query;
      });

      return Promise.all(
        queries.map(query => dataSources.discogsAPI.getSearchReleases(query))
      );
    }
  },

  Release: {
    details: async (parent, _, { dataSources }) => {
      return dataSources.discogsAPI.getReleaseDetails({ id: parent.id });
    }
  },

  Artist: {
    details: async (parent, _, { dataSources }) => {
      return dataSources.discogsAPI.getArtistDetails({ id: parent.id });
    }
  }
};
