export const linkedinConfig = {
  clientID: process.env.LINKEDIN_CLIENT_ID as string,
  clientSecret: process.env.LINKEDIN_CLIENT_SECRET as string,
  callbackURL: process.env.LINKEDIN_CALLBACK_URL as string,
};

export const getLinkedinOAUTHUrl = (eventId: string) => {
  const linkedInApi = {
    clientId: linkedinConfig.clientID,
    redirectUrl: linkedinConfig.callbackURL,
    oauthUrl:
      "https://www.linkedin.com/oauth/v2/authorization?response_type=code",
    scope: "r_liteprofile%20r_emailaddress",
  };
  const oauthUrl = `${linkedInApi.oauthUrl}&client_id=${linkedInApi.clientId}&scope=${linkedInApi.scope}&state=${eventId}&redirect_uri=${linkedInApi.redirectUrl}`;
  return oauthUrl;
};
