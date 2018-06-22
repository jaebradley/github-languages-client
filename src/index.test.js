import GitHubLanguagesClient from '.';
import languagesJSON from './languages.json';

describe('GitHub Languages Client', () => {
  describe('#getAllLanguages', () => {
    it('gets them all', () => {
      expect(languagesJSON).toEqual(GitHubLanguagesClient.getAllLanguages());
    });
  });

  describe('#search', () => {
    it('gets JavaScript results', () => {
      const client = new GitHubLanguagesClient();
      const results = client.search('JavaScript');
      const firstResult = results[0];
      expect('JavaScript').toEqual(firstResult.name);
      expect(183).toEqual(firstResult.languageId);
    });
  });
});
