// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever middleware or an Edge route handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: 'https://8e15464aee1fdfc31f70ed416c6bfdc9@o1008683.ingest.sentry.io/4506236741025792',
  // Adjust this value in production, or use tracesSampler for greater control
  // ref: https://develop.sentry.dev/sdk/performance/#sdk-configuration
  tracesSampleRate: 1.0,
  // ...
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
})
