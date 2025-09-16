"use client";

import { useState } from "react";
import api from "../../../src/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [ok, setOk] = useState<null | boolean>(null);
  const [msg, setMsg] = useState<string>("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOk(null); setMsg("");
    try {
      const res = await api.post("/forgot-password", { email });
      setOk(true);
      setMsg("Si ce compte existe, un e-mail de réinitialisation vient d'être envoyé.");
    } catch (err: any) {
      // Par sécurité côté API on renvoie déjà ok=true, mais on gère quand même
      setOk(false);
      setMsg(err?.data?.message || "Impossible d'envoyer le lien pour le moment.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#133e96] via-[#1e4ba8] to-[#2a5bb8]">
      <Card className="w-full max-w-md border-0 shadow-2xl">
        <CardHeader>
          <CardTitle>Mot de passe oublié</CardTitle>
          <CardDescription>Entrez votre e-mail, nous vous envoyons un lien.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" required value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <Button type="submit" className="w-full bg-[#133e96] hover:bg-[#0f2d7a]">Envoyer le lien</Button>
            {ok !== null && (
              <p className={`text-sm ${ok ? "text-green-600" : "text-red-600"}`}>{msg}</p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
