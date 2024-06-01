import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GenereModel } from "@/seaction/api/generesAxios";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// type Payment = {
//   id: string;
//   amount: number;
//   status: "pending" | "processing" | "success" | "failed";
//   email: string;
// };

// const columns: ColumnDef<Payment>[] = [
//   {
//     accessorKey: "status",
//     header: "Status",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("status")}</div>
//     ),
//   },

//   {
//     accessorKey: "email",
//     header: "Email",
//   },

//   {
//     accessorKey: "amount",
//     header: "Amount",
//   },

//   {
//     id: "actions",
//     enableHiding: false,
//     cell: ({ row }) => {
//       const payment = row.original;

//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="h-8 w-8 p-0">
//               <span className="sr-only">Open menu</span>
//               <DotsHorizontalIcon className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuLabel>Actions</DropdownMenuLabel>
//             <DropdownMenuItem
//               onClick={() => navigator.clipboard.writeText(payment.id)}
//             >
//               Copy payment ID
//             </DropdownMenuItem>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>View customer</DropdownMenuItem>
//             <DropdownMenuItem>View payment details</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       );
//     },
//   },
// ];

export const GenereColumn: ColumnDef<GenereModel>[] = [
  {
    accessorKey: "_id",
    header: "ID",
  },

  {
    accessorKey: "name",
    header: "Name",
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment._id)}
            >
              Copy Genere ID
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="bg-destructive">
              Delete Genere
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const MovieProviderColumn: ColumnDef<GenereModel>[] = [
  {
    accessorKey: "_id",
    header: "ID",
  },

  {
    accessorKey: "name",
    header: "Name",
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment._id)}
            >
              Copy Genere ID
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="bg-destructive">
              Delete Genere
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
