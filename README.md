# GitHub Languages Client

[![Greenkeeper badge](https://badges.greenkeeper.io/jaebradley/github-languages-client.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/jaebradley/github-languages-client.svg?branch=master)](https://travis-ci.org/jaebradley/github-languages-client)
[![Codecov](https://img.shields.io/codecov/c/github/jaebradley/github-languages-client.svg)](https://codecov.io/gh/jaebradley/github-languages-client)
[![npm](https://img.shields.io/npm/dt/github-languages-client.svg)](github-https://www.npmjs.com/package/github-languages-client-client)
[![npm](https://img.shields.io/npm/v/github-languages-client.svg)](https://www.npmjs.com/package/github-languages-client)

A `NodeJS` client to get languages GitHub knows about for [`Advanced Search`](https://github.com/search/advanced), for example.

![advanced-search](https://imgur.com/TYoc7Qy.png)

## Implementation

`GitHub` maintains [a `linguist` repository](https://github.com/github/linguist) that contains [a `languages.yml` file](https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml) that seems to represent the set of languages that `GitHub` knows about.

I convert this `languages.yml` file to [a JSON file](~/src/languages.json). <sup>[1](#languages-job-footnote)</sup>

I then read from this file when instantiating the `GitHubLanguagesClient`.

For fuzzy-searching, I use [the `fuse` library](http://fusejs.io/).

## API

### Constructor

The default constructor parameters, used for fuzzy-searching, are

```javascript
{
  maxPatternLength = 32,
  caseSensitive = false,
  includeScore = false,
  shouldSort = true,
  threshold = 0.6,
  location = 0,
  distance = 100,
  minMatchCharLength = 1,
}
```

The [`fuse.io` site](http://fusejs.io/) gives a good explanation of why and how these values are used.

### `getAllLanguages`

This `static` method returns the complete array of all languages available, and the metadata associated with each language. It essentially returns [the `src/languages.json`](src/languages.json) file as a `JavaScript` object.

```javascript
import GitHubLanguagesClient from 'github-languages-client';

const allLanguages = GitHubLanguagesClient.getAllLanguages();
```

### `search`

This `class` method returns fuzzy-search text matching on the language's name, aliases, and extensions.

```javascript
import GitHubLanguagesClient from 'github-languages-client';

const client = new GitHubLanguagesClient();

const matchingLanguages = client.search('JavaScript');

// {
//   type: 'programming',
//   tmScope: 'source.js',
//   aceMode: 'javascript',
//   codemirrorMode: 'javascript',
//   codemirrorMimeType: 'text/javascript',
//   color: '#f1e05a',
//   aliases: [ 'js', 'node', 'javascript' ],
//   extensions:
//     [ '.js',
//       '._js',
//       '.bones',
//       '.es',
//       '.es6',
//       '.frag',
//       '.gs',
//       '.jake',
//       '.jsb',
//       '.jscad',
//       '.jsfl',
//       '.jsm',
//       '.jss',
//       '.mjs',
//       '.njs',
//       '.pac',
//       '.sjs',
//       '.ssjs',
//       '.xsjs',
//       '.xsjslib' ],
//   filenames: [ 'Jakefile' ],
//   interpreters: [ 'node' ],
//   languageId: 183,
//   name: 'JavaScript',
//   wrap: 'false',
//   searchable: 'true' },
// { type: 'programming',
//   color: '#00a6a6',
//   extensions: [ '.ms', '.mcr' ],
//   tmScope: 'source.maxscript',
//   aceMode: 'text',
//   languageId: 217,
//   name: 'MAXScript',
//   aliases: [ 'maxscript' ],
//   wrap: 'false',
//   searchable: 'true' },
//   etc., etc.
```

## Footnotes

<ul>
  <li>
    <a name='languages-job-footnote'><sup>1</sup> I have <a href="https://github.com/jaebradley/github-languages-watcher">a Travis CI job</a> that runs daily and opens PRs against this repository if it detects changes in the `languages.yml` file.</a>
  </li>
</ul>
