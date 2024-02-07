import NextAuth from 'next-auth'
import axios from 'axios'
// TODO(alishaevn): use the api value from https://github.com/assaydepot/rx/issues/21497 in the next phase
import { EXPIRATION_DURATION, getWebhookConfig, createWebhookConfig } from '../../../utils'

// For more information on each option (and a full list of options) go to: https://next-auth.js.org/configuration/options
const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    {
      id: process.env.NEXT_PUBLIC_PROVIDER_NAME,
      name: process.env.NEXT_PUBLIC_PROVIDER_NAME,
      type: 'oauth',
      checks: ['pkce', 'state'],
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      authorization: `https://${process.env.NEXT_PUBLIC_PROVIDER_NAME}.scientist.com/oauth/authorize`,
      token: `https://${process.env.NEXT_PUBLIC_PROVIDER_NAME}.scientist.com/oauth/token`,
      userinfo: {
        // The result of this function will be the input to the `profile` callback.
        async request(context) {
          // context contains useful properties to help you make the request.
          return context
        }
      },
      profile({ tokens }) {
        return tokens.user
      }
    }
  ],
  callbacks: {
    // async redirect({ url, baseUrl }) {
    //   /**
    //    * TODO(alishaevn): figure out how to get around the `OAUTH_CALLBACK_ERROR` error when signing in
    //    * from store.phenovista.com. it's something with the redirect url. this function seems to be getting
    //    * hit more often than when you press "sign in" on the login page though. the console logs are showing
    //    * on every page that you go to. and sometimes they're outdated. e.g., showing that I'm on the browse
    //    * page, when I'm on the home page.
    //    *
    //    * also, even if the url below shows as store.phenovista.com when I sign in, and when I get to the
    //    * permissions page on phenovista.scientist.com, it changes back to phenovista.softserv.cloud on the
    //    * redirect. I have no idea how to make it not do that. I hoped that returing `url` would do it, but
    //    * it seems to change again before the redirect back.
    //    *
    //    * I tested changing the value of `checks` above to only be `pkce` and then to be `none`. neither
    //    * change worked. it all throws a OAUTH_CALLBACK_ERROR, just with varying messages of what it got
    //    * and what it expected.
    //    * ref: https://github.com/nextauthjs/next-auth/discussions/7491#discussioncomment-6166539
    //   */
    //   const clientUrl = process.env.NEXT_PUBLIC_CLIENT_BASE_URL
    //   const urlPathname = new URL(url).pathname
    //   console.log({
    //     url, baseUrl, clientUrl, urlPathname,
    //   })

    //   if (new URL(url).origin === process.env.NEXT_PUBLIC_CLIENT_BASE_URL) return `${clientUrl}${urlPathname}`
    //   return url

    //   /**
    //    * {
    //       url: 'https://store.phenovista.com/requests',
    //       baseUrl: 'https://phenovista.softserv.cloud',
    //       clientUrl: 'https://store.phenovista.com'
    //     }
    //    * {
    //       url: 'https://phenovista.softserv.cloud/browse',
    //       baseUrl: 'https://phenovista.softserv.cloud',
    //       clientUrl: 'https://store.phenovista.com'
    //     }
    //    * [next-auth][error][OAUTH_CALLBACK_ERROR]
    //       2024-02-02T00:20:48.759358002Z https://next-auth.js.org/errors#oauth_callback_error state mismatch, expected undefined, got:  {
    //       2024-02-02T00:20:48.759365095Z   error: RPError: state mismatch, expected undefined, got:
    //       2024-02-02T00:20:48.759370202Z       at Client.oauthCallback (/home/node/app/node_modules/openid-client/lib/client.js:532:13)
    //       2024-02-02T00:20:48.759375179Z       at oAuthCallback (/home/node/app/node_modules/next-auth/core/lib/oauth/callback.js:111:29)
    //             at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    //       2024-02-02T00:20:48.759385182Z       at async Object.callback (/home/node/app/node_modules/next-auth/core/routes/callback.js:52:11)
    //       2024-02-02T00:20:48.759390623Z       at async AuthHandler (/home/node/app/node_modules/next-auth/core/index.js:201:28)
    //       2024-02-02T00:20:48.759395446Z       at async NextAuthHandler (/home/node/app/node_modules/next-auth/next/index.js:24:19)
    //       2024-02-02T00:20:48.759400874Z       at async /home/node/app/node_modules/next-auth/next/index.js:60:32
    //       2024-02-02T00:20:48.759419606Z       at async /home/node/app/node_modules/@sentry/nextjs/cjs/server/wrapApiHandlerWithSentry.js:144:33
    //       2024-02-02T00:20:48.759424690Z       at async Object.apiResolver (/home/node/app/node_modules/next/dist/server/api-utils/node.js:366:9)
    //       2024-02-02T00:20:48.759429858Z       at async NextNodeServer.runApi (/home/node/app/node_modules/next/dist/server/next-server.js:481:9) {
    //       2024-02-02T00:20:48.759435225Z     name: 'OAuthCallbackError',
    //       2024-02-02T00:20:48.759440278Z     code: undefined
    //       2024-02-02T00:20:48.759445619Z
    //     }
    //   */
    // },
    async jwt({ token, account, user }) {
      // Triggered on the initial sign in
      if (account && user) {
        // add the webstore webhook if it isn't there
        const data = await getWebhookConfig(account.accessToken)
        if(!data?.id) {
          createWebhookConfig(account.access_token)
        }

        return {
          accessToken: account.access_token,
          accessTokenExpires: Date.now() + EXPIRATION_DURATION,
          refreshToken: account.refresh_token,
          user,
        }
      }

      // Return previous token if the access token has not expired yet
      if (token.accessTokenExpires && (Date.now() < token.accessTokenExpires)) {
        return token
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token)
    },
    async session({ session, token }) {
      // Send additional properties to the client
      session.accessToken = token.accessToken
      return session
    },
  }
}

/**
 * Takes a token, and returns a new token with an updated `accessToken`.
 * If an error occurs, returns the old token and an error property
 */
const refreshAccessToken = async (token) => {
  try {
    const url = `https://${process.env.NEXT_PUBLIC_PROVIDER_NAME}.scientist.com/oauth/token`
    const encodedString = Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64')
    const params = new URLSearchParams({
      /* eslint-disable camelcase */
      grant_type: 'refresh_token',
      refresh_token: token.refreshToken,
      /* eslint-enable camelcase */
    })

    const response = await axios.post(url, params, {
      headers: {
        'Authorization': `Basic ${encodedString}`,
      },
    })
    const refreshedTokens = response.data

    if (response.status !== 200) {
      throw refreshedTokens
    }

    // add the webstore webhook if it isn't there
    const data = await getWebhookConfig(refreshedTokens.access_token)
    if(!data?.id) {
      createWebhookConfig(refreshedTokens.access_token)
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + EXPIRATION_DURATION,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to the old refresh token
    }
  } catch (error) {
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    }
  }
}

export default NextAuth(authOptions)
