module.exports = {
  Query: {
    randomReleases: async (_, __, { dataSources }) => {
      return dataSources.discogsAPI.getRandomReleases();
    },
    searchReleases: async (_, args, { dataSources }) => {
      const query = { ...args };
      query.year = query.years;
      delete query.years;

      return dataSources.discogsAPI.getSearchReleases(query);
    },
    releaseDetails: async (_, args, { dataSources }) => {
      return dataSources.discogsAPI.getReleaseDetails({ id: args.id });
    },
    artistDetails: async (_, args, { dataSources }) => {
      return dataSources.discogsAPI.getArtistDetails({ id: args.id });
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
