# **Fluxo Detalhado da Aplicação - Caso de Uso Completo**

## **Persona: Maria - Diretora da Escola Estadual Alfredo Gaspar**

### **CENÁRIO:**
Maria precisa prestar contas do 1º semestre de 2025 do Programa Escola da Hora. Ela tem 30 dias para enviar toda a documentação para a SEDUC-AL.

---

## **FLUXO COMPLETO DA APLICAÇÃO:**

### **FASE 1: PREPARAÇÃO INICIAL** ⏱️ **Dia 1**

**1.1 Login no Sistema**
```
Tela: Login
→ Maria acessa sistema.seduc-al.gov.br
→ Insere email: maria.diretora@escola.al.gov.br
→ Senha: ********
→ Clica "Entrar"
```

**1.2 Dashboard**
```
Tela: Dashboard
→ Vê card "Processos Pendentes: 2"
→ Botão "NOVO PROCESSO" em destaque
→ Lista: "Processo 2024-2º Sem - ✅ Aprovado"
```

**1.3 Criar Novo Processo**
```
Tela: Novo Processo de Prestação de Contas
Campos preenchidos:
- Escola: [Automático] Escola Estadual Alfredo Gaspar
- Ano: 2025
- Semestre: 1º Semestre
- Presidente do Conselho: Daniela Raposo de Oliveira
- Tesoureiro: Anaximandro Santos Martins
→ Clica "SALVAR E INICIAR CHECKLIST"
```

---

### **FASE 2: CHECKLIST PRINCIPAL** ⏱️ **Dia 1-2**

**2.1 Tela Principal do Checklist**
```
Seção 1-4: DOCUMENTOS GERAIS (Expandida)
✅ [1] Memorando de abertura
   Status: 🔴 Pendente
   Ação: Maria clica "UPLOAD DOCUMENTO"
   → Faz upload do PDF "memorando_abertura.pdf"
   → Preenche "Nº SEI: 30385444"
   → Status muda para: 🟢 Concluído

✅ [2] Cartão CNPJ Conselho Escolar
   Status: 🔴 Pendente  
   → Upload "cnpj_conselho.pdf"
   → Nº SEI: 30385446
   → 🟢 Concluído

✅ [3] Ata de Eleição (registrada em cartório)
   → Upload "ata_eleicao.pdf"
   → 🟢 Concluído

✅ [4] Plano de aplicação dos recursos
   → Upload "plano_aplicacao.pdf"
   → 🟢 Concluído
```

**Barra de Progresso: 4/28 itens concluídos**

---

### **FASE 3: GESTÃO DE COMPRAS** ⏱️ **Dia 3-10**

**3.1 Acessar Módulo de Compras**
```
Maria clica na Seção 5: "DOCUMENTOS DE COMPRAS"
→ Sistema mostra lista vazia: "Nenhuma compra cadastrada"
→ Botão "ADICIONAR COMPRA"
```

**3.2 Cadastrar Primeira Compra**
```
Modal: Nova Compra
- Descrição: "Aquisição de material de limpeza"
- Fornecedor: "Limpex Distribuidora Ltda"
- CNPJ: "12.345.678/0001-90"
- Valor: R$ 2.450,00
- Data: 15/03/2025
→ Clica "SALVAR E ADICIONAR DOCUMENTOS"
```

**3.3 Documentos da Compra 01**
```
Tela: Documentos da Compra #01
Sistema mostra checklist ESPECÍFICO para compras:

📋 DOCUMENTOS OBRIGATÓRIOS:

[ ] ORÇAMENTOS (Mínimo 3)
   → Upload: "orcamento_empresa1.pdf"
   → Upload: "orcamento_empresa2.pdf" 
   → Upload: "orcamento_empresa3.pdf"
   ✅ Sistema valida: "3 orçamentos recebidos"

[ ] CNPJ DAS EMPRESAS
   → Upload: "cnpjs_fornecedores.pdf"

[ ] ATA DE RESULTADO
   → Upload: "ata_resultado_compra01.pdf"

[ ] CERTIDÕES NEGATIVAS (com autenticidade)
   🔴 Municipal: Pendente
   🔴 Estadual: Pendente  
   🔴 Federal: Pendente
   🔴 FGTS: Pendente
   🔴 Trabalhista: Pendente

Maria clica em "Certidão Municipal":
→ Faz upload do PDF
→ Marca "Autenticidade verificada"
→ Data de verificação: 20/06/2025
→ ✅ Status muda para Concluído

[ ] NOTA FISCAL
→ Upload: "nota_fiscal_001.pdf"
🔴 Sistema alerta: "NF requer assinatura de 2 conselheiros"

Maria clica "SOLICITAR ASSINATURAS":
→ Seleciona: "Daniela Raposo (Presidente)"
→ Seleciona: "Anaximandro Martins (Tesoureiro)"  
→ Envia notificação para eles assinarem
```

