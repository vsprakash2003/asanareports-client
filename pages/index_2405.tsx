// import * as React from "react";

// import App from "../src/App";

// export default function Home() {
//     return (
//         <div>
//             <App />
//         </div>);
// }

import { useEffect } from "react";
import { ApolloProvider } from "@apollo/client/react";
import client from "./api/client";
import { useRouter } from "next/router";

interface props {}
// const ManageDepartments = async () => {
//   const component = await import('./features/Department');
//   return component.default;
// };

// export class App extends React.Component<props> {
const App = () => {
  //   constructor(props: props | Readonly<props>) {
  //     super(props);
  //     this.state = {};
  //   }

  const appJSX = () => {
    const router = useRouter();
    //     return (
    //       router.push('/api/taskListWebhook')
    //     )
    //   }

    useEffect(() => {
      router.push("/TaskList");
    }, []);
  };

  //   render() {
  return <ApolloProvider client={client}>appJSX()</ApolloProvider>;
};
// }

export default App;
