<h1 align="center">Liberty Arrow</h1>

<p align="center">
  <img alt="badge-lastcommit" src="https://img.shields.io/github/last-commit/GaryHilares/Liberty-Arrow?style=for-the-badge">
  <img alt="badge-openissues" src="https://img.shields.io/github/issues-raw/GaryHilares/Liberty-Arrow?style=for-the-badge">
  <img alt="badge-license" src="https://img.shields.io/github/license/GaryHilares/Liberty-Arrow?style=for-the-badge">
  <img alt="badge-contributors" src="https://img.shields.io/github/contributors/GaryHilares/Liberty-Arrow?style=for-the-badge">
  <img alt="badge-codesize" src="https://img.shields.io/github/languages/code-size/GaryHilares/Liberty-Arrow?style=for-the-badge">
</p>

## What is Liberty Arrow?
Liberty Arrow is a customizable browser extension for blocking websites and improving productivity.

### Features
- **Unlimited sites:** You wan't to block 50 different sites? No problem!
- **Substring blocking system:** You not only can block sites by adding the domain name, but also by adding any url's substring.

### Dependencies
#### Development
- NodeJS
- NPM
- Python 3

### Platforms
- Mozilla Firefox

## Motivation
I like different browser extensions that help you to improve productivity by giving you different options to make you waste less time in unnecessary websites. However, I wanted to add multiple websites in different ways and these extensions only allowed to set a group of rules for all pages.

Liberty Arrow aims to solve this problem by providing group organization to your websites and allowing you to put different rules for them.

## Installation and usage
For building the project from its source code, follow the next steps:
1. Install Python, NodeJS and NPM:
    - You can find the latest version of Python [here](https://www.python.org/downloads/).
    - You can find the latest version of NodeJS and NPM [here](https://nodejs.org/en/download/).
2. Install `settings_site` dependencies:
    1. Open a terminal in `src/settings_site`.
    2. Use the command `npm install` to install the required dependencies.
3. Build the project:
    1. Open a terminal in the root of the project.
    2. Use the command `python3 build.py all` (or `build all` if you have the `py` extension linked to your Python interpreter).

The building process of the project has only been tested in Windows 10 and Linux Ubuntu. Note that these instructions assume that you have added Python and Node to your path during the installation. If you haven't done it, replace `python3` and/or `npm` with the appropiate path to your Python or Node interpreter.

## Contributors
Thanks to these wonderful people for making Liberty Arrow possible!

<p align="center"><a href="https://github.com/GaryHilares/Liberty-Arrow/graphs/contributors"><img src="https://contrib.rocks/image?repo=GaryHilares/Liberty-Arrow"></a></p>


## License
This work is licensed under a [Creative Commons Attribution 4.0 International License](https://github.com/GaryHilares/Liberty-Arrow/blob/main/LICENSE).
