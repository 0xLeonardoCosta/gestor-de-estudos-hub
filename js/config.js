/* =====================================================================
   CONFIGURAÇÃO DO SUPABASE
   Preencha os dois valores para ligar o login e a sincronização.
   Vazios = o site funciona só neste navegador, sem login.

   Onde achar (painel do Supabase › Project Settings › API / API Keys):
   · url:     "Project URL", no formato https://xxxxxxxx.supabase.co
   · anonKey: a chave pública — "anon public" ou "publishable" (sb_publishable_...)

   Essa chave pode ficar no repositório público: quem protege os dados é a
   regra de acesso (RLS) da tabela, que só entrega as linhas do usuário logado.
   NUNCA coloque aqui a chave "service_role" / "secret".
   ===================================================================== */
window.SUPABASE_CONFIG = {
  url: 'https://noxdaaddurjvttmwnguw.supabase.co',
  anonKey: 'sb_publishable_rvIYrnK3m3Wd63-4t0wbpA_B_LE5ynT'
};
