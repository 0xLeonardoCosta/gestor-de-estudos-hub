/* =====================================================================
   ARMAZENAMENTO — único ponto por onde o hub e os três apps leem e gravam.

   Hoje: localStorage do navegador (cada estado é um JSON guardado numa chave).
   Depois (Supabase): este é o ÚNICO arquivo a trocar. A ideia é uma tabela
     estados (user_id uuid, chave text, dados jsonb, atualizado_em timestamptz)
   com uma linha por chave abaixo. Na abertura da página, baixar as linhas para o
   localStorage; em gravar(), além do localStorage, enfileirar um upsert.
   ===================================================================== */
const Armazenamento = (() => {
  const CHAVES = {
    hub: 'hub-estudos-v1',
    civil3d: 'ultra-civil3d-v1',
    revit: 'ultra-revit-v1',
    pos: 'posbim.gestor.v1'
  };

  /** Devolve o objeto salvo ou null. Lança erro se o armazenamento estiver indisponível ou o JSON corrompido. */
  function ler(chave) {
    const t = localStorage.getItem(chave);
    return t ? JSON.parse(t) : null;
  }
  /** Grava o objeto. Lança erro se não couber ou se o armazenamento estiver bloqueado. */
  function gravar(chave, obj) {
    localStorage.setItem(chave, JSON.stringify(obj));
  }
  function remover(chave) { localStorage.removeItem(chave); }

  /** Avisa quando OUTRA aba mudou uma chave (ex.: o hub marcou uma sessão como feita). */
  function aoMudar(fn) {
    window.addEventListener('storage', e => { if (e.key) fn(e.key); });
  }

  return { CHAVES, ler, gravar, remover, aoMudar, modo: 'local' };
})();
