import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { PenIcon } from "lucide-react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface EditItemProps {
  id: string;
  name: string;
  icon: string;
  price: string;
}

interface EditItemDialogProps {
  item: EditItemProps;
  update: (values: z.infer<typeof formSchema>) => void;
}

const formSchema = z.object({
  id: z.string(),
  name: z.string(),
  icon: z.string().optional(),
  price: z.string().optional(),
});

const EditItemDialog = ({ item, update }: EditItemDialogProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: item.id,
      name: item.name,
      icon: item.icon ?? "",
      price: item.price ?? "",
    }
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary" size="icon"
          className="cursor-pointer"
        >
          <PenIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar item</DialogTitle>
          <DialogDescription>Edite o item {item.name} e clique em salvar.</DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(update)} className="space-y-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="grow">
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Nome"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="grow">
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Preço"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="icon"
                render={({ field }) => (
                  <FormItem className="grow">
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Ícone"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" className="cursor-pointer">Cancelar</Button>
                </DialogClose>
                <Button type="submit" className="cursor-pointer">Salvar</Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EditItemDialog;