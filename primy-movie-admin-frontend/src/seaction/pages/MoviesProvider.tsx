import { DataTable } from "../component/datatable/data-table";

// column structure
import { GenereColumn } from "../component/datatable/columns";

//model
import { fetchGeneres, postGenere } from "../api/generesAxios";

// shadcn
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";

import react from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

export default function MoviesProvider() {
  const queryClient = useQueryClient();
  const [isOpen, setOpen] = react.useState(false);
  const [showLoader, setLoader] = react.useState(false);
  const [alertInput, setalertInput] = react.useState("");

  const { data: generes } = useQuery({
    queryKey: ["generes"],
    queryFn: () => fetchGeneres(),
    staleTime: Infinity,
  });

  const { mutateAsync: addTodoMutation } = useMutation({
    mutationFn: postGenere,

    onError: () => {
      console.log("onError");

      setLoader(false);
    },

    onSuccess: () => {
      setLoader(false);
      setalertInput("");
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["generes"] });
    },
  });

  const handleAddGenere = async () => {
    setLoader(true);
    await addTodoMutation(alertInput);
  };

  return (
    <>
      {console.log("re build")}

      <div>
        <DataTable
          buttonName="Add Genere"
          onButtonClick={() => setOpen(!isOpen)}
          columns={GenereColumn}
          title="Generes"
          data={generes == null ? [] : generes}
        />
      </div>

      <AlertDialog open={isOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Create New Genere</AlertDialogTitle>

            <Input
              value={alertInput}
              onChange={(e) => setalertInput(e.target.value)}
              className="rounded-[4px]"
              placeholder="Add New Genere"
            />

            <AlertDialogDescription>
              This will add a new Genere to the record
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            {showLoader ? (
              <></>
            ) : (
              <AlertDialogCancel onClick={() => setOpen(false)}>
                Cancel
              </AlertDialogCancel>
            )}

            <AlertDialogAction
              onClick={showLoader ? () => {} : handleAddGenere}
            >
              {showLoader ? (
                <div
                  className="inline-block  h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-black"
                  role="status"
                >
                  <span className="!absolute  !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>
              ) : (
                "Add Now"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
