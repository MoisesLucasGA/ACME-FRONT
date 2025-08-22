import { Button } from "@/components/ui/button";
import { GetPatientsRequest } from "@/redux/actions/getPatientsActions";
import type { RootState } from "@/redux/globalStore";
import type { Patient } from "@/useCases/getPatient";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddPatient } from "@/components/custom/AddPatient";

const formSchema = z.object({
  search: z.string(),
  status: z
    .number()
    .optional()
    .refine(
      (x) => (x !== undefined && (x === 0 || x === 1)) || x === undefined
    ),
});

export const Patients = () => {
  const dispatch = useDispatch();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
      status: undefined,
    },
  });
  const { getPatients } = useSelector((state: RootState) => state);

  function onSubmit(values: z.infer<typeof formSchema>) {
    dispatch(
      GetPatientsRequest({
        search: values.search,
        status: values.status,
      })
    );
  }

  return (
    <div className="h-[100vh] w-full flex items-center p-2 flex-col">
      <p className="font-bold">Pacientes</p>

      <div className="mt-2 w-full flex flex-row justify-between items-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-row gap-2 items-center"
          >
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Busca</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Busque por Nome ou CPF"
                      value={field.value}
                      onChange={(e) => field.onChange(e)}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="0 = Inativo, 1 = Ativo"
                      value={field.value}
                      onChange={(e) => {
                        const cleanInput = e.target.value.replace(/\D/g, "");
                        const x =
                          cleanInput !== "" ? Number(cleanInput) : undefined;

                        field.onChange(x);
                      }}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={!form.formState.isValid}>
              Buscar
            </Button>
          </form>
        </Form>
        <AddPatient></AddPatient>
      </div>

      <Table>
        <TableCaption>Lista de Pacientes</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>CPF</TableHead>
            <TableHead>Data de Nascimento</TableHead>
            <TableHead>Sexo</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>CEP</TableHead>
            <TableHead>Rua</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {getPatients.data &&
            getPatients.data.map((patient: Patient) => {
              return (
                <TableRow>
                  <TableCell>{patient.patientId}</TableCell>
                  <TableCell className="font-medium">{patient.name}</TableCell>
                  <TableCell>{patient.cpf}</TableCell>
                  <TableCell>
                    {new Date(patient.birthdate).toISOString()}
                  </TableCell>
                  <TableCell>{patient.sex}</TableCell>
                  <TableCell>{patient.status}</TableCell>
                  <TableCell>{patient.zipCode}</TableCell>
                  <TableCell>{patient.street}</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
};
