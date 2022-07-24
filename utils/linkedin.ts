export async function getUserProfile(accessToken: string) {
  const urlToGetUserProfile =
    "https://api.linkedin.com/v2/me?projection=(id,localizedFirstName,localizedSummary,localizedLastName,profilePicture(displayImage~digitalmediaAsset:playableStreams))";

  const res = await fetch(urlToGetUserProfile, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((r) => r.json());
  const id = res.id as string;
  const firstName = res.localizedFirstName as string;
  const lastName = res.localizedLastName as string;
  const profileImageURL = res["profilePicture"]["displayImage~"]?.elements[0]
    .identifiers[0].identifier as string;

  return { firstName, lastName, profileImageURL, id };
}

export async function getUserEmail(accessToken: string) {
  const urlToGetUserEmail =
    "https://api.linkedin.com/v2/clientAwareMemberHandles?q=members&projection=(elements*(primary,type,handle~))";

  const res = await fetch(urlToGetUserEmail, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((r) => r.json());

  return res.elements[0]["handle~"].emailAddress as string;
}