**3.4 Processo de Assinatura**
```
Daniela recebe email: "Documento para assinatura"
→ Acessa sistema
→ Visualiza NF
→ Clica "ASSINAR DIGITALMENTE"
→ Insere senha de confirmação
→ ✅ "Assinado por Daniela Raposo - 25/06/2025 14:30"

Anaximandro repete o processo
→ ✅ "Assinado por Anaximandro Martins - 25/06/2025 15:15"

Sistema atualiza: "NF totalmente assinada ✅"
```

---

### **FASE 4: COMPLEMENTOS E VALIDAÇÕES** ⏱️ **Dia 11-15**

**4.1 Documentos Complementares**
```
Seção 7: DOCUMENTOS COMPLEMENTARES
[7.1] Contrato de Internet → ✅ Concluído
[7.2] Comprovante de Depósito → ✅ Concluído

Seção 8: EXTRATOS BANCÁRIOS  
[8.1] Extrato Conta Corrente → ✅ Concluído
[8.2] Extrato Fundo Investimento → ✅ Concluído
```

**4.2 Parecer do Conselho Fiscal**
```
Seção 9: Parecer do Conselho Fiscal
→ Maria upload "parecer_fiscal.pdf"
→ Sistema alerta: "Documento requer análise do conselho"
→ Encaminha para validação do conselho fiscal
```

---

### **FASE 5: REVISÃO E ENVIO** ⏱️ **Dia 25**

**5.1 Revisão Final**
```
Barra de Progresso: 27/28 itens ✅
Único pendente: [11] Demonstrativo consolidado

Maria clica em [11]
→ Marca "NÃO SE APLICA" 
→ Justificativa: "Consolidado só necessário no final do ano"

Progresso: 28/28 ✅ TODOS CONCLUÍDOS
```

**5.2 Envio para SEDUC**
```
Botão "ENVIAR PARA ANÁLISE" fica ativo
Maria clica e confirma:
"Tem certeza? Após envio, não será possível editar."

Sistema gera:
✅ Comprovante de envio
✅ Número do processo: E:01800.0000006810/2025
✅ Data/hora: 30/06/2025 20:58
✅ Assinaturas digitais automáticas
```

**5.3 Status Final**
```
Dashboard atualizado:
"Processo 2025-1º Sem - 🟡 EM ANÁLISE"

Maria recebe confirmação:
"Processo enviado com sucesso para SEDUC-AL. 
Prazo de análise: 15 dias úteis."
```

---

## **BENEFÍCIOS APÓS IMPLEMENTAÇÃO:**

### **ANTES (Processo Manual):**
- ❌ Planilhas Excel espalhadas
- ❌ Emails com anexos perdidos
- ❌ Faltam documentos sem aviso
- ❌ Assinaturas físicas demoradas
- ❌ Prazos perdidos
- ⏱️ **Tempo médio: 45 dias**

### **DEPOIS (Sistema Digital):**
- ✅ Checklist guiado passo a passo
- ✅ Alertas automáticos de pendências
- ✅ Assinaturas digitais integradas
- ✅ Validações em tempo real
- ✅ Status transparente
- ⏱️ **Tempo médio: 25 dias**

---

## **FLUXO TÉCNICO DO SISTEMA:**

```
Usuário → Frontend (React/Inertia) → Backend (Laravel) → Banco de Dados → SEI (Integração)

1. Autenticação JWT
2. Validação de regras de negócio
3. Upload seguro de documentos
4. Geração de metadados
5. Assinatura digital
6. Notificações automáticas
7. Relatórios consolidados
```