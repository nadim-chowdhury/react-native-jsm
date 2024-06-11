import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.nulllieo.aora",
  projectId: "66670d25002487241eae",
  databaseId: "6668436b000049ca836e",
  userCollectionId: "666843d100039aef4121",
  videoCollectionId: "6668442f000816a3e527",
  storageId: "66684724003096b4577a",
};

const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (formData) => {
  try {
    const newAccount = await account
      .create(ID.unique(), formData.email, formData.password, formData.username)
      .then(
        function (response) {
          console.log(response);
        },
        function (error) {
          console.log(error);
        }
      );

    if (!newAccount) throw new Error();

    const avatarUrl = avatars.getInitials(username);

    await signIn(formData.email, formData.password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const signIn = async (formData) => {
  try {
    const session = await account.createEmailPasswordSession(
      formData.email,
      formData.password
    );
    return session;
  } catch (error) {
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw new Error();

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw new Error();

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
};
