# ☕ Café da Vila

Aplicação **fictícia** para aprender **Azure Static Web Apps**.

- `app/` → o site (HTML, CSS, JavaScript)
- `api/` → a API (Azure Functions em Node.js): `/api/cardapio` e `/api/pedido`
- `app/staticwebapp.config.json` → regras do Static Web Apps

## Testar no seu PC (Docker)

```bash
docker compose up --build
```

Abra http://localhost:4280

## Publicar no Azure

Siga o manual: [Manual-Static-Web-Apps.html](./Manual-Static-Web-Apps.html)

Configuração usada no portal do Azure:

| Campo            | Valor   |
|------------------|---------|
| App location     | `/app`  |
| Api location     | `api`   |
| Output location  | (vazio) |
