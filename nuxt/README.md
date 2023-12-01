# WMATA Train Tracker - Nuxt 3

This is the Nuxt 3 application for the WMATA Train Tracker application. It provides an in-browser UI to see train and incident information for the Washington, DC Metro.

This Nuxt 3 application also provides an API that is used by the Wails/Go application.

The Vue components for this application are found in the [frontend](../frontend/) directory.

## Setup for local development

Check out the [.env.example](.env.example) for the required environment variables and create your own `.env` file at the root of the application.

The WMATA API key can be obtained from the [official WMATA API website](https://developer.wmata.com/).

Make sure to install the dependencies:

```bash
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`

```bash
pnpm run dev
```

## Production

Build the application for production:

```bash
pnpm run build
```

Locally preview production build:

```bash
pnpm run preview
```

## Deployment

Deployment of this application is handled by [Vercel](https://vercel.com).
