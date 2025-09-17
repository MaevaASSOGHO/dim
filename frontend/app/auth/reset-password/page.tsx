"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "../../../src/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ResetPasswordPage() {
  const sp = useSearchParams();
  const router = useRouter();

  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState<string>("");
  const [ok, setOk] = useState<null | boolean>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const t = sp.get("token") || "";
    const e = sp.get("email") || "";
    setToken(t);
    setEmail(e);
  }, [sp]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) { setOk(false); setMsg("Lien invalide ou expiré."); return; }
    if (password !== confirm) { setOk(false); setMsg("Les mots de passe ne correspondent pas."); return; }

    setLoading(true); setOk(null); setMsg("");
    try {
      await api.post("/reset-password", {
        token,
        email,
        password,
        password_confirmation: confirm,
      });
      setOk(true);
      setMsg("Mot de passe réinitialisé. Vous pouvez vous connecter.");
      setTimeout(() => router.replace("/auth/login"), 1200);
    } catch (err: any) {
      setOk(false);
      setMsg(err?.data?.message || "Impossible de réinitialiser le mot de passe.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#133e96] via-[#1e4ba8] to-[#2a5bb8]">
      <Card className="w-full max-w-md border-0 shadow-2xl">
        <CardHeader>
          <CardTitle>Réinitialiser le mot de passe</CardTitle>
          <CardDescription>Choisissez un nouveau mot de passe.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <Input type="hidden" value={token} readOnly />
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" required value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="password">Nouveau mot de passe</Label>
              <Input id="password" type="password" required value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="confirm">Confirmer le mot de passe</Label>
              <Input id="confirm" type="password" required value={confirm} onChange={e => setConfirm(e.target.value)} />
            </div>
            <Button type="submit" disabled={loading} className="w-full bg-[#fe6400] hover:bg-[#e55a00]">
              {loading ? "Réinitialisation..." : "Réinitialiser"}
            </Button>
            {ok !== null && (
              <p className={`text-sm ${ok ? "text-green-600" : "text-red-600"}`}>{msg}</p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
