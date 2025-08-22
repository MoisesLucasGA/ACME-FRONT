import { Button } from "@/components/ui/button";
import { GetAppointmentsRequest } from "@/redux/actions/getAppointmentsActions";
import type { RootState } from "@/redux/globalStore";
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
import type { Appointment } from "@/useCases/getAppointments";
import { AddAppointment } from "@/components/custom/AddAppointment";

const formSchema = z.object({
  patientId: z.number().optional(),
  initialDate: z.string().optional(),
  finalDate: z.string().optional(),
  status: z
    .number()
    .optional()
    .refine(
      (x) => (x !== undefined && (x === 0 || x === 1)) || x === undefined
    ),
});

export const Appointmens = () => {
  const dispatch = useDispatch();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientId: undefined,
      status: undefined,
      initialDate: undefined,
      finalDate: undefined
    },
  });
  const { getAppointments } = useSelector((state: RootState) => state);

  function onSubmit(values: z.infer<typeof formSchema>) {    
    dispatch(
      GetAppointmentsRequest({
        initialDate: values.initialDate ? new Date(values.initialDate) : undefined,
        finalDate: values.finalDate ? new Date(values.finalDate) : undefined,
        patientId: values.patientId,
        status: values.status,
      })
    );
  }

  return (
    <div className="h-[100vh] w-full flex items-center p-2 flex-col">
      <p className="font-bold">Atendimentos</p>

      <div className="mt-2 w-full flex flex-row justify-between items-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-row gap-2 items-center"
          >
            <FormField
              control={form.control}
              name="patientId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Id do Paciente</FormLabel>
                  <FormControl>
                    <Input 
                    value={field.value}
                      onChange={(e) => {
                        const cleanInput = e.target.value.replace(/\D/g, "");
                        const x =
                          cleanInput !== "" ? Number(cleanInput) : undefined;

                        field.onChange(x)
                      }}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="initialDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data Inicial</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="finalDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data Final</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
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
            <Button type="submit">
              Buscar
            </Button>
          </form>
        </Form>
        <AddAppointment/>
      </div>

      <Table>
        <TableCaption>Lista de Atendimentos</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Nome do Paciente</TableHead>
            <TableHead>CPF do Paciente</TableHead>
            <TableHead>Data do Atendimento</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {getAppointments.data &&
            getAppointments.data.map((appointment: Appointment) => {
              return (
                <TableRow>
                  <TableCell>{appointment.appointmentId}</TableCell>
                  <TableCell className="font-medium">{appointment.name}</TableCell>
                  <TableCell>{appointment.cpf}</TableCell>
                  <TableCell>
                    {new Date(appointment.date).toISOString()}
                  </TableCell>
                  <TableCell>{appointment.status}</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
};
