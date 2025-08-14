import {
  Card,
  CardDescription,
  CardTitle
} from "@/components/ui/card";

import { SoapDispenserDropletIcon } from "lucide-react";

export default function Home() {
  return (
    <div>
      <section className="flex flex-col gap-4 p-5">
        <h1 className="text-3xl font-extrabold mt-2">Seu carrinho</h1>
        <div className="flex gap-2 flex-wrap">
          {/* Vira componente */}
          <Card className="flex flex-col justify-center items-center p-4 gap-1 text-center min-w-[100px]">
            <SoapDispenserDropletIcon />
            <CardTitle className="mt-1">Sabonete</CardTitle>
            <CardDescription>x1</CardDescription>
          </Card>
          <Card className="flex flex-col justify-center items-center p-4 gap-1 text-center min-w-[100px]">
            <SoapDispenserDropletIcon />
            <CardTitle className="mt-1">Sabonete</CardTitle>
            <CardDescription>x1</CardDescription>
          </Card>
          <Card className="flex flex-col justify-center items-center p-4 gap-1 text-center min-w-[100px]">
            <SoapDispenserDropletIcon />
            <CardTitle className="mt-1">Sabonete</CardTitle>
            <CardDescription>x1</CardDescription>
          </Card>
          <Card className="flex flex-col justify-center items-center p-4 gap-1 text-center min-w-[100px]">
            <SoapDispenserDropletIcon />
            <CardTitle className="mt-1">Sabonete</CardTitle>
            <CardDescription>x1</CardDescription>
          </Card>
          <Card className="flex flex-col justify-center items-center p-4 gap-1 text-center min-w-[100px]">
            <SoapDispenserDropletIcon />
            <CardTitle className="mt-1">Sabonete</CardTitle>
            <CardDescription>x1</CardDescription>
          </Card>
          <Card className="flex flex-col justify-center items-center p-4 gap-1 text-center min-w-[100px]">
            <SoapDispenserDropletIcon />
            <CardTitle className="mt-1">Sabonete</CardTitle>
            <CardDescription>x1</CardDescription>
          </Card>
          <Card className="flex flex-col justify-center items-center p-4 gap-1 text-center min-w-[100px]">
            <SoapDispenserDropletIcon />
            <CardTitle className="mt-1">Sabonete</CardTitle>
            <CardDescription>x1</CardDescription>
          </Card>
          <Card className="flex flex-col justify-center items-center p-4 gap-1 text-center min-w-[100px]">
            <SoapDispenserDropletIcon />
            <CardTitle className="mt-1">Sabonete</CardTitle>
            <CardDescription>x1</CardDescription>
          </Card>
          <Card className="flex flex-col justify-center items-center p-4 gap-1 text-center min-w-[100px]">
            <SoapDispenserDropletIcon />
            <CardTitle className="mt-1">Sabonete</CardTitle>
            <CardDescription>x1</CardDescription>
          </Card>
          <Card className="flex flex-col justify-center items-center p-4 gap-1 text-center min-w-[100px]">
            <SoapDispenserDropletIcon />
            <CardTitle className="mt-1">Sabonete</CardTitle>
            <CardDescription>x1</CardDescription>
          </Card>
          <Card className="flex flex-col justify-center items-center p-4 gap-1 text-center min-w-[100px]">
            <SoapDispenserDropletIcon />
            <CardTitle className="mt-1">Sabonete</CardTitle>
            <CardDescription>x1</CardDescription>
          </Card>
          <Card className="flex flex-col justify-center items-center p-4 gap-1 text-center min-w-[100px]">
            <SoapDispenserDropletIcon />
            <CardTitle className="mt-1">Sabonete</CardTitle>
            <CardDescription>x1</CardDescription>
          </Card>
        </div>
      </section>
      <section className="flex flex-col gap-4 p-5">
        <h2 className="text-3xl font-extrabold">Recentes</h2>
        <div className="flex gap-2 flex-wrap">
          {/* Vira componente */}
          <Card className="flex flex-col justify-center items-center p-4 gap-1 text-center min-w-[100px]">
            <SoapDispenserDropletIcon />
            <CardTitle className="mt-1">Sabonete</CardTitle>
            <CardDescription>x1</CardDescription>
          </Card>
          <Card className="flex flex-col justify-center items-center p-4 gap-1 text-center min-w-[100px]">
            <SoapDispenserDropletIcon />
            <CardTitle className="mt-1">Sabonete</CardTitle>
            <CardDescription>x1</CardDescription>
          </Card>
          <Card className="flex flex-col justify-center items-center p-4 gap-1 text-center min-w-[100px]">
            <SoapDispenserDropletIcon />
            <CardTitle className="mt-1">Sabonete</CardTitle>
            <CardDescription>x1</CardDescription>
          </Card>
          <Card className="flex flex-col justify-center items-center p-4 gap-1 text-center min-w-[100px]">
            <SoapDispenserDropletIcon />
            <CardTitle className="mt-1">Sabonete</CardTitle>
            <CardDescription>x1</CardDescription>
          </Card>
        </div>
      </section>
    </div>
  );
}
