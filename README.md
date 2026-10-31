# Sistema de Gestão e Análise de Estabelecimentos (CNES)

---

## Grupo

- Giovani Boldrini Custoias – 2040482423006
- João Vitor Evangelista da Silva – 2040482423021
- Jonathas Pinheiro de Arruda – 2040482423040
- Sarah Bianca Tambalo da Silva – 2040482423044

---

## Modelo de Dados

### Campos Utilizados no Projeto

| Campo | Motivo da Utilização |
| :--- | :--- |
| `codigo_cnes` | Identificador único do estabelecimento e chave primária da aplicação. |
| `codigo_uf` | Permite filtros por estado, indicadores e visualizações no mapa. |
| `codigo_municipio` | Identificação geográfica complementar do estabelecimento. |
| `nome_fantasia` | Nome utilizado nas pesquisas, tabela e consultas dos usuários. |
| `descricao_esfera_administrativa` | Classificação da gestão administrativa do estabelecimento. |
| `estabelecimento_possui_centro_cirurgico` | Indicador utilizado nos dashboards e estatísticas. |
| `estabelecimento_possui_centro_obstetrico` | Indicador utilizado nos dashboards e estatísticas. |
| `estabelecimento_possui_centro_neonatal` | Indicador utilizado nos dashboards e estatísticas. |
| `estabelecimento_possui_atendimento_hospitalar` | Indicador utilizado nos dashboards, mapas e consultas. |
| `estabelecimento_possui_atendimento_ambulatorial` | Indicador utilizado nos dashboards, mapas e consultas. |
| `latitude_estabelecimento_decimo_grau` | Posicionamento geográfico do estabelecimento. |
| `longitude_estabelecimento_decimo_grau` | Posicionamento geográfico do estabelecimento. |

### Campos Descartados

Os campos abaixo não foram utilizados por não contribuírem diretamente para os objetivos analíticos e visuais do projeto:

- `numero_cnpj_entidade`
- `numero_cnpj`
- `natureza_organizacao_entidade`
- `descricao_nivel_hierarquia`
- `codigo_cep_estabelecimento`
- `numero_estabelecimento`
- `endereco_email_estabelecimento`
- `codigo_identificador_turno_atendimento`
- `descricao_turno_atendimento`
- `codigo_estabelecimento_saude`
- `descricao_natureza_juridica_estabelecimento`
- `codigo_motivo_desabilitacao_estabelecimento`
- `estabelecimento_possui_servico_apoio`
- `codigo_atividade_ensino_unidade`
- `codigo_natureza_organizacao_unidade`
- `codigo_nivel_hierarquia_unidade`
- `codigo_esfera_administrativa_unidade`
- `data_atualizacao`

**Motivos para descarte:**
- Não eram utilizados em filtros ou pesquisas da aplicação.
- Não contribuíam para os indicadores apresentados no dashboard.
- Não eram utilizados nas visualizações do mapa.
- Não impactavam as operações de cadastro, edição ou exclusão.
- Aumentariam o volume de dados armazenados sem agregar valor aos objetivos do projeto.

---

## Importação dos Dados

Os dados utilizados no projeto são obtidos diretamente da API oficial do Cadastro Nacional de Estabelecimentos de Saúde (CNES), disponibilizada pelo Ministério da Saúde por meio do portal de Dados Abertos.

- **Fonte oficial:** [API de Dados Abertos do CNES](https://apidadosabertos.saude.gov.br/v1/#/CNES/get_cnes_estabelecimentos)
- **Última sincronização realizada em:** 30/10/2026

---

## Requisitos

### Tecnologias Utilizadas

#### Backend
- Java 21
- Spring Boot
- Spring Data JPA
- Hibernate
- Bean Validation
- PostgreSQL
- Neon Database

#### Frontend
- HTML5
- CSS3
- JavaScript
- amCharts 5

---

## Instruções de Execução

### 1. Clonar o Repositório
```bash
git clone [https://github.com/Gbcustoias/saes-cnes](https://github.com/Gbcustoias/saes-cnes)
```

### 2. Acessar a Pasta do Projeto

```bash
cd saes-cnes
```

### 3. Configurar o Banco de Dados

Criar um arquivo `.env` utilizando como base o arquivo `.env.example`.


### 4. Executar a Aplicação

```bash
mvn spring-boot:run
```

### 5. Acessar o Sistema

```text
http://localhost:8080
```
