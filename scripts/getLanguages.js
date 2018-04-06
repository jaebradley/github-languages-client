import axios from 'axios';
import yaml from 'yamljs';
import camelize from 'camelize';
import fs from 'fs-extra';

const LANGUAGE_FILE_URL = 'https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml';

const getLanguages = async () => {
  const response = await axios.get(LANGUAGE_FILE_URL);
  const { data } = response;
  return yaml.parse(data);
};

const formatLanguages = (languages) => {
  const formattedLanguages = [];

  const camelizedLanguages = camelize(languages);

  Object.keys(camelizedLanguages).forEach((name) => {
    const language = camelizedLanguages[name];

    language.name = name;

    if (!language.aliases) {
      language.aliases = [name.toLowerCase()];
    } else {
      language.aliases.push(name.toLowerCase());
    }

    if (!language.aceMode) {
      language.aceMode = 'text';
    }

    if (!language.wrap) {
      language.wrap = 'false';
    }

    if (!language.searchable) {
      language.searchable = 'true';
    }

    if (!language.tmScope) {
      language.tmScope = 'none';
    }

    formattedLanguages.push(language);
  });

  return formattedLanguages;
};

const output = languages => fs.writeJsonSync('./src/languages.json', languages);

const generateFile = async () => {
  const languages = await getLanguages();
  const formattedLanguages = formatLanguages(languages);
  output(formattedLanguages);
};

generateFile();

