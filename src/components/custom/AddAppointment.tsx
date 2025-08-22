import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { CreateAppointmentRequest } from "@/redux/actions/createAppointment";
import { AppointmentStatus } from "@/enums/appointmentStatusEnum";

const appointmentSchema = z.object({
  patientId: z.number(),
  description: z.string(),
  date: z.string(),
});

export const AddAppointment = () => {
  const dispatch = useDispatch();
  const form = useForm<z.infer<typeof appointmentSchema>>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof appointmentSchema>) {
    dispatch(
      CreateAppointmentRequest({
        description: values.description,
        date: new Date(values.date),
        patientId: values.patientId,
        status: AppointmentStatus.Active,
      })
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Adicionar</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Adicionar Atendimento</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-2 overflow-y-auto"
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite aqui"
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
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data</FormLabel>
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

                        field.onChange(x);
                      }}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Salvar</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
