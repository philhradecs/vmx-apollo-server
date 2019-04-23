module.exports = {
  Query: {
    randomReleases: async (_, __, { dataSources }) => {
      return dataSources.discogsAPI.getRandomReleases();
    },
    searchReleases: async (_, args, { dataSources }) => {
      return dataSources.discogsAPI.getSearchReleases(args);
    },
    releaseDetails: async (_, { releaseID }, { dataSources }) => {
      return dataSources.discogsAPI.getReleaseDetails({ releaseID });
    },
    artistDetails: async (_, { artistID }, { dataSources }) => {
      return dataSources.discogsAPI.getArtistDetails({ artistID });
    }
  }
};
