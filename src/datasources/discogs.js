const { RESTDataSource } = require('apollo-datasource-rest');

class DiscogsAPI extends RESTDataSource {
  constructor(discogsClient) {
    super();
    this.discogs = discogsClient;
  }

  async getRandomReleases() {
    const response = await this.discogs.search('random');
    return this.searchResponseReducer(response);
  }

  async getSearchReleases(searchParams) {
    const response = await this.discogs.search('', searchParams);
    return this.searchResponseReducer(response);
  }

  async getReleaseDetails({ releaseID }) {
    const response = await this.discogs.getRelease(releaseID);
    return this.releaseDetailsReducer(response);
  }

  async getArtistDetails({ artistID }) {
    const response = await this.discogs.getArtist(artistID);
    return this.getArtistDetailsReducer(response);
  }

  searchResponseReducer(response) {
    const results = Array.isArray(response.results)
      ? response.results.map(release => searchReleaseReducer(release))
      : [];

    function searchReleaseReducer(release) {
      return {
        title: release.title,
        styles: release.style,
        genres: release.genre,
        country: release.country,
        year: parseInt(release.year),
        url: 'https://www.discogs.com' + release.uri,
        image: {
          small: release.thumb,
          full: release.cover_image
        },
        id: release.id
      };
    }

    return {
      page: parseInt(response.pagination.page),
      pages: parseInt(response.pagination.pages),
      items: parseInt(response.pagination.items),
      results
    };
  }

  releaseDetailsReducer(release) {
    return {
      title: release.title,
      artists: release.artists.map(artist => {
        return { name: artist.name, id: artist.id };
      }),
      styles: release.styles,
      genres: release.genres,
      imagePrimary: {
        small: release.images[0].uri150,
        full: release.images[0].uri
      },
      imageSecondary: release.images[1]
        ? {
            small: release.images[1].uri150,
            full: release.images[1].uri
          }
        : '',
      country: release.country,
      released: release.released_formatted.match(/\d{4}/)[0],
      tracklist: release.tracklist.map(track => {
        return {
          duration: track.duration,
          position: track.position,
          title: track.title
        };
      }),
      videos: release.videos.map(video => {
        return video.uri;
      }),
      id: release.id
    };
  }

  getArtistDetailsReducer(artist) {
    return {
      profile: artist.profile,
      url: artist.uri,
      imagePrimary: {
        small: artist.images[0].uri150,
        full: artist.images[0].uri
      },
      imageSecondary: artist.images[1]
        ? {
            small: artist.images[1].uri150,
            full: artist.images[1].uri
          }
        : '',
      id: artist.id
    };
  }
}

module.exports = DiscogsAPI;
