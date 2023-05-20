# DC Train Tracker

![](./public/android-chrome-192x192.png)

A WMATA train tracking application for monitoring train's arrival times at stations.

Check it out at https://wmata-train-tracking.vercel.app/

## Setup

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
