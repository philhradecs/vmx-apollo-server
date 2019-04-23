const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    randomReleases: SearchResult!
    searchReleases(
      query: String
      genre: String
      style: String
      country: String
      year: Int
      artist: String
    ): SearchResult
    releaseDetails(releaseID: ID!): ReleaseDetails
    artistDetails(artistID: ID!): ArtistDetails
  }
  type SearchResult {
    page: Int
    pages: Int
    items: Int
    results: [Release]
  }
  type Release {
    title: String
    styles: [String]
    genres: [String]
    country: String
    year: Int
    url: String
    image: Image
    id: ID!
  }
  type ReleaseDetails {
    title: String
    artists: [Artist]
    styles: [String]
    genres: [String]
    imagePrimary: Image
    imageSecondary: Image
    country: String
    released: Int
    tracklist: [Track]
    videos: [String]
    id: ID!
  }
  type Artist {
    name: String
    id: ID!
  }
  type ArtistDetails {
    profile: String
    url: String
    imagePrimary: Image
    imageSecondary: Image
    id: ID!
  }
  type Image {
    small: String
    full: String
  }
  type Track {
    duration: String
    position: String
    title: String
  }
`;

module.exports = typeDefs;
