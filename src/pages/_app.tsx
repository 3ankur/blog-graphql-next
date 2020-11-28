import { ThemeProvider, CSSReset, ColorModeProvider } from "@chakra-ui/core";
``;
import theme from "../theme";
import { createClient, Provider, dedupExchange, fetchExchange } from "urql";
import { cacheExchange, QueryInput, Cache, query } from "@urql/exchange-graphcache";
import { LoginMutation, MeDocument, MeQuery } from "../generated/graphql";

function betterUpdateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query
) {
  return cache.updateQuery(qi, (data) => fn(result, data as any) as any);
}

const client = createClient({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    credentials: "include",
  },
  // exchanges: [
  //   dedupExchange,
  //   cacheExchange({
  //     updates:{
  //       Mutation:{
  //          login: (_result, _args, cache, _info) => {
  //            betterUpdateQuery<LoginMutation,MeQuery>(cache,{query: MeDocument},_result,(result, query)=>{
  //              if(result.login.errors){
  //                 return query;
  //               }else{
  //                 return {
  //                   me:result.login.user
  //                 }
  //               }
  //            })
  //          }
  //       }
  //     }
  //   }),
  //   fetchExchange,
  // ],
});

function MyApp({ Component, pageProps }) {
  return (
    <Provider value={client}>
      <ThemeProvider theme={theme}>
        <ColorModeProvider>
          <CSSReset />
          <Component {...pageProps} />
        </ColorModeProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
