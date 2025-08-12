import {
  Card,
  CardContent,
  CardDescription,
  CardTitle
} from "@/components/ui/card";

export default function Home() {
  return (
    <div>
      <section className="flex flex-col gap-4 p-5 bg-gray-200">
        <h1 className="text-3xl font-extrabold">Seu carrinho</h1>
        <div className="flex gap-2 flex-wrap">
          <Card>
            <CardContent>
              <CardTitle>Título</CardTitle>
              <CardDescription>Descrição</CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
