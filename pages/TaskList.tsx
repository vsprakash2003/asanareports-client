import { useEffect, useState } from "react";
import createApolloClient from "./api/client";
import { NextApiRequest, NextApiResponse } from "next";
import {
  ApolloError,
  DocumentNode,
  HttpLink,
  from,
  InMemoryCache,
} from "@apollo/client";
import { ChakraProvider, useQuery } from "@chakra-ui/react";
import { Column } from "react-table";

import { TASK_LIST } from "@/queries/fetchTasks";
import { DataGrid } from "../src/components/DataGrid";
import { any } from "prop-types";

const columns: Column<String>[] = [
  {
    Header: "Task Name",
  },
  {
    Header: "Due On",
  },
  {
    Header: "Assignee",
  },
  {
    Header: "Completed",
  },
];

interface ITask {
  name: String;
  due_on: String;
  assignee: String;
  completed: String;
}
// const clientSession = client;
const clientSession = createApolloClient();
// let clientSession: {
//   query: (arg0: { query: DocumentNode; variables: string }) => any;
// };

// export async function TaskList (req: NextApiRequest, res: NextApiResponse) {
// async function fetchTaskList() {
//   console.log("Hi");
//   const variables = { project_gid: "1200219339918856" };

//   const clientURI = `clientSession.link projects/:${variables}/tasks?limit=100`;
//   const link = new HttpLink({
//     uri: clientURI,
//   });

//   // const event = req.body;

//   const response = await clientSession.query({
//     query: TASK_LIST,
//     variables: variables,
//   });

//   return {
//     props: {
//       tasks: response,
//     },
//   };
// }

export default function TaskList() {
  // const response = useEffect(() =>
  // fetchTaskList()
  // );

  // const response = fetchTaskList();
  const id = "1200219339918856";
  const { loading, error, data } = useQuery<ITask>(TASK_LIST, {
    variables: { id },
  });
  const [tasks, setTask] = useState([]);
  console.log(data);

  useEffect(() => {
    async function fetchTaskList() {
      console.log("Hi");
      // const id = "1200219339918856";

      const clientURI = `${process.env.ASANA_TASK_API}projects/${id}/tasks?limit=100`;
      console.log(clientURI);
      const link = new HttpLink({
        uri: clientURI,
      });

      // clientSession = new createApolloClient({
      //   link: from([link]),
      //   cache: new InMemoryCache(),
      // });

      clientSession.link = link;

      const response = await clientSession.query({
        query: TASK_LIST,
        variables: id,
      });
      // const event = req.body;

      // const response = await clientSession.query({
      // const { loading, error, data } = useQuery<ITask>(TASK_LIST, {
      //   variables: { id },
      // });
      console.log("response is", response);
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;
      //   query: TASK_LIST,
      //   variables: variables,
      // });

      // return {
      //   props: {
      //     tasks: response,
      //   },
      // };
      if (data) setTask(data);
    }

    fetchTaskList();
  }, [data]);

  console.log("response is", data);
  return data ? (
    <ChakraProvider>
      <DataGrid columns={columns} data={data} />
    </ChakraProvider>
  ) : (
    ""
  );
}
