const { RESTDataSource } = require('apollo-datasource-rest');

class DiscogsAPI extends RESTDataSource {
  constructor(discogsClient) {
    super();
    this.discogs = discogsClient;
  }

  async getRandomReleases() {
    const response = await this.discogs.search('random');
    return searchResponseReducer(response);
  }

  async getSearchReleases(searchParams) {
    const response = await this.discogs.search('', searchParams);
    return searchResponseReducer(response);
  }

  async getReleaseDetails({ id }) {
    const response = await this.discogs.getRelease(id);
    return releaseDetailsReducer(response);
  }

  async getArtistDetails({ id }) {
    const response = await this.discogs.getArtist(id);
    return getArtistDetailsReducer(response);
  }
}

function searchResponseReducer(response) {
  const results = Array.isArray(response.results)
    ? response.results.map(release => searchReleaseReducer(release))
    : [];

  return {
    page: parseInt(response.pagination.page),
    pages: parseInt(response.pagination.pages),
    items: parseInt(response.pagination.items),
    results
  };
}

function searchReleaseReducer(release) {
  return {
    title: release.title,
    styles: release.style,
    genres: release.genre,
    country: release.country,
    year: parseInt(release.year, 10),
    url: 'https://www.discogs.com' + release.uri,
    image: {
      small: release.thumb,
      full: release.cover_image
    },
    id: release.id
  };
}

function releaseDetailsReducer(release) {
  return {
    title: release.title,
    artists: release.artists.map(artist => {
      return { name: artist.name, id: artist.id };
    }),
    styles: release.styles,
    genres: release.genres,
    images: release.hasOwnProperty('images')
      ? release.images.map(image => ({
          type: image.type,
          small: image.uri150,
          full: image.uri
        }))
      : [],
    country: release.country,
    released: release.released_formatted.match(/\d{4}/)[0],
    tracklist: release.tracklist.map(track => {
      return {
        duration: track.duration,
        position: track.position,
        title: track.title
      };
    }),
    videos: release.hasOwnProperty('videos')
      ? release.videos.map(video => {
          return video.uri;
        })
      : [],
    id: release.id
  };
}

function getArtistDetailsReducer(artist) {
  return {
    name: artist.name,
    realname: artist.realname,
    profile: artist.profile,
    url: artist.uri,
    images: artist.hasOwnProperty('images')
      ? artist.images.map(image => ({
          type: image.type,
          small: image.uri150,
          full: image.uri
        }))
      : [],
    id: artist.id
  };
}

module.exports = DiscogsAPI;
