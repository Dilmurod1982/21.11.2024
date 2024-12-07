import { useCollection } from "../hooks/useCollection";
import { Form, useActionData } from "react-router-dom";
import { FormInput } from "../components";
import { useEffect } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import toast from "react-hot-toast";
import { useAppStore } from "../lib/zustand";

export const action = async ({ request }) => {
  let formData = await request.formData();
  let title = formData.get("title");

  return { title };
};

function Todos() {
  const user = useAppStore((state) => state.user);

  const { data } = useCollection(
    "todos",
    ["uid", "==", user.uid],
    ["createAt"]
  );
  const dataTodo = useActionData();

  const handleDelete = (id) => {
    deleteDoc(doc(db, "todos", id))
      .then(() => {
        toast.success("Delete succes!");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleCompleted = (id, status) => {
    const todoRef = doc(db, "todos", id);
    updateDoc(todoRef, {
      completed: !status,
    })
      .then(() => {
        toast.success("Updated!");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  useEffect(() => {
    if (dataTodo) {
      const newTodo = {
        ...dataTodo,
        completed: true,
        createAt: serverTimestamp(),
        uid: user.uid,
      };
      addDoc(collection(db, "todos"), newTodo)
        .then(() => {
          toast.success("New todo add succes");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  }, [dataTodo]);
  return (
    <div className="align-elements mt-10">
      {data &&
        data.map((todo) => {
          return (
            <div
              key={todo.id}
              className={`${todo.completed ? "opacity-30" : "opacity-100"}`}
            >
              <h3 className="text-2xl">{todo.title}</h3>
              <button
                onClick={() => handleCompleted(todo.id, todo.completed)}
                className="btn btn-warning"
              >
                Comleted
              </button>
              <button
                onClick={() => handleDelete(todo.id)}
                className="btn btn-warning"
              >
                Delete
              </button>
            </div>
          );
        })}
      <div>
        <Form method="post" className="flex flex-col gap-5">
          <FormInput name="title" label="Title" type="text" />
          <button className="btn btn-secondary ">Add</button>
        </Form>
      </div>
    </div>
  );
}

export default Todos;
