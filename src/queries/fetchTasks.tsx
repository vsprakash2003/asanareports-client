import { gql } from "@apollo/client";

// export const TASK_LIST = gql`
//   query TaskList($id: String) {
//     tasks(where: { project_gid: $id }) {
//       name
//       due_on
//       assignee
//       completed
//     }
//   }
// `;

export const TASK_LIST = gql`
  query TaskList($id: String) {
    name
    due_on
    assignee
    completed
  }
`;
// interface ITask {
//   name: String;
//   due_on: String;
//   assignee: String;
//   completed: String;
// }

// const id: String = "";

// const { loading, error, data } = useQuery<ITask>(TASK_LIST, {
//   variables: { id },
// });
