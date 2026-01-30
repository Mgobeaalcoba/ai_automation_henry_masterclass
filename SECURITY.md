# 🔒 Guía de Seguridad

## ⚠️ IMPORTANTE: Datos Sensibles Ofuscados

Este proyecto ha sido sanitizado y todos los datos sensibles han sido reemplazados con placeholders. **NUNCA** subas tus credenciales reales al repositorio.

## 📋 Datos que fueron Ofuscados

### ✅ Credenciales y API Keys
- **Serper API Key**: Reemplazada con `YOUR_SERPER_API_KEY_HERE`
- **N8N JWT Token**: Reemplazado con `YOUR_N8N_JWT_TOKEN_HERE`
- **HubSpot Credential ID**: Reemplazado con `YOUR_HUBSPOT_CREDENTIAL_ID`
- **OpenRouter Credential ID**: Reemplazado con `YOUR_OPENROUTER_CREDENTIAL_ID`

### ✅ Información Personal
- **Email**: Reemplazado con `example@example.com`
- **Nombres**: Reemplazados con `John Doe`
- **URLs de N8N**: Reemplazadas con `your-n8n-instance.app.n8n.cloud`

### ✅ IDs de Sistema
- **User IDs**: Reemplazados con `USER_ID_PLACEHOLDER`
- **Project IDs**: Reemplazados con `PROJECT_ID_PLACEHOLDER`
- **Webhook IDs**: Reemplazados con `YOUR_WEBHOOK_ID_HERE`

## 🛡️ Mejores Prácticas de Seguridad

### 1. Gestión de Credenciales

#### ❌ NUNCA hagas esto:
```javascript
// ❌ Hardcodear API keys en el código
const apiKey = "3cc4e5dc84ba94dcc74f06f799aa40bb3c23171b";

// ❌ Commit archivos con credenciales
git add .env
git commit -m "Adding my API keys"
```

#### ✅ HAZ esto en su lugar:
```javascript
// ✅ Usar variables de entorno
const apiKey = process.env.SERPER_API_KEY;

// ✅ Usar el archivo .env.example como plantilla
cp .env.example .env
# Luego edita .env con tus credenciales reales
```

### 2. Configuración de Git

Asegúrate de que tu `.gitignore` incluye:

```gitignore
# Environment variables
.env
*.env
!.env.example

# API Keys y tokens
*api-key*
*token*
*secret*

# Configuración local
*-local.json
.claude/settings.local.json
```

### 3. Rotación de Credenciales

Si accidentalmente expusiste una credencial:

1. **Revoca inmediatamente** la credencial comprometida
2. **Genera una nueva** credencial
3. **Actualiza** tu archivo `.env` local
4. **Verifica** que la credencial antigua ya no funciona
5. **Considera** revisar los logs de acceso de la API

### 4. Diferentes Entornos

Usa credenciales diferentes para cada entorno:

```bash
# Desarrollo
.env.development

# Testing
.env.test

# Producción
.env.production
```

### 5. Almacenamiento Seguro

#### Opciones recomendadas:
- **1Password** o **LastPass**: Para gestión personal
- **AWS Secrets Manager**: Para producción en AWS
- **Azure Key Vault**: Para producción en Azure
- **Google Secret Manager**: Para producción en GCP
- **HashiCorp Vault**: Para infraestructura on-premise

### 6. Revisión de Código

Antes de hacer commit, verifica:

```bash
# Buscar posibles API keys expuestas
git diff | grep -i "api[-_]key\|token\|secret"

# Buscar emails reales
git diff | grep -E "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"

# Usar herramientas automatizadas
git secrets --scan
```

### 7. Archivos de Workflow de n8n

Los workflows de n8n pueden contener:
- **pinData**: Datos de prueba que pueden incluir información real
- **credentials**: IDs de credenciales (aunque no las credenciales en sí)
- **webhookIds**: IDs únicos de webhooks

**Siempre revisa** estos campos antes de compartir o subir workflows.

## 🔍 Verificación de Seguridad

Ejecuta este checklist antes de hacer push:

- [ ] No hay API keys hardcodeadas
- [ ] No hay emails reales en los ejemplos
- [ ] No hay nombres reales en los datos de prueba
- [ ] El archivo `.env` está en `.gitignore`
- [ ] Todos los secretos usan variables de entorno
- [ ] Los IDs de credenciales están ofuscados
- [ ] Las URLs de instancias privadas están ofuscadas
- [ ] No hay JWT tokens expuestos

## 🚨 Qué Hacer si Expusiste una Credencial

### Pasos Inmediatos:

1. **Revoca la credencial** inmediatamente:
   - Serper: https://serper.dev/dashboard
   - OpenRouter: https://openrouter.ai/keys
   - HubSpot: Settings -> Private Apps
   - n8n: Settings -> API

2. **Genera nuevas credenciales**

3. **Actualiza tu aplicación** con las nuevas credenciales

4. **Revisa logs de acceso** para detectar uso no autorizado

5. **Considera usar** herramientas de detección:
   ```bash
   # Instalar git-secrets
   brew install git-secrets

   # Configurar en tu repo
   git secrets --install
   git secrets --register-aws
   ```

## 📚 Recursos Adicionales

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [GitHub Security Best Practices](https://docs.github.com/en/code-security)
- [12 Factor App - Config](https://12factor.net/config)
- [Secretlint](https://github.com/secretlint/secretlint) - Detector de secretos

## 🤝 Contribuciones

Si encuentras un problema de seguridad en este proyecto, por favor:
- **NO** abras un issue público
- Reporta el problema de forma privada
- Permite tiempo razonable para que se corrija antes de divulgarlo

---

**Recuerda**: La seguridad es responsabilidad de todos. Mantén tus credenciales seguras y nunca las compartas públicamente.
