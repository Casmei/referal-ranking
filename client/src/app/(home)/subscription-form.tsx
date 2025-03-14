"use client";

import { Button } from "@/components/button";
import { InputField, InputIcon, InputRoot } from "@/components/input";
import { ArrowRight, Mail, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSubscriptions } from "@/http/api";
import { useRouter, useSearchParams } from "next/navigation";

const subscriptionSchema = z.object({
  name: z.string().min(2, "Digite seu nome completo"),
  email: z.string().email("Digite um e-mail válido"),
});

type SubscriptionSchema = z.infer<typeof subscriptionSchema>;

export default function SubscriptionForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubscriptionSchema>({
    resolver: zodResolver(subscriptionSchema),
  });

  async function onSubscribe(data: SubscriptionSchema) {
    const referrer = searchParams.get("referrer");
    const { subscriberId } = await postSubscriptions({
      email: data.email,
      name: data.name,
      referrerId: referrer,
    });

    router.push(`/invite/${subscriberId}`);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubscribe)}
      className="bg-gray-700 border border-gray-600 rounded-2xl p-8 space-x-6 w-full md:max-w-[440px]"
    >
      <h2 className="font-heading font-semibold text-gray-200 text-xl">
        Inscrição
      </h2>

      <div className="space-y-3">
        <div className="space-y-2">
          <InputRoot>
            <InputIcon>
              <User />
            </InputIcon>
            <InputField
              type="text"
              {...register("name")}
              placeholder="Nome Completo"
            />
          </InputRoot>

          {errors.name && (
            <p className="text-danger taxt-xs font-semibold">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <InputRoot>
            <InputIcon>
              <Mail />
            </InputIcon>
            <InputField
              type="email"
              {...register("email")}
              placeholder="E-mail"
            />
          </InputRoot>

          {errors.email && (
            <p className="text-danger taxt-xs font-semibold">
              {errors.email.message}
            </p>
          )}
        </div>

        <Button type="submit">
          Confirmar <ArrowRight />
        </Button>
      </div>
    </form>
  );
}
