<p align="center">
<img width="128" src="https://github.com/omnius-labs/opxs-web-ts/blob/main/public/logo.png?raw=true" alt="Opxs logo">
</p>

<h1 align="center">Opxs - Omnius Anything Service (Web)</h1>

[![test](https://github.com/omnius-labs/opxs-web/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/omnius-labs/opxs-web/actions/workflows/test.yml)

This repository contains the backend code for the Opxs platform, a suite of experimental web services written in TypeScript and Next.js.

- Backend: https://github.com/omnius-labs/opxs-apps-rs

## Features

- **Image Converter**: Convert images between different formats online.

## Development

### Getting Started

To run the Opxs web locally, you need to set up your environment first.

### Requirements

- Node.js
- Docker

### Running Locally

#### 1. Install dependencies:

```sh
npm install
```

#### 2. Run the development server:

```sh
# start opxs-web
npm run dev
```

#### 3. Start nginx using Docker:

```sh
# create certs
docker compose run --build --rm certs
# start nginx
docker compose up --build
```

View the application at:
https://localhost.omnius-labs.com/

## Links

- Official Documentation: https://docs.omnius-labs.com/

## License

This project is released under the MIT License. For more details, please refer to the [LICENSE](LICENSE.txt) file.

## Contribution

If you would like to contribute to this project, please contact us through [Issues](https://github.com/omnius-labs/axus-daemon-rs/issues) or [Pull Requests](https://github.com/omnius-labs/axus-daemon-rs/pulls) on GitHub.
