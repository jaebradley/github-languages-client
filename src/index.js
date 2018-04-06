import Fuse from 'fuse.js';
import languagesJSON from './languages.json';

const LANGUAGES = Object.freeze(languagesJSON);

class GitHubLanguagesClient {
  constructor({
    maxPatternLength = 32,
    caseSensitive = false,
    includeScore = false,
    shouldSort = true,
    threshold = 0.6,
    location = 0,
    distance = 100,
    minMatchCharLength = 1,
  } = {}) {
    this.fuse = new Fuse(LANGUAGES, {
      maxPatternLength,
      caseSensitive,
      includeScore,
      shouldSort,
      threshold,
      location,
      distance,
      minMatchCharLength,
      keys: [
        'name',
        'aliases',
        'extensions',
      ],
    });
  }

  static getAllLanguages() {
    return LANGUAGES;
  }

  search(searchTerm) {
    return this.fuse.search(searchTerm);
  }
}

export default GitHubLanguagesClient;
