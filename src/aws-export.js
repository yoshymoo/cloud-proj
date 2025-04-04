// src/aws-exports.js
const awsmock = {
  aws_project_region: "us-east-1",
  aws_cognito_region: "us-east-1",
  aws_user_pools_id: "mock-pool-id",
  aws_user_pools_web_client_id: "mock-client-id",
  aws_appsync_graphqlEndpoint: "https://mock-api/graphql",
  aws_appsync_region: "us-east-1",
  aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS",
};
export default awsmock;
