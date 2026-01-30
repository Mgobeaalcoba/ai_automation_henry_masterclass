# 🔧 n8n-flow-manager: Gestión Profesional de Workflows

## 📋 ¿Qué es n8n-flow-manager?

`n8n-flow-manager` es una herramienta CLI y librería Python diseñada para gestionar workflows de n8n de manera profesional y eficiente. Es especialmente útil para:

- 📦 **Backup y versionado** de workflows
- 🚀 **Deployment automatizado** en CI/CD
- 🔄 **Sincronización** entre entornos (dev, staging, prod)
- 📝 **Gestión de templates** con variables
- 🎯 **Ejecución programática** de workflows

**Creada por:** Mariano Gobea
**Repositorio:** [github.com/Mgobeaalcoba/n8n-flow-manager](https://github.com/Mgobeaalcoba/n8n-flow-manager)
**PyPI:** [pypi.org/project/n8n-flow-manager](https://pypi.org/project/n8n-flow-manager/)

---

## ⚡ Por qué usar n8n-flow-manager

### Comparación con Métodos Tradicionales

| Característica | Export Manual | n8n-flow-manager |
|----------------|---------------|------------------|
| **Velocidad** | 2-3 minutos | 5 segundos |
| **Precisión** | Propensa a errores | 100% exacta |
| **Automatizable** | ❌ No | ✅ Sí |
| **Versionado** | Manual | Automático |
| **CI/CD** | Difícil | Nativo |
| **Templates** | ❌ No | ✅ Jinja2 |
| **Batch Operations** | ❌ No | ✅ Sí |

### Ventajas Clave

✅ **Type-Safe:** Modelos Pydantic para validación automática
✅ **Async-First:** Alto rendimiento con httpx
✅ **CLI Friendly:** Comandos intuitivos para todas las operaciones
✅ **Python SDK:** Integración programática completa
✅ **Template Support:** Variables Jinja2 para multi-entorno
✅ **Intelligent Polling:** Espera automática de ejecuciones

---

## 📦 Instalación

### Método Recomendado: pipx

```bash
# Instalar pipx (si no lo tienes)
python3 -m pip install --user pipx
python3 -m pipx ensurepath

# Instalar n8n-flow-manager
pipx install n8n-flow-manager

# Verificar instalación
n8n-py --version
```

**Ventaja de pipx:** Aislamiento de dependencias, sin conflictos con otros paquetes.

### Método Alternativo: pip

```bash
pip install --user n8n-flow-manager
```

### Para Desarrollo

```bash
pip install n8n-flow-manager

# Uso programático
from n8n_manager import N8NClient
```

---

## 🔑 Configuración

### Variables de Entorno

```bash
export N8N_API_KEY="tu_api_key_aqui"
export N8N_BASE_URL="https://tu-instancia.app.n8n.cloud"
```

### Hacer Persistente (Recomendado)

**Para zsh (macOS default):**
```bash
echo 'export N8N_API_KEY="tu_api_key_aqui"' >> ~/.zshrc
echo 'export N8N_BASE_URL="https://tu-instancia.app.n8n.cloud"' >> ~/.zshrc
source ~/.zshrc
```

**Para bash (Linux default):**
```bash
echo 'export N8N_API_KEY="tu_api_key_aqui"' >> ~/.bashrc
echo 'export N8N_BASE_URL="https://tu-instancia.app.n8n.cloud"' >> ~/.bashrc
source ~/.bashrc
```

### Obtener tu API Key

1. Abre tu instancia de n8n
2. Ve a **Settings → API**
3. Haz clic en **"Create API Key"**
4. Copia la key y guárdala de forma segura
5. Configúrala en las variables de entorno

---

## 🚀 Uso en Este Proyecto

### Exportar el Workflow Completo

Este proyecto fue construido usando `n8n-flow-manager` para garantizar precisión:

```bash
# Exportar el workflow de la masterclass
n8n-py get-workflow _fu3rrIxO_O60G9CvHDXN \
  --output workflows/sales-automation-workflow.json
```

**Resultado:**
```
✓ Workflow saved to workflows/sales-automation-workflow.json
```

### Importar/Desplegar el Workflow

```bash
# Deploy básico
n8n-py deploy workflows/sales-automation-workflow.json

# Deploy y activar automáticamente
n8n-py deploy workflows/sales-automation-workflow.json --activate
```

### Verificar Conexión

```bash
# Health check de tu instancia
n8n-py health
```

**Salida esperada:**
```
✓ Connection successful
  Instance: https://tu-instancia.app.n8n.cloud
  Version: 1.x.x
```

---

## 📚 Comandos Principales

### Gestión de Workflows

#### Listar Workflows

```bash
# Todos los workflows
n8n-py list-workflows

# Solo workflows activos
n8n-py list-workflows --active
```

**Salida:**
```
ID: _fu3rrIxO_O60G9CvHDXN
Name: AI-Powered Personalized Lead Outreach
Active: Yes
Nodes: 9
```

#### Obtener Workflow Específico

```bash
# Ver en consola
n8n-py get-workflow _fu3rrIxO_O60G9CvHDXN

# Guardar a archivo
n8n-py get-workflow _fu3rrIxO_O60G9CvHDXN --output mi-workflow.json
```

#### Activar/Desactivar

```bash
# Activar workflow
n8n-py activate _fu3rrIxO_O60G9CvHDXN

# Desactivar workflow
n8n-py deactivate _fu3rrIxO_O60G9CvHDXN
```

---

### Backup y Versionado

#### Backup de Todos los Workflows

```bash
# Backup completo
n8n-py backup --output ./backups

# Solo workflows activos
n8n-py backup --output ./backups --active-only
```

**Estructura generada:**
```
backups/
├── 2025-01-30_14-30-00/
│   ├── workflow-1.json
│   ├── workflow-2.json
│   └── workflow-3.json
└── manifest.json
```

#### Integración con Git

```bash
# Script de backup automático
#!/bin/bash
mkdir -p backups
n8n-py backup --output ./backups
cd backups
git add .
git commit -m "Backup automático $(date +%Y-%m-%d)"
git push
```

---

### Ejecución de Workflows

#### Ejecutar y Esperar Resultado

```bash
# Ejecución síncrona (espera hasta completarse)
n8n-py execute _fu3rrIxO_O60G9CvHDXN
```

**Salida:**
```
✓ Execution completed successfully
  Execution ID: exec_abc123
  Status: success
  Duration: 12.3s
```

#### Ejecutar en Background

```bash
# Ejecución asíncrona (no espera)
n8n-py execute _fu3rrIxO_O60G9CvHDXN --no-wait
```

#### Ejecutar con Datos de Entrada

```bash
# Pasar datos al workflow
n8n-py execute _fu3rrIxO_O60G9CvHDXN --input test-data.json
```

**Ejemplo de test-data.json:**
```json
{
  "data": {
    "fields": [
      {"label": "Nombre", "value": "Test User"},
      {"label": "Email", "value": "test@example.com"}
    ]
  }
}
```

---

### Templates con Variables

#### Crear Template

```json
// workflow-template.json
{
  "name": "{{ environment }}-sales-automation",
  "nodes": [
    {
      "name": "API Config",
      "parameters": {
        "timeout": {{ timeout }},
        "apiKey": "{{ api_key }}"
      }
    }
  ]
}
```

#### Desplegar con Variables

```bash
# Deploy con sustitución de variables
n8n-py deploy workflow-template.json \
  --var environment=production \
  --var timeout=30 \
  --var api_key=$PROD_API_KEY
```

---

## 🐍 Uso Programático (Python SDK)

### Ejemplo Básico

```python
import asyncio
from n8n_manager import N8NClient

async def main():
    async with N8NClient() as client:
        # Listar workflows
        workflows = await client.workflows.list(active=True)
        for wf in workflows:
            print(f"Workflow: {wf.name} (ID: {wf.id})")

        # Ejecutar workflow
        execution = await client.executions.run_and_wait(
            workflow_id="_fu3rrIxO_O60G9CvHDXN",
            timeout=60
        )
        print(f"Status: {execution.status}")

asyncio.run(main())
```

### Ejemplo Avanzado: Gestión de Templates

```python
from n8n_manager.utils.templating import load_workflow_from_file

# Cargar workflow con variables
workflow = load_workflow_from_file(
    "templates/sales-automation.json",
    variables={
        "environment": "production",
        "serper_api_key": "your_key",
        "timeout": 30
    }
)

# Desplegar
async with N8NClient() as client:
    result = await client.workflows.create(workflow)
    print(f"Deployed: {result.id}")
```

---

## 🔄 CI/CD Integration

### GitHub Actions Example

```yaml
# .github/workflows/deploy.yml
name: Deploy n8n Workflows

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Install n8n-flow-manager
        run: pipx install n8n-flow-manager

      - name: Deploy workflows
        env:
          N8N_API_KEY: ${{ secrets.N8N_API_KEY }}
          N8N_BASE_URL: ${{ secrets.N8N_BASE_URL }}
        run: |
          n8n-py deploy workflows/sales-automation-workflow.json --activate
```

---

## 🎯 Casos de Uso Reales

### 1. Desarrollo Multi-Entorno

```bash
# Desarrollo local
n8n-py deploy workflow.json --var env=dev --var api=dev-api-key

# Staging
n8n-py deploy workflow.json --var env=staging --var api=staging-key

# Producción
n8n-py deploy workflow.json --var env=prod --var api=prod-key
```

### 2. Testing Automatizado

```bash
# Ejecutar workflow con datos de test
n8n-py execute $WORKFLOW_ID --input test-cases/case-1.json

# Verificar resultado
if [ $? -eq 0 ]; then
  echo "✓ Test passed"
else
  echo "✗ Test failed"
  exit 1
fi
```

### 3. Backup Scheduled

```bash
# Cron job (backup diario a las 2 AM)
0 2 * * * cd /path/to/project && n8n-py backup --output ./backups
```

### 4. Migración Entre Instancias

```bash
# Exportar de instancia antigua
N8N_BASE_URL=https://old-instance.n8n.cloud n8n-py backup --output ./migration

# Importar a instancia nueva
N8N_BASE_URL=https://new-instance.n8n.cloud \
  n8n-py deploy ./migration/workflow-1.json --activate
```

---

## 🆚 Comparación con Alternativas

### vs. Export Manual de n8n

| Aspecto | Export Manual | n8n-flow-manager |
|---------|---------------|------------------|
| Tiempo | 2-3 min/workflow | 5 seg/workflow |
| Batch Export | ❌ No | ✅ Sí (todos a la vez) |
| Automatización | ❌ No | ✅ Completa |
| Versionado | Manual (git) | Automático + git |
| Templates | ❌ No | ✅ Jinja2 |

### vs. n8n REST API Directa

| Aspecto | API Directa | n8n-flow-manager |
|---------|-------------|------------------|
| Complejidad | Alta (curl/fetch) | Baja (CLI simple) |
| Type Safety | ❌ No | ✅ Pydantic models |
| Error Handling | Manual | Automático |
| Async Support | Manual | Nativo |
| Polling Logic | DIY | Inteligente |

---

## 🐛 Troubleshooting

### Error: "API key is required"

**Problema:**
```
Error: API key is required. Provide via api_key parameter or N8N_API_KEY environment variable.
```

**Solución:**
```bash
# Verificar variables de entorno
echo $N8N_API_KEY
echo $N8N_BASE_URL

# Si están vacías, configurarlas
export N8N_API_KEY="tu_key"
export N8N_BASE_URL="https://tu-instancia.app.n8n.cloud"
```

---

### Error: "Connection failed"

**Problema:**
```
Error: Failed to connect to n8n instance
```

**Soluciones:**

1. **Verificar URL:**
   ```bash
   # Debe incluir https:// y NO terminar en /
   ✅ Correcto: https://instance.app.n8n.cloud
   ❌ Incorrecto: instance.app.n8n.cloud
   ❌ Incorrecto: https://instance.app.n8n.cloud/
   ```

2. **Verificar API Key:**
   ```bash
   # Probar conexión
   n8n-py health
   ```

3. **Verificar permisos:**
   - La API key debe tener permisos de lectura/escritura
   - Verifica en n8n → Settings → API

---

### Error: "Workflow not found"

**Problema:**
```
Error: Workflow with ID xxx not found
```

**Solución:**
```bash
# Listar todos los workflows para encontrar el ID correcto
n8n-py list-workflows
```

---

## 📖 Recursos Adicionales

### Documentación Oficial
- **GitHub:** [github.com/Mgobeaalcoba/n8n-flow-manager](https://github.com/Mgobeaalcoba/n8n-flow-manager)
- **PyPI:** [pypi.org/project/n8n-flow-manager](https://pypi.org/project/n8n-flow-manager/)
- **Ejemplos:** Ver carpeta `examples/` en el repo

### Comunidad
- **Issues:** [GitHub Issues](https://github.com/Mgobeaalcoba/n8n-flow-manager/issues)
- **Contribuciones:** Pull requests bienvenidos
- **Contacto:** Mariano Gobea

---

## 💡 Tips y Mejores Prácticas

### 1. Versionado de Workflows

```bash
# Estructura recomendada
workflows/
├── dev/
│   └── sales-automation-v1.0.0.json
├── staging/
│   └── sales-automation-v1.0.0.json
└── prod/
    └── sales-automation-v1.0.0.json
```

### 2. Secrets Management

```bash
# NUNCA commitear API keys
# Usar variables de entorno o secrets managers

# Buena práctica: .env file (agregado a .gitignore)
N8N_API_KEY=your_key_here
N8N_BASE_URL=https://instance.n8n.cloud

# Cargar en shell
source .env
```

### 3. Pre-commit Hooks

```bash
# .git/hooks/pre-commit
#!/bin/bash
n8n-py backup --output ./backups --active-only
git add backups/
```

### 4. Documentación de Workflows

```bash
# Exportar con metadata
n8n-py get-workflow $WORKFLOW_ID --output workflow.json

# Agregar README
cat > workflows/README.md << EOF
# Workflow: Sales Automation
ID: $WORKFLOW_ID
Version: 1.0.0
Last Export: $(date)
EOF
```

---

## ✅ Checklist de Implementación

Para usar `n8n-flow-manager` en tu proyecto:

- [ ] Instalar via pipx: `pipx install n8n-flow-manager`
- [ ] Configurar variables de entorno (N8N_API_KEY, N8N_BASE_URL)
- [ ] Verificar conexión: `n8n-py health`
- [ ] Exportar workflows existentes: `n8n-py backup`
- [ ] Configurar versionado con git
- [ ] (Opcional) Setup CI/CD pipeline
- [ ] (Opcional) Crear templates para multi-entorno

---

## 🎓 Por Qué Recomendamos n8n-flow-manager

En este proyecto de masterclass usamos `n8n-flow-manager` porque:

1. **Precisión Garantizada:** El workflow exportado es 100% idéntico al original, sin pérdida de configuración.

2. **Reproducibilidad:** Los estudiantes pueden importar el workflow exacto con un solo comando.

3. **Profesionalismo:** Enseñamos buenas prácticas de DevOps desde el inicio.

4. **Escalabilidad:** La herramienta crece con el proyecto - de desarrollo a producción.

5. **Open Source:** Herramienta gratuita y de código abierto, alineada con la filosofía de la masterclass.

---

**Creado por Mariano Gobea - Open Source ❤️**

¿Preguntas o sugerencias? [Abre un issue en GitHub](https://github.com/Mgobeaalcoba/n8n-flow-manager/issues)
